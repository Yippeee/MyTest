const str = '1AB2345CD', str2 = '12345EF'

function findMaxStr(str1, str2) {
    let arr1 = str1.split('')
    let arr2 = str2.split('')
    let dpArr = Array.from({ length: arr1.length }, _ => Array.from({ length: arr2.length }))
    dpArr[-1] = Array.from({ length: arr2.length }, _ => 0)
    let maxObj = {
        i: 0,
        j: 0,
        num: 0
    }
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                dpArr[i][j] = dpArr[i - 1][j - 1] + 1
                if (dpArr[i][j] > maxObj.num) {
                    maxObj = {
                        num: dpArr[i][j],
                        i, j
                    }
                }
            } else {
                dpArr[i][j] = 0
            }
        }
    }
    let result = str1.slice(arr1.length - maxObj.i, arr1.length - maxObj.i + maxObj.num)
    console.log('result: ', result);
    console.log('maxObj: ', maxObj);
}

findMaxStr(str, str2)

