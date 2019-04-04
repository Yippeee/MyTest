function priceLt(x) {
    return function (item) { return item.price < x; };
}
var gems = [
    { name: 'Sunstone', price: 4 },
    { name: 'Amethyst', price: 15 },
    { name: 'Prehnite', price: 20 },
    { name: 'Sugilite', price: 7 },
    { name: 'Diopside', price: 3 },
    { name: 'Feldspar', price: 13 },
    { name: 'Dioptase', price: 2 },
    { name: 'Sapphire', price: 20 }
];

// 惰性求值的时候，直到所有的判断条件都

const MAX_ARRAY_LENGTH = 4294967295;

class LazyWrap {
    constructor(value) {
        this.value = value;
        this._filterFunction = null;
        this._takeNumber = MAX_ARRAY_LENGTH
    }
    filter(fn) {
        this._filterFunction = fn
        return this
    }
    take(number) {
        this._takeNumber = number
        return this
    }
    _value() {
        let result = []
        let count = this._takeNumber
        for (let i = 0; i < this.value.length; i++) {
            console.log('i: ', i);
            let item = this.value[i]
            if (this._filterFunction.call(this, item)) {
                result.push(item)
                count--
                if (count === 0) {
                    break
                }
            }
        }
        console.log('result: ', result);
        return result
    }
}

function _(value) {
    return new LazyWrap(value)
}

var chosen = _(gems).filter(priceLt(10)).take(3)._value();
