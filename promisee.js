const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isFunction = (fn) => typeof fn === 'function'

class MyPromise {
    constructor(handle) {
        if (isFunction(handle)) throw new Error('handle must be a function')
        this.value = undefined
        this.status = PENDING

        this.fulfilledQueues = []
        this.rejectedQueues = []

        try {
            handle.call(this, this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {

        }
    }
    resolve(value) {
        this.value = value
        this.status = FULFILLED
    }
    reject(error) {
        this.value = error
        this.status = REJECTED
    }
    then(onFulfilled, onRejected) {
        const { value, status } = this
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            const run = (value) => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value) // 穿透
                    } else {
                        let res = onFulfilled(value)
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
            }

            const rejected = (error) => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        let res = onRejected(error)
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }
            switch (status) {
                case PENDING:
                    this.rejectedQueues.push(rejected)
                    this.fulfilledQueues.push(run)
                case REJECTED:
                    this.resolve(value)
                    break
                case FULFILLED:
                    this.reject(value)
                    break
            }
        })
    }
}


let p = new Promise(function (resolve, reject) {
    resolve(10)
}).then()