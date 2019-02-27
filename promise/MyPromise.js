
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn) {
    //fn must be a function
    let self = this
    this.value = null // 成功的值
    this.error = null // 失败的原因
    this.onFulfilledCallbacks = [] // 成功后的回调函数
    this.onRejectedCallbacks = [] //失败后的回调函数

    this.state = PENDING //开始的默认的状态

    function resolve(value) {
        if (self.state === PENDING) {
            setTimeout(() => {
                self.state = FULFILLED
                self.value = value
                self.onFulfilledCallbacks.forEach((callback) => {
                    callback(value)
                })
            })
        }
    }

    function reject(error) {
        if (self.state === PENDING) {
            setTimeout(() => {
                self.state = REJECTED
                self.error = error
                self.onRejectedCallbacks.forEach((callback) => {
                    callback(error)
                })
            })
        }
    }

    fn.call(self, resolve, reject)
}
// 用于解析
function resolvePromise(bridgePromise, x, resolve, reject) {
    if (x instanceof MyPromise) {
        if (x.state === PENDING) {
            x.then(y => {
                resolvePromise(bridgePromise, y, resolve, reject);
            })
        } else {
            x.then(resolve, reject)
        }
    } else {
        resolve(x)
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    let bridgePromise;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

    if (this.state === FULFILLED) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.onFulfilled)
                    resolvePromise(bridgePromise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        })
    } else if (this.state === REJECTED) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.onFulfilled)
                    resolvePromise(bridgePromise, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        })
    } else if (this.state === PENDING) {
        return bridgePromise = new MyPromise((resolve, reject) => {
            self.onFulfilledCallbacks.push((value) => {
                self.onFulfilled(value)
                resolvePromise(bridgePromise, x, resolve, reject)
            })
            self.onRejectedCallbacks.push((value) => {
                self.onRejected(value)
                resolvePromise(bridgePromise, x, resolve, reject)
            })
        })
    }
}

MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        let result = []
        let count = 0
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((data) => {
                result[i] = data
                if (++count === promises.length) {
                    resolve(result)
                }
            }, (error) => {
                reject(error)
            })
        }
    })
}

MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((data) => {
                resolve(data)
            }, (error) => {
                reject(error)
            })
        }
    })
}
// module.exports = MyPromise

// 执行测试用例需要用到的代码
MyPromise.deferred = function() {
    let defer = {};
    defer.promise = new MyPromise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
try {
    module.exports = MyPromise
} catch (e) {}
