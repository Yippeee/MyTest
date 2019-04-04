const range = function* (from, to) {
    for (let i = from; i < to; i++) {
        // console.log('range\t', i);
        yield i;
    }
}
// for ... of 是会默认变量完生成器对象的

const map = function* (flow, transform) {
    for (const data of flow) {
        console.log('map\t', data);
        yield (transform(data));
    }
}

const filter = function* (flow, condition) {
    for (const data of flow) {
        console.log('filter\t', data);
        if (condition(data)) {
            yield data;
        }
    }
}

const stop = function* (flow, condition) {
    for (const data of flow) {
        yield data;
        if (condition(data)) {
            break;
        }
    }
}

const take = function (flow, number) {
    let count = 0;
    const _filter = function () {
        return count++ >= number;
    }
    return stop(flow, _filter);
}

class _Lazy {
    constructor() {
        this.iterator = null;
    }

    range(from, to) {
        this.iterator = range(from, to);
        return this;
    }

    map(transform) {
        this.iterator = map(this.iterator, transform); // 这个地方如果不主动把iterator传过去， 在那边再取的话， 值就已经发生改变了
        return this;
    }

    filter(condition) {
        this.iterator = filter(this.iterator, condition);
        return this;
    }

    take(number) {
        this.iterator = take(this.iterator, number);
        return this;
    }

    [Symbol.iterator]() {
        return this.iterator;
    }

}

function lazy() {
    return new _Lazy();
}

const nums = lazy().range(0, 100).map(n => n * 10).filter(n => n % 3 === 0).take(3);

for (let n of nums) {
    console.log('numF:\t', n, '\n');
}
