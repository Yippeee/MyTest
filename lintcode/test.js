// const numbers = function* () {
//     var a = 1
//     while (true) {
//         console.log(a)
//         yield a++
//     }
// }
// // 找出10000以下, 同时是乘方数和奇数的数字  sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
// // factory function 
// const lazy = iterator => {
//     const next = iterator.next.bind(iterator)
//     const map = () => { }
//     const filter = () => { }
//     const takeWhile = () => { }
//     return {
//         next,
//         map,
//         filter,
//         takeWhile
//     }
// }
// // lazy(numbers()).next()
// // 实现一个map函数 功能:把每次next返回的值, 根据回调函数就行修改

// const map = fn => {
//     const modifiedVal = this.next().val
// }

// var str = 'this is a pen'

// function capital(str) {
//     return str.split(' ').map(t => t[0].toUpperCase() + t.slice(1)).join(' ')
// }
// // console.log('capital(str): ', capital(str));
// function capital2(str) {
//     return str.replace(/\b(\w)/g, t => t.toUpperCase())
// }
// console.log('capital2(str): ', capital2(str));

// // 判断数组中是否有重复的值
// function checkRe(arr) {
//     return arr.reduce((a, c) => (a ^ c), 0) === 0
// }
// // checkRe([1,2,3,4])
// console.log('checkRe([1,2,3,4]): ', checkRe([1, 2, 3, 4]));

// //找出数组中唯一一个只出现一次的值
// function findUnique(arr) {
//     return arr.reduce((a, c) => (a ^ c), 0)
// }
// console.log('findUnique(): ', findUnique([1, 1, 2, 2, 3, 3, 4, 4, 9]));
// // 总结一下异或, 像是二进制的加法, 但是是没有进位的加法
// // 再来一遍异或的规则, 相同就是0,不同才是1. 但是这是在二进制补码才是这种情况,所以对于js中的数来说,只有相同是0 这一条才是成立的

// // 找出数组中重复的元素
// function findRe(arr) {
//     var flag = 0
//     var result = []
//     var length = arr.length
//     // 类似 基数排序 找出重复的元素, 这个排序的基准是说的,数组中的数值都是在数组的长度范围之内的
//     for (var i = 0; i < length; i++) {
//         if (arr[flag] !== flag) {
//             console.log('flag: ', flag);
//             // [arr[0], arr[arr[0]]] = [arr[arr[0]], arr[0]]
//             var temp = arr[flag]
//             arr[flag] = arr[temp]
//             arr[temp] = temp
//             console.log('arr: ', arr);
//             if (arr[flag] === arr[arr[flag]]) {
//                 result.push(arr[flag++])
//             }
//         } else {
//             flag++
//         }
//     }

//     return result
// }
// console.log('findRe(): ', findRe([4, 1, 2, 3, 2, 5, 3]));
// 一分钟倒计时
// var count = 60
// const timer = setInterval(() => {
//     count--
//     console.log(count)
//     if (count <= 0) {
//         clearInterval(timer)
//     }
// }, 1000)

// check if has repeat 
// function checkHasRe(str) {
//     var reg = /([\w\W])\1/g
//     return reg.test(str)
// }
// console.log('checkHasRe(aaass): ', checkHasRe('asdfgh'));


// note: 所有用?匹配的,  都是不捕获的,  也就是分组之中不会有他们. 
// function toThousands(num) {
//     // var reg = /\d{1,3}(?=)/
//     // return num.replace()
//     var reg = /([b-z]{2})(?=a)/g
//     return num.replace(reg, function(p,$1) {
//         console.log('p: ', p);
//         console.log('$1: ', $1);
//         return $1.toUpperCase()
//     })
// }
// console.log('toThousands(): ', toThousands('aewafdsfweaafdggsa'));aEWafdsfWEaafdgGSa

// var reg1 = /\d{1,3}?(\d{3})+$/
// var reg2 = /(\d{1,3})(?:(\d{3})+?)$/g
// var reg3 = /\d{1,3}(?=(\d{3})+$)/g
// var num = '1234567890'
// // num.replace(reg1, function (p, $1, $2) {
// //     console.log('p: ', p);
// //     console.log('$1: ', $1);
// //     console.log('$2: ', $2);
// // })
// // num.replace(reg2, function (p, $1, $2) {
// //     console.log('p: ', p);
// //     console.log('$1: ', $1);
// //     console.log('$2: ', $2);
// // })
// a = num.replace(reg3, function (p, $1, $2) {
//     console.log('p: ', p);
//     console.log('$1: ', $1);
//     console.log('$2: ', $2);
//     return p + ','
// })
// console.log(a)

// var reg = /-([a-z])/g
// var a = 'get-element-by-id'.replace(reg,function(p,$1) {
//     return $1.toUpperCase()
// })
// console.log(a)

// r = /^\d{3}-\d{3}-\d{4}$/

// r = /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/

// r = /\d{1,3}(?=(\d{3})+$)/
// //匹配 url
// var reg = /(\w+)=(\w+)/g
// a = 'https://www.google.com/search?q=91&oq=91&aqs=chrome69i57j0j69i61j69i60l31734j0j9&sourceid=chrome&ie=UTF-8'
// b = a.replace(reg, function (p, $1) {
//     console.log('p: ', p);
//     console.log('$1: ', $1);
// })
// console.log(b)

//  利用正则判断是否大于6位,得有字母
// var reg = /(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&*~])/
// console.log('reg.test(): ', reg.test('D2fw#ww'));

// implement equal function
// function Is(a, b) {
//     if (a === b) { // 这里是考虑+0 和 -0的地方
//         return a !== 0 && 1 / a === 1 / b
//     } else { // 这里是解决NaN的问题
//         return a !== a && b !== b
//     }
// }

// function equalArr(obj1,obj2){

// }

// const p = new Promise()
const generateRandom = () => Date.now()
const getWindow = function () { return this }

Function.prototype.MyCall = function (thisArg, ...args) { // 不要使用箭头函数,会没有this
    if (typeof this !== 'function') throw new Error(this + 'is not a function')
    if (thisArg === null) thisArg = getWindow()
    var random = generateRandom()
    thisArg[random] = this
    var result = thisArg[generateRandom](...args) // 函数执行的有返回值, 需要将返回值返回的
    delete thisArg[random]
    return result
}
Function.prototype.MyApply = function (thisArg, args) {
    this.MyCall(thisArg, ...args)
}
// 用...的地方可以用遍历,然后用eval解决

function Fn(a, b, c) {
    // console.log(this.name)
    // console.log('a,b,c: ', a,b,c);
}
var obj = { name: 'Jack' }
// 如果我们想实现apply, 看下效果
// Fn.apply() Jack
// 等同于 var obj = {name:"Jack";fn(一个函数名): Fn(console.log(this.name))}
// 试下把对象属性给函数 (想了一下,不应该这么做,对象属性明显大于等于函数属性的数量)

Fn.MyCall(obj, 'so', 'you', 'love me?')
Fn.MyApply(obj, ['so', 'you', 'love me?'])
// 看出 bind和 call apply的区别 ,bind是返回的一个函数, 并不会去执行,而call apply会执行
// 所以bind常常在定义时候就生命

// var a = { name: 'fuck' }
// function b() {
//     console.log(this.name)
// }
// var s = b.bind(a)
// console.log('s: ', s);
// s()

// 利用call来实现
Function.prototype.MyBind = function (thisArg, ...args) {
    var self = this
    return function () {
        return self.call(thisArg, ...args)
    }
}
var a = { name: 'fuck' }
function b() {
    console.log(this.name)
}
var r = b.bind(a)
console.log('r: ', r);
r()
