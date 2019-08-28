// const { compose, curry } = require('./tt')

// var upperCase = function (x) {
//     return x.toUpperCase(x)
// }

// var hello = function (x) {
//     return 'hello,' + x
// }

// var greet = compose(upperCase, hello)
// c = greet('jack')
// console.log('c: ', c);

// // 需求：输入 'kevin daisy kelly'，返回 'K.D.K'

// // 这个就很不纯
// var initial = function (name) {
//     return name.split(' ').map(item => item[0]).map(item => item.toUpperCase()).join('.')
// }
// c = initial('kevin daisy kelly')
// console.log('c: ', c);
// function compose() {
//     var args = arguments;
//     var start = args.length - 1;
//     return function () {
//         var i = start;
//         var result = args[start].apply(this, arguments);
//         while (i--) result = args[i].call(this, result);
//         return result;
//     };
// };
const compose = function (...fns) {
    let start = fns.length - 1
    return function (...args) {
        let result = fns[start].apply(this, args)
        while (start--) {
            result = fns[start].call(this, result)
        }
        return result
    }
}

const curry = function curry(fn) {
    return function temp(...args1) {
        if (args1.length >= fn.length) {
            return fn.apply(this, args1)
        } else {
            return function (...args2) {
                return temp(...args1, ...args2)
            }
        }
    }
}
// 来一个纯的很的

const split = curry(function (separator, str) { return str.split(separator) })
const map = curry(function (fn, arr) { return arr.map(fn) })
const upper = function (x) { return x.toUpperCase() }
const join = curry(function (separator, arr) { return arr.join(separator) })
const head = function (str) { return str.slice(0, 1) }

// 由里向外,由左到右
var i2 = compose(join('.'), map(upper), map(head), split(' '))
c = i2('kevin daisy kelly')
console.log('c: ', c);