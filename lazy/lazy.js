const over = Symbol()

const isOver = function (_over) {
    return _over === over
}

const range = function (from, to) {
    let i = from
    return function () {
        if (i < to) {
            console.log('range\t', i)
            return ++i
        } else {
            return over
        }
    }
}

const map = function (flow, transform) {
    return function () {
        let data = flow()
        if (!isOver(data)) {
            console.log('map\t', data)
            return transform(data)
        } else {
            return over
        }
    }

}

const filter = function (flow, transform) {
    return function () {
        while (true) {
            let data = flow()
            if (!isOver(data)) {
                if (transform(data)) {
                    console.log('filter\t', data)
                    return data
                }
            } else {
                return over
            }
        }

    }
}

const stop = function (flow, condition) {
    let _stop = false
    return function () {
        if (_stop) return over
        let data = flow()
        if (!isOver(data)) {
            _stop = condition(data)
            return data
        } else {
            return over
        }
    }
}

const join = function (flow) {
    const arr = []
    console.log('arr: ', arr);
    while (1) {
        const data = flow()
        console.log('data: ', data);
        if (isOver(data)) break
        arr.push(data)
    }
    return arr
}

const take = function (flow, number) {
    let i = 0
    return stop(flow, () => ++i >= number)
}


const num = join(take(filter(map(range(0, 20), n => n * 10), n => n % 3 === 0), 2));
console.log(num);
