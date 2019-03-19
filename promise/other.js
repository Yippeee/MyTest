const isFunction = (fn) => typeof fn === 'function'

// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
/** 
 * 实现promise需要考虑的点:
 * 
 * */
class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) throw new Error('Promise must be a function')
        // 添加状态
        this._status = PENDING
        // 添加返回值
        this._value = undefined
        // 成功回调队列
        this._fulfillQueues = []
        // 失败回调队列
        this._rejectQueues = []
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    _resolve(value) {
        const run = () => {
            if (this._status !== PENDING) return

            const runFulfilled = (value) => {
                let cb
                while (cb = this._fulfillQueues.shift()) {
                    cb(this._value)
                }
            }
            const runRejected = (value) => {
                let cb
                while (cb = this._rejectQueues.shift()) {
                    cb(this._value)
                }
            }
            //添加考虑在 resolve中使用 promise的情况
            if (value instanceof MyPromise) {
                value.then((val) => {
                    this._value = val
                    this._status = FULFILLED
                    runFulfilled(value)
                }, (err) => {
                    this._value = err
                    this._status = REJECTED
                    runRejected(err)
                })
            } else {
                this._value = value
                this._status = FULFILLED
                runFulfilled()
            }
        }
        setTimeout(() => { run() }, 0)
    }
    _reject(error) {
        if (this._status !== PENDING) return
        const run = () => {
            this._value = error
            this._status = REJECTED
            let cb
            while (cb = this._rejectQueues.shift()) {
                cb(this._value)
            }
        }
        setTimeout(() => { run() }, 0)
    }
    then(onFulfilled, onRejected) {
        const { _value, _status } = this

        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            //新的promise成功时候的回调
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) { // 不是函数的话,直接发生值穿透,就是忽略这个值
                        onFulfilledNext(value) // 保持上个promise的返回值, 接着传下去
                    } else { // then中的参数是函数的情况,返回值应该是参数函数的返回值
                        let res = onFulfilled(value)
                        if (res instanceof MyPromise) {// 这块需要考虑返回值是不是promise的情况, 如果是的话, 得等待状态改变之后再执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }
            // 新的promise失败时候的回调
            let rejected = error => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onRejectedNext(error) // 值穿透
                    } else {
                        let res = onRejected(error) // 因为是reject的情况,函数的返回值是通过错误回调返回的
                        console.log('onRejected: ', onRejected);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res) // 在没有发生错误的情况下,往下传递都是走的正常的情况
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }
            switch (_status) {
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
                case PENDING: // pending的情况就是异步导致的, 先把回调函数保留起来
                    this._rejectQueues.push(rejected)
                    this._fulfillQueues.push(fulfilled)
                    break
            }
        })
    }
    catch(fn) {
        return this.then(undefined, fn)
    }
    // 添加promise的静态方法
    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
    static reject(val) {
        return new MyPromise((resolve, reject) => reject(val))
    }
    static all(lists) {
        let result = []
        return new MyPromise((resolve, reject) => {
            try {
                let cb
                let length = lists.length
                while (cb = lists.shift()) {
                    MyPromise.resolve(cb).then((val) => {
                        console.log('val: ', val);
                        if (result.length === length) {
                            resolve(result)
                        }
                    })
                }
            } catch (error) {
                reject(error)
            }

        })
    }
    static race(lists) {
        return new MyPromise((resolve, reject) => {
            let cb
            while (cb = lists.shift()) {
                MyPromise.resolve(cb).then(val => {
                    resolve(val)
                }, err => {
                    reject(err)
                })
            }
        })
    }
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        )
    }
}
// try {
//     module.exports = MyPromise
// } catch (e) { }
// MyPromise.deferred = MyPromise.defer = function () {
//     var dfd = {}
//     dfd.promise = new MyPromise(function (resolve, reject) {
//         dfd.resolve = resolve
//         dfd.reject = reject
//     })
//     return dfd
// }

var promise1 = MyPromise.resolve(3);
var promise2 = 42;
var promise3 = new MyPromise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

MyPromise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});

// let p = new MyPromise(function (resolve, rejected) {
//     setTimeout(() => {
//         console.log('2323232332: ',);
//         resolve('fuck you!!')
//     }, 1000)
// }).then(function (value1) {
//     console.log('value1: ', value1);
//     return 'fuck you!!222'
// }, function (err1) {
// }).then(function (value2) {
//     console.log('value2: ', value2);
//     return 'en?'
// }).then(function (value3) {
//     console.log('value3: ', value3);
// })
// var promise1 = MyPromise.resolve(123);

// promise1.then(function (value) {
//     console.log('value: ', value);
// });
// var promise1 = Promise.resolve(3);
// var promise2 = 42;
// var promise3 = new Promise(function (resolve, reject) {
//     setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then(function (values) {
//     console.log(values);
// });