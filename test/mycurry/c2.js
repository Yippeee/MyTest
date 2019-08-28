curry = function (fn) {
    return function temp(...args) {
        if (args.length < fn.length) {
            return function (...args2) {
                return temp(...args, ...args2)
            }
        } else {
            return fn(...args)
        }
    }
}
// curry = fn => temp = (...args) => { console.log('args: ', args); return args.length < fn.length ? (...args2) => temp(...args, ...args2) : fn(...args) }



// var curry = fn =>
//     judge = (...args) =>
//         args.length === fn.length
//             ? fn(...args)
//             : (arg) => judge(...args, arg)

// var curry = fn =>
//     temp = (...args) =>
//         args.length < fn.length
//             ? (...args2) => temp(...args, ...args2)
//             : fn(...args)

function add(a, b) {
    return a + b
}
let add1 = curry(add)(23)
console.log('add1: ', add1);

let o = add1(3)
console.log('o: ', o);

let p = add1(4)
console.log('p: ', p);

const split = curry(function (separator, str) { console.log(str); return str.split(separator) })
const map = curry(function (fn, arr) { console.log('arr: ', arr); return arr.map(fn) })

let s = split('-')
console.log('s: ', s);
let qw = s('23-12-sdf')
console.log('qw: ', qw);
let qw2 = s('023-67981040')
console.log('qw2: ', qw2);


