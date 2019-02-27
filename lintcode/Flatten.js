// const flatArr = arr =>  arr.reduce((a, c) => a.concat(!Array.isArray(c) ? c : flatArr(c)),[])
// a = flatArr([4,[3,[2,[1]]]])
// console.log(a)
// console.log('[4,[3,[2,[1]]]].toString(): ', [4,[3,[2,[1]]]].toString());
// '4,5,6'.split(',')
// console.log(': ', '4,5,6'.split(','));
// function arr(arr) {
//     return arr.toString().split(',')
// }
// let aaa = arr([4,[3,[2,[1]]]])
// console.log('aaa: ', aaa);

// function generateFiveToTen () {
//     return Math.ceil(Math.random()*16 + 4)
// }
// let bb = generateFiveToTen()
// while (bb !== 5){
//     bb = generateFiveToTen()
// }
// console.log('bb: ', bb);

// function bubble(arr) {
//     console.log('arr: ', arr);
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//             }
//         }
//     }
//     return arr
// }
// console.log(bubble([3, 4, 5, 2, 7, 8, 9, 3, 12, 23, 1]))

var name = 'Jack'
var obj = {
    name : 'Mary',
    getName : function () {
        console.log(this)
        return this.name
    }
}
console.log(obj.getName());
var func = obj.getName
console.log(func());
console.log(func.call(obj));