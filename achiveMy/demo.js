
/**
 * @desc 函数防抖 - 在规定时间内, 重复的请求以最后一次的为准
 * @param {Function} 防抖的函数
 * @param {Number} 延迟时间 
 * @param {Boolean} 是否立刻执行 
 * @return {Function}
 */
function debounce(fn, time = 1000, immediate = false) {
    let timer = null
    let debounceFn = function (args) {
        const that = this
        clearTimeout(timer)
        if (immediate) { // 立刻执行
            let callNow = !timer
            timer = setTimeout(() => timer = null, time)
            if (callNow) fn.call(that, ...args)
        } else {
            timer = setTimeout(_ => {
                fn.call(that, ...args)
            })
        }
    }
    debounceFn.cancel = function () {
        clearTimeout(timer)
        timer = null
    }
    return debounceFn
}

/**
 * @param  {Function} fn
 * @param  {Number} time
 * @param  {Object} option
 * @return {Function} 
 */
function throttle(fn, time, option) {
    let flag = false
    return function (...args) {
        if (!flag) return
        fn.call(this, ...args)
        flag = true
        setTimeout(() => flag = true, time)
    }
}