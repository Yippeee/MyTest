const letter = ['A', 'B', 'C', 'D', 'E']
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const getCard = item => number.map(n => `${n}${item}`)

// const deck = letter.map(getCard)
const deck = letter.flatMap(getCard)
// console.log('deck: ', deck);

const obj = {
    age: '19',
    [Symbol.toPrimitive](hint) {
        return this.age
    },
    toString() {
        console.log('toString')
        return 'toString'
    },
    valueOf() {
        console.log('valueOf')
        return '123'
    },
    toJSON() {
        console.log('`My age is ${this.age}`: ', `My age is ${this.age}`);
        return `My age is ${this.age}`
    },
}

const date = new Date()
// const reg = 
Date.prototype.format = function (format) {
    const regMap = new Map([
        [/y+/, this.getFullYear()], // 年
        [/m+/, this.getMonth()], // 月
        [/d+/, this.getDate()], // 日
    ])
    regMap.forEach((item, key) => format = format.replace(key, match => item.toString().padStart(match.length, 0)))
    console.log('format: ', format);
    return format
}
date.format('yyyy-mm-dd')
