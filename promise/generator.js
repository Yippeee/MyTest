// async function fn(args) {

// }

// /** 等同于 */

// function fn(args) {
//     return spawn(function* () {

//     })
// }

// function spawn(genF) {
//     return new Promise((resolve, reject) => {
//         const gen = genF()
//         step(function () {return gen.next()})
//         function step(nextF) {
//             let next = nextF()
//             if(next.done){
//                 return resolve(next.done)
//             }
//             Promise.resolve(next.value).then((val) => {
//                 step(function () {return gen.next(val)})
//             }, (e) => {
//                 stop(function () {return gen.throw(e)})
//             })
//         }
//     })
// }

let p = new Promise(function(resolve, reject){
    console.log(1)
    setTimeout(()=>{
        resolve(12)
        console.log('I am coming') // 还是会执行的
    }, 100)
}).then((val) => {
    console.log(val)
}, (e) => {

})
