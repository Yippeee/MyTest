// 这个版本的 curry 函数的问题在于只能用于深度为1的 柯里化

const curry = function (fn) {
    let args = [].slice.call(arguments, 1)
    return function () {
        let newArgs = args.concat(Array.from(arguments))
        return fn.apply(fn, newArgs)
    }
}

const sum = function () {
    return Array.from(arguments).reduce((acc, cur) => {
        return acc + cur
    }, 0)
}

const sumFactory = curry(sum, 1, 4)

c = sumFactory(3)(3)
console.log('c: ', c);
