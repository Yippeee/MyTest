function tc_add(a, b) {
    while (b != 0) {
        let _a = a ^ b
        let _b = (a & b) << 1
        a = _a
        b = _b
        console.log('a:', a)
        console.log('b:', b)
    }
    return a
}
console.log(tc_add(119, 5))
let a = 12, b = 222
a = a ^ b
b = a ^ b
a = a ^ b
console.log(a, b)
