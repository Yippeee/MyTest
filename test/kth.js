const K = 50

function generateRandomArray(bit){
    return Array.from({length: bit}, _ => ~~(Math.random() * 100)) // 0 ~ 99
}

let arr = generateRandomArray(100)
console.log('arr: ', arr);

function k1(arr) {
    return arr.sort()[K]
}
console.time(1)
c = k1(arr)
console.log('c: ', c);
console.timeEnd(1)

function k2 (arr) {
    for (const iterator of arr) {
        iterator
    }
}