let MyPromise = require('./MyPromise.js')
console.log(MyPromise)
let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('sfda')
    }, 0)
})
p.then(console.log, console.error).then(console.log, console.error).then(console.log, console.error)