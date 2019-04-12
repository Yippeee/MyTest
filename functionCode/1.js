const R = require('ramda');

var str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';

const splitBySpace = s => s.split(' ')

const getLength = s => s.length

const getLengthArr = arr => R.map(getLength)(arr)

const moreLength = (a, b) => a > b ? a : b

const mostLength = arr => R.reduce(moreLength, 0)(arr)

const getLongestWordLength = R.pipe(
    splitBySpace,
    getLengthArr,
    mostLength
)

var a = getLongestWordLength(str)
console.log('a: ', a);