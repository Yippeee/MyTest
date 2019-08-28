

const weightArr = [1, 11, 21, 23, 33, 43, 45, 55]
const priceArr = [11, 21, 31, 33, 43, 43, 55, 65]

function bugQuestion(arr = weightArr, max = 110) {
    let dpArr = Array.from({ length: arr.length }, _ => Array.from({ length: max }))
    dpArr[-1] = Array.from({ length: max + 1 }, _ => 0) // 增加负一行简化判断流程
    for (let i = 0; i < dpArr.length; i++) {
        for (let j = 0; j <= max; j++) {
            if (weightArr[i] > j) { // 已经放不下了
                dpArr[i][j] = dpArr[i - 1][j]
            } else {
                dpArr[i][j] = Math.max(dpArr[i - 1][j], dpArr[i - 1][j - weightArr[i]] + priceArr[i])
            }
        }
    }
    // 下面的代码用来判断选择了什么
    let selectArr = [], tempM = max, selectWeight = 0
    for (let i = dpArr.length - 1; i >= 0; i--) {
        if (dpArr[i][tempM] !== dpArr[i - 1][tempM]) {
            selectArr.push(i)
            tempM -= weightArr[i]
            selectWeight += weightArr[i]
        }
    }
    console.log('selectWeight: ', selectWeight);
    console.log('selectArr: ', selectArr.reverse());
    console.log('dpArr[arr.length - 1][max]: ', dpArr[arr.length - 1][max]);
    return dpArr[arr.length - 1][max]
}

a = bugQuestion()
console.log('a: ', a);

// 考虑一个有n=8个物品的背包问题实例，背包的容量m=110，P(价值)=(11,21,31,33,43,43,55,65)，并且w(重量)=(1,11,21,23,33,43,45,55)，请问不超过m的情况下，最大的放入价值是多少（）
