// class babel

function _classCallCheck(instance, constructor) {
    if (!(instance instanceof constructor)) {
        throw new Error('e')
    }
}


// 模仿 new 实现
function objectFactory(...arg) {
    let obj = new Object(), // 生成新的对象, 是一个实例 (instance)
        constructor = arg[0],
        args = arg.slice(1);
    let result = constructor.call(obj, ...args) // 访问构造函数中的属性, 同时如果构造函数有返回而且返回值是对象以返回的为准
    obj.__proto__ = constructor.prototype // 访问构造函数原型中的属性
    return typeof result === 'object' ? result : obj // 返回这个新的 对象(注意, 一定是Object)
}

// 就是想到一个点, 如果需要手动的去写继承的方法, 就一定得注意的点就是, 继承要分成两个部分, 一个是继承构造函数里面的属性, 还有一个就是
// 构造函数原型对象的属性.constructor.prototype 