function lazy() {
    return new Lazy()
}

const range = function* (from, to) {
    for (let i = from; i <= to; i++) {
        console.log('range:\t ', i);
        yield i
    }
}

const stop = function* (flow, condition) {
    for (const iterator of flow) {
        if (condition()) break
        yield iterator
    }
}

const take = function (flow, num) {
    console.log('num: ', num);
    let i = 0
    return stop(flow, _ => i++ >= num)
}

const map = function* (flow, fn) {
    let iterator = flow.next().value
    yield fn(iterator)

}

class Lazy {
    constructor() {
        this.iterator = null
    }
    range(...args) {
        this.iterator = range(...args)
        return this
    }
    map(fn) {
        this.iterator = map(this.iterator, fn)
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

// aims：

const nums = lazy().range(0, 100).map((val) => (val + 23) * 2).take(4);

for (const iterator of nums) {
    console.log('iterator: \t', iterator);
}