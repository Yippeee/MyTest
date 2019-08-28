
// 总结: 所以,写函数默认值的时候,结构的默认值需要放在左边

// 函数参数,对象,数组中的 ... 不是解构赋值,而是rest参数, 同时这个rest 必须作为最后一个参数
// 误区: ... 一直都不是解构,只是常常在一起使用而已, 而是rest参数
// ... 更多的应该叫做扩展运算符

let arr = [1, 2, 3, 4, 5]
let iterator = arr.values()
console.log('iterator: ', iterator);