/**
 * @param k: An integer
 * @param n: An integer
 * @return: An integer denote the count of digit k in 1..n
 */
const digitCounts = function (k, n) {
    // write your code here
    return Array.from(new Array(n + 1), (item, index) => index + '').join('').split(k).length - 1
}

// digitCounts(1,12)
console.log('digitCounts(1,12): ', digitCounts(1, 12));