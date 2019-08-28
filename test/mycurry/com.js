/**
 * @desc 利用一个函数来缓存参数
 * @param  {Function} fn 第一个参数才是要运行的函数
 */
// function sub_curry(fn) {
//     arg = [].slice.call(arguments, 1)
//     return function () {
//         return fn.apply(this, arg.concat(Array.from(arguments)))
//     }
// }

// function curry(fn, length = fn.length) {
//     return function () {
//         let combine = [fn].concat(Array.from(arguments))
//         if (arguments.length < length) {
//             return curry(sub_curry.apply(this, combine), length - arguments.length)
//         } else {
//             return fn.apply(this, arguments)
//         }
//     }
// }

// const curry = function (fn) {
//     return function temp(...args) {
//         if (args.length >= fn.length) {
//             return fn(...args)
//         } else {
//             return function (...args2) {
//                 return temp(...args, ...args2)
//             }
//         }
//     }
// }

const curry = fn => temp = (...args) => args.length >= fn.length ? fn(...args) : (...args2) => temp(...args, ...args2)

function add(a, b) {
    return a + b
}
let add1 = curry(add)(23)
// console.log('add1: ', add1);

let o = add1(3)
console.log('o: ', o);

let p = add1(4)
console.log('p: ', p);

const split = curry(function (separator, str) { return str.split(separator) })
const map = curry(function (fn, arr) { return arr.map(fn) })

let s = split('-')
console.log('s: ', s);
let qw = s('0023-12-sd1221f')
// console.log('qw: ', qw);
// let qw2 = s('023-67981040')
// console.log('qw2: ', qw2);
// let qw3 = s('0798-999-234')
// console.log('qw3: ', qw3);


const compose = function (...fns) {
    let start = fns.length - 1
    return function (...args) {
        let result = fns[start].apply(this, args)
        while (start--) {
            result = fn[start].apply(this, ...result)
        }
        return result
    }
}