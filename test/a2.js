// 完成一个 sum 函数 
// 实现功能 sum(1)(2)

function sum() {
    let result = Array.from(arguments)
    let temp = function () {
        result = result.concat(Array.from(arguments))
        return temp
    }
    temp.valueOf = temp.toString = function () {
        return result.reduce((all, c) => {
            return all += c
        }, 0)
    }
    return temp
}

c = sum(1, 2)(12)(14)
console.log('c: ', c);

const _ = require('../lodash源码')
const curry = _.curry

var match = curry(function (what, str) {
    return str.match(what);
});


const m1 = match(/kk/ig)
console.log('m1: ', m1);