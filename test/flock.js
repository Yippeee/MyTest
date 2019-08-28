const memoize = function (f) {
    const cache = {}
    return function() {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || f.apply(f, arguments)
        return cache[key]
    }
}