// // 题目如下:
// // 找出自然整数中小于 10000 的同时是乘方数和奇数的数字，再把这些数加总
// function foo1() {
//     let result = 0, i = 10000
//     while (--i) {
//         if (i & 1 === 1 && ~~Math.sqrt(i) == Math.sqrt(i)) {
//             result += i
//         }
//     }
//     console.log('result: ', result);
//     return result
// }
// console.time(1)
// foo1()
// console.timeEnd(1)

// // produce num function
// const num = function* () {
//     let i = 1
//     while (1) {
//         yield i
//     }
// }


function* demo() {
    console.log('demo1' + (yield 1))
}

let d = demo()
d.next()
// d.next()
