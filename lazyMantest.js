// function machine(val) {
//     let queues = []
//     let wait, waitFirst
//     return {
//         execute() {
//             let cb
//             Promise.resolve(waitFirst).then(() => {
//                 console.log('start', val)
//             }).then(() => {
//                 return Promise.resolve(wait)
//             }).then(() => {
//                 while (cb = queues.shift()) {
//                     cb()
//                 }
//             })
//         },
//         do(doVal) {
//             const run = () => {
//                 console.log(val, doVal)
//             }
//             queues.push(run)
//             return this
//         },
//         wait(time) {
//             wait = new Promise((resolve) => {
//                 setTimeout(() => {
//                     resolve()
//                 }, time * 1000)
//             })
//             return this
//         },
//         waitFirst(time) {
//             waitFirst = new Promise((resolve) => {
//                 setTimeout(() => {
//                     resolve()
//                 }, time * 1000)
//             })
//             return this
//         }
//     }
// }
// machine('ygy').execute()
// start ygy
// machine('ygy').do('eat').execute();
// start ygy
// ygy eat
// machine('ygy').wait(5).do('eat').execute();
// // start ygy
// // wait 5s（这里等待了5s）
// // ygy eat
// machine('ygy').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat

// function Fibonacci(n) {
//     if (n === 1 || n === 2) return 1
//     return Fibonacci(n - 1) + Fibonacci(n - 2)
// }

// console.time(1)
// console.log('Fibonacci(50): ', Fibonacci(50));
// console.timeEnd(1)

// function Fibonacci2(n) {
//     if (n === 1 || n === 2) return 1
//     let result = 1, a1 = 1
//     for (let i = 3; i <= n; i++) {
//         result = result + a1
//         a1 = result - a1
//     }
//     return result
// }

// console.time(2)
// console.log('Fibonacci2(50): ', Fibonacci2(50));
// console.timeEnd(2)

// function Fibonacci3(n, val1 = 1, val2 = 1) {
//     if (n === 1) return val2
//     return Fibonacci3(n - 1, val1 + val2, val1)
// }

// console.time(3)
// console.log('Fibonacci3(50, 1, 1): ', Fibonacci3(50, 1, 1));
// console.timeEnd(3)

// function once(fn) {
//     let run = false
//     return function () {
//         if (run) return
//         fn.call(this, arguments)
//         run = true
//     }
// }

// let fn = once(function (a) { console.log('输出:', a) })
// fn('aha!moment')
// fn('aha!moment')
// fn('aha!moment')
// fn('aha!moment')

// // 首字母大写

// function capitalize(word) {
//     return word.charAt(0).toUpperCase() + word.slice(1)
// }
// console.log('capitalize(): ', capitalize('fuck'));

// function capitalize2(word) {
//     return word.replace(/\b([a-z])/, function (match, p1) {
//         return p1.toUpperCase()
//     })
// }
// console.log('capitalize2(): ', capitalize2('fuck'));

// // 驼峰
// function hyphenate(word) {
//     return word.replace(/\B([A-Z])/g, function (m, p1) {
//         return '_' + p1.toLowerCase()
//     })
// }
// console.log('hyphenate(): ', hyphenate('aaBBJnHIfdF'));

// var sentence = 'The quick brown fox jumps over the lazy dog.';

// var index = 14;

// console.log('The character code ' + sentence.charCodeAt(index) + ' is equal to ' + sentence.charAt(index));

// function findLostLetter(word) {
//     // for (const w of word) {
//     //     console.log(w)
//     // }
//     let result = []
//     for(let i = 1; i < word.length; i++){
//         let diff = word.charCodeAt(i) - word.charCodeAt(i - 1) 
//         if(diff !== 1){
//             result.push(String.fromCodePoint(word.charCodeAt(i) - diff + 1))
//         }
//     }
//     return result
// }

// console.log('findLostLetter(abcdf): ', findLostLetter('abcdfghijknopqstuxyz'));
// let str = 'asdfg'
// console.log(str[3])
// charAt
// charCodeAt
// String.fromCharCode()

// function* IPanel() {
//     yield '豪华';
//     yield 2019;
//     yield [1, 2, 3];
// }
// for (const iterator of IPanel()) {
//     console.log(iterator)
// }
// 迭代器重用是没有意义的
// var p = IPanel()

// console.log('IPanel().next(): ', p.next());
// console.log('IPanel().next(): ', p.next());
// console.log('IPanel().next(): ', p.next());
// console.log('IPanel().next(): ', p.next());
// console.log('IPanel().next(): ', p.next());

// function Fibonacci(n) {
//     let [prev, curr] = [0, 1]
//     while(n-- > 1) {
//         [prev, curr] = [curr, prev + curr]
//     }
//     return curr
// }

// let n = 17
// console.log(`Fibonacci(${n}): `, Fibonacci(n));


let val = 7140229933

// const isPrimeNum = function (num) {
//     for (let i = 2; i < num; i++) {
//         if (num % i === 0) return false
//     }
//     return true
// }
let arr = []
for (let i = 1; i < 990000; i++) {
    if (isPrimeNum(i)) {
        arr.push(i)
    }
}

let length = arr.length

for (let i = 0; i < length; i++) {
    let a1 = arr[i]
    for (let j = i + 1; j < length; j++) {
        let a2 = arr[j]
        if(a1 * a2.toString().slice(0,-3) === '6541367'){
            console.log('a2: ', a2);
            console.log('a1: ', a1);
        }
    }
}

function isPrimeNum(num){
    for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num%i==0){
            return false;
        }
    };
    return true;
}
