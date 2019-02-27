const PENDING = Symbol(1)
const FULFILLED = Symbol(2)
const REJECTED = Symbol(3) // 1,2,3 ues for debug

function Promisee(fn) {
    if (typeof fn != 'function') {
        throw new Error('fn should be a function')
    }
    let state = PENDING
    let value = null
    let hander = {}
    function fulfill(val) {
        state = FULFILLED
        value = val
        next(hander)
    }
    function reject(err) {
        state = REJECTED
        value = err
        next(hander)
    }
    // 防止本身在fulfill函数中存在错误的情况
    function resolve(res) {
        try {
            fulfill(res)
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
                hander = { onFulfill, onReject }
                break
        }
    }
    this.then = function (onFulfill, onReject) {
        return new Promisee((resolve, reject) => {
            next({
                onFulfill: (val) => {
                    resolve(onFulfill(val))
                },
                onReject: function (val) {
                    console.log(val)
                }
            })
        })
    }
    fn(resolve, reject)
}

let p = new Promisee((resolve, reject) => {
    // resolve('hello')
    // reject('fuck')
    setTimeout(() => {
        reject('hello')
    }, 0)
})

p
    .then((res) => {
        console.log(res)
        return 'kkk'
    }, console.error.bind(null, 'error'))
    .then(res => {
        console.log(res)
    })