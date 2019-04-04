
function lazy() {
    return new _Lazy()
}

const range = function* (from, to) {
    for (let i = from; i <= to; i++) {
        console.log('range\t', i)
        yield i
    }
}

const map = function* (iterator, transform) {
    for (const i of iterator) {
        console.log('map\t', i)
        yield transform(i)
    }
}

const filter = function* (iterator, condition) {
    for (const i of iterator) {
        if (condition(i)) {
            console.log('filter\t', i)
            yield i
        }
    }
}

const stop = function* (iterator, fn) {
    for (const i of iterator) {
        console.log('stop\t', i)
        yield i
        if(!fn()) break 
    }
}

const take = function (iterator, num) {
    let i = 0
    return stop(iterator, function () {
        return i++ < num
    })
}

class _Lazy {
    constructor() {
        this.iterator = null
    }
    range(from, to) {
        this.iterator = range(from, to)
        return this
    }
    map(transform) {
        this.iterator = map(this.iterator, transform)
        return this
    }
    filter(condition) {
        this.iterator = filter(this.iterator, condition)
        return this
    }
    take(num) {
        this.iterator = take(this.iterator, num)
        return this
    }
    [Symbol.iterator]() {
        return this.iterator
    }
}


const num = lazy().range(0, 100).map(n => n * 10).filter(n => n % 3 === 0).take(2);
