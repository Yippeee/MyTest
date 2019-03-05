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

// var name = 'Jack'
// var obj = {
//     name : 'Mary',
//     getName : function () {
//         console.log(this)
//         return this.name
//     }
// }
// console.log(obj.getName());
// var func = obj.getName
// console.log(func());
// console.log(func.call(obj));

// function quickSort (arr) {
//  // 快排的思想是什么,选一个基准,比之大的放一边(右),小的放左边

// }

// function da(n) {
//     if (n == 1) {
//         return 1
//     }
//     if (n === 2) {
//         return 2
//     }
//     var a = 1, b = 2, result
//     for (var i = 3; i <= n; i++) {
//         result = a + b
//         a = b
//         b = result
//     }
//     return result

// }
// console.time(1)
// console.log('da(100): ', da(50));
// console.timeEnd(1);
// function da2(n) {
//     if (n == 1) {
//         return 1
//     }
//     if (n === 2) {
//         return 2
//     }
//     return da2(n - 1) + da2(n - 2)
// }
// console.time(12)
// console.log('da2(100): ', da2(50));
// console.timeEnd(12);

// function generate(n,m) {
//     return Math.floor(Math.random()*(m - n + 1)) + n
// }
// var a = generate(5,20)
// while (a !== 5) {
//     a = generate(5,20)
// }
// console.log(a)

// const fibonacci = function (n) {
//     if (n === 1){
//         return 0
//     }
//     if (n === 2){
//         return 1
//     }
//     var result,before1 = 1, before2 = 0
//     for (var i = 3; i <= n; i++){
//         result = before1 + before2
//         before2 = before1

//     }
//     return result
// }

// console.log('fibonacci(): ', fibonacci(5));

// /**
//  * @param cost: an array
//  * @return: minimum cost to reach the top of the floor
//  */
// const minCostClimbingStairs = function (cost) {
//     // Write your code here
//     var n = cost.length
//     var dp = []
//     dp[0] = 0
//     dp[1] = 0

//     for (var i = 2; i <= n; i++) {
//         var a = dp[i - 2] + cost[i - 2]
//         var b = dp[i - 1] + cost[i - 1]
//         dp[i] = Math.min(a, b)
//     }
//     return dp[n]
// }

// // minCostClimbingStairs([1,1,3,3])
// console.log('minCostClimbingStairs(): ', minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));

// function bubbleSort(arr) { // 实现一个从小到大的冒泡算法
//     for (var i = arr.length; i > 0; i--) {
//         for (var j = 0; j < i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//             }
//         }
//     }
//     return arr
// }
// console.log('bubbleSort([3, 4, 5, 2, 7, 8, 9, 3, 12, 23, 1]): ', bubbleSort([7, 3, 4, 5, 2,]));
// var arr = [1, 2, 3, 4, 5, 6, 6]
// var a = arr[1]
// var b = arr[2]
// [a, b] = [b, a] // 结构赋值交换数组不用使用引用对象(Bingo!)
// [arr[1], arr[2]] = [arr[2], arr[1]]
// console.log(arr)

// /**
//  * @param n: An integer
//  * @return: An integer
//  */
// const climbStairs = function (n) {
//     var dp = [0,1,2]

//     if (n === 1){
//         return 1
//     }
//     if (n === 2){
//         return 2
//     }
//     var result = dp[2]
//     for (var i= 3; i <= n;i++){
//         result = dp[i-1] + dp[i-2]
//         dp[i] = result
//     }
//     return result
// }
// console.log('climbStairs(): ', climbStairs(5));
/**
 * @param A: A string
 * @param B: A string
 * @return: if string A contains all of the characters in B return true else return false
 */
// const compareStrings = function (A, B) {
//     var a = A.split('')
//     var b = B.split('')
//     return b.every((val) => {
//         // return a.includes(val)
//         var index = a.indexOf(val)
//         if (index !== -1){
//             a.splice(index,1)
//             return true
//         }
//         return false
//     })
// }
// // compareStrings('ABCDDDD','ACD')
// console.log('compareStrings ', compareStrings('ABCDDDD','ACD'));

/**
 * @param word: a string
 * @return: return a boolean
 */
// const detectCapitalUse = function (word) {
//     // write your code here
//     console.log('word: ', word);
//     var reg = /^[A-Z]+$|^[A-Z]{1}[a-z]*$|^[a-z]+$/
//     return reg.test(word)
// }

// console.log('detectCapitalUse(): ', detectCapitalUse('FlaG'));

/**
 * @param num: an integer
 * @return: returns true when it is a perfect number and false when it is not
 */
// const checkPerfectNumber = function (num) {
//     // write your code here
//     var sum = 0
//     for (var i = 1; i < num; i++) {
//         if (num % i === 0){
//             sum += i
//         }
//     }
//     if (sum === num) {
//         return true
//     } else {
//         return false
//     }
// }
// console.log('checkPerfectNumber(28): ', checkPerfectNumber(28));
/**
 * @param list1: a list of strings
 * @param list2: a list of strings
 * @return: the common interest with the least list index sum
 */
const findRestaurant = function (list1, list2) {
    // Write your code here
    var result = []
    list1.forEach((element, index) => {
        var i2 = list2.indexOf(element)
        if (i2 !== -1) {
            console.log('i2: ', i2);
            var sum = index + i2
            if (typeof result.sum === 'undefined' || sum < result.sum) {
                // console.log('result.sum: ', result.sum);
                // console.log('typeof result.sum : ', typeof result.sum);
                // console.log('result.length - 1 < 0 ? 0 : result.length - 1: ', result.length - 1 < 0 ? 0 : result.length - 1);
                result[result.length - 1 < 0 ? 0 : result.length - 1] = {
                    val: element,
                    sum: sum
                }
                console.log('result: ', result);
            } else if (sum = result.sum) {
                result.push({
                    val: element,
                    sum: sum
                })
            }
            console.log('result: ', result);
        }
    });
    console.log('result: ', result);
    result = result.reduce(function (a, c) {
        return a.concat(c.val)
    }, [])
    console.log('result: ', result);
    return result
}
findRestaurant(["k", "KFC"], ["k", "KFC"])

