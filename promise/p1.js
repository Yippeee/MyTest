const isFunction = fn => Object.prototype.toString.call(fn) === '[object Function]'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) throw new Error('promise must accept a function')

        this._status = PENDING
        this._value = undefined

        this._fulfilledQueues = []
        this._rejectedQueues = []

        try {
            // 实现promise中预定义的第一个参数(resolve)  和  第二个参数(reject), 并且将 promise 中的函数参数直接执行
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject.call(this)
        }

    }
    _resolve(value) {
        // _fulfilledQueues 队列中的函数执行
        this._status = FULFILLED
        for (const fulfill of this._fulfilledQueues) {
            fulfill(value)
        }
    }
    _reject(error) {
        this._status = REJECTED
        for (const reject of this._rejectedQueues) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        const { _status } = this
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            switch (_status) {
                // case PENDING:
                //     this.,
                case FULFILLED:

            }
        })
    }
    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
    static reject(error) {
        return new MyPromise((resolve, reject) => reject(error))
    }
    static race(promises) {
        return new MyPromise((res, rej) => {
            for (const p of promises) {
                this.resolve(p).then(r => {
                    res(r)
                }, err => {
                    rej(err)
                })
            }
        })
    }
    static all(promises) {
        return new MyPromise((res, rej) => {
            let result = []
            for (const p of promises) {
                this.resolve(p).then(r => {
                    result.push(r)
                    if (result.length === promises.length) {
                        res(result)
                    }
                }, err => {
                    rej(err)
                })
            }
        })
    }
}

const p = new Promise((res, rej) => {
    console.log(11)
    setImmediate(() => {
        res(12)
    }, 10)
}).then(res => {

}, err => {

})
