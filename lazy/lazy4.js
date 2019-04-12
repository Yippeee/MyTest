

class Lazy {
    constructor() {
        this.iterator = null
    }
    *_range(start, end) {
        for (let i = start; i <= end; i++) {
            yield i
        }
    }
    range(start, end) {
        this.iterator = this._range(start, end)
        return this
    }
    *_map(flow, fn) {
        for (const iterator of flow) {
            yield fn(iterator)
        }
    }
    map(fn) {
        this.iterator = this._map(this.iterator, fn)
        return this
    }
    *_filter(flow, fn) {
        for (const iterator of flow) {
            if(fn(iterator)){
                yield iterator
            }
        }
    }
    filter(fn) {
        this.iterator = this._filter(this.iterator, fn)
        return this
    }
    *_take(flow, num) {
        for (const i of flow) {
            yield i
            if (--num < 1) {
                break
            }
        }
    }
    take(num) {
        this.iterator = this._take(this.iterator, num)
        return this
    }
    [Symbol.iterator]() {
        return this.iterator
    }
}

function lazy() {
    return new Lazy()
}
// const nums = lazy().range(0, 100).take(3);
const nums = lazy().range(0, 100).map(n => n * 10).filter((val) => val > 33).take(3);


for (let n of nums) {
    console.log('numF:\t', n, '\n');
}

