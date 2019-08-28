// 利用闭包加上递归, 完成第二版的curry 函数,但是函数不定参数的情况下,还是不可操作的
const curry = function (fn, args = [].slice(arguments)) {
    if (arguments.length === fn.length) {
        return fn.apply(this, args)
    }
    return function () {
        args = args.concat(Array.from(arguments))
        if (args.length !== fn.length) {
            return curry(fn, args,)
        } else {
            return fn.apply(this, args)
        }
    }
}

function sum(a, b, c, d, e) {
    return a + b + c + d + e
}

a = curry(sum)
c = a(1, 2, 3, 4, 5)
console.log('c: ', c);
