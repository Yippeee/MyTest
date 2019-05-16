a = [1, 2, 3].reduce((a, c, i, arr) => {
    return a = a + c
}, 0)
console.log(a)

b = [1, 2, 3].reduce(Math.pow)
console.log('b: ', b);

// Math.pow(1,2)

Promise.all = async (promises) => {
    if (promises.length <= 0) return []
    const [head, ...tails] = promises
    return [await head, ...(Promise.all(tails))]
}

function sum(a) {
    return function (b) {
        return a + b
    }
}
c = sum(1)(2)
console.log('c: ', c);

function sum2(x) {
    let result = x
    let tempFn = function (y) {
        result += y
        return tempFn
    }
    tempFn.toString = _ => result
    return tempFn
}

c = sum2(1)(2)(3)(4)
console.log('c: ', c);

