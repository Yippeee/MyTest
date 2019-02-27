// 三种状态
const PENDING = Symbol()
const FULFILLED = Symbol()
const REJECTED = Symbol()

function Prometheus(fn) {
    // fn 必须是函数
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function!')
    }

    let state = PENDING // 初始状态是 PENDING
    let value = null // 返回值
    let handler = {}

    function fulfill(result) {
        state = FULFILLED
        value = result
        next(handler)
    }

    // 拒绝时调用的方法
    function reject(error) {
        state = REJECTED
        value = error
        next(handler)
    }
    
    // 完成时调用的方法，这里做了容错
    function resolve(result) {
        try {
            fulfill(result)
        } catch (err) {
            reject(err)
        }
    }

    function next({ onFulfill, onReject }) {
        switch (state) {
            case FULFILLED:
                onFulfill && onFulfill(value)
                break
            case REJECTED:
                onReject && onReject(value)
                break
            case PENDING:
                handler = { onFulfill, onReject }
        }
    }

    this.then = function (onFulfill, onReject) {
        process.nextTick(() => {
            return new Prometheus((resolve, reject) => {
                next({
                    onFulfill: val => {
                        resolve(onFulfill(val))
                    },
                    onReject: err => {
                        reject(onReject(err))
                    }
                })
            })
        })
    }

    fn(resolve, reject)
}
console.log('-------------Prometheus----------------')
setTimeout(() => {
    console.log('4')
}, 0)
let p = new Prometheus((resolve, reject) => {
    console.log('1')
    resolve('3')
})

p.then(val => {
    console.log(val)
})
console.log('2')