const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isFunction = fn => typeof fn === 'function'

class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('must be a function')
        }
        this._status = PENDING
        this._value = undefined
        this._fulfilledQueues = []
        this._rejectedQueues = []

        try {
            handle(this._resolved.bind(this), this._rejected.bind(this))
        } catch (error) {
            this._rejected(error)
        }
    }
    _resolved(val) {
        if (this._status !== PENDING) return
        // 还需要处理如果resolve 接受的还是 promise的情况， 接受就是promise的话， 状态会由接受的promise的状态来决定
        // 上述的解决方法，和then中的设计思路是一样的
        const run = (value) => {
            const fulfilled = (value) => {
                let cb
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            const rejected = (err) => {
                let cb
                while (cb = this._rejectedQueues.shift()) {
                    cb(err)
                }
            }
            if (val instanceof MyPromise) {
                val.then(value => {
                    this._status = FULFILLED
                    this._value = value
                    fulfilled(value)
                }, err => {
                    this._status = REJECTED
                    this._value = err
                    rejected(err)
                })
            } else {
                this._status = FULFILLED
                this._value = value
                fulfilled(value)
            }

        }
        setTimeout(() => run(val), 0)
    }
    _rejected(err) {
        if (this._status !== PENDING) return
        const run = (error) => {
            this._status = REJECTED
            this._value = error
            let cb
            while (cb = this._rejectedQueues.shift()) {
                cb(error)
            }
        }
        setTimeout(() => run(err), 0)
    }
    then(onFulfilled, onRejected) {
        const { _status, _value } = this
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            const fulfilled = (val) => {
                if (!isFunction(onFulfilled)) { //值穿透
                    onFulfilledNext(val)
                }
                let res = onFulfilled(val)
                if (res instanceof MyPromise) {
                    res.then(onFulfilledNext, onRejectedNext)
                } else {
                    onFulfilledNext(res)
                }
            }
            // 失败的执行函数
            const rejected = (err) => {
                if (!isFunction(onRejected)) {
                    onRejectedNext(err)
                }
                console.trace()
                let res = onRejected(err)
                if (res instanceof MyPromise) {
                    res.then(onFulfilledNext, onRejectedNext)
                } else {
                    onFulfilledNext(res)
                }
            }
            switch (_status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }
        })
    }
    catch(fn) {
        return this.then(undefined, fn)
    }
    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
    static rejected(val) {
        return new MyPromise((resolve, rejected) => rejected(val))
    }
    static all(lists) {
        return new MyPromise((resolve, rejected) => {
            let result = []
            for (let p of lists) {
                MyPromise.resolve(p).then(val => {
                    result.push(val)
                    console.log('val: ', val);
                    if (result.length === lists.length) {
                        resolve(result)
                    }
                }, err => {
                    rejected(err)
                })
            }
        })
    }
    static race(lists) {
        return new MyPromise((resolve, rejected) => {
            for (let p in lists) {
                p.then(val => {
                    resolve(val)
                }, err => {
                    rejected(err)
                })
            }
        })
    }
}

var promise1 = MyPromise.resolve(3);
var promise2 = 42;
var promise3 = new MyPromise(function (resolve, reject) {
    setTimeout(resolve, 100, 'foo');
});

MyPromise.all([promise1, promise2, promise3]).then(function (values) {
    console.log(values);
});

const p = new MyPromise((resolve, rejected) => {
    resolve(123)
}).then(val => {
    console.log('val: ', val);
    setTimeout(() => {
        console.log('12: ', 12);
        return 12
    }, 1000)
}).then(res => {
    console.log('res: ', res);
})