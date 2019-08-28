// 归并排序

function mergeSort(arr) {
    let length = arr.length
    if (length < 2) return arr
    let baseIndex = (length / 2) >>> 0
    let left = arr.slice(0, baseIndex)
    let right = arr.slice(baseIndex)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let result = []
    while (left.length || right.length) {
        if ((left[0] || Infinity) < (right[0] || Infinity)) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    return result
}

// function quickSort(arr) { // 从大到小排序
//     let length = arr.length
//     if (length <= 1) {
//         return arr
//     }
//     let baseIndex = (length / 2) >>> 0,
//         rightArr = [],
//         leftArr = [],
//         base = arr[baseIndex]
//     arr.splice(baseIndex, 1) //删除掉基准
//     for (let i = 0; i < length - 1; i++) {
//         let item = arr[i]
//         if (item >= base) {
//             rightArr.push(item)
//         } else {
//             leftArr.push(item)
//         }
//     }
//     return [...quickSort(leftArr), base, ...quickSort(rightArr)]
// }
var arr = [1, 23, 14, 8, 10, 9, 235, 21, 45, 56, 4, 32, 79, 15, 56, 985, 343];
// a = quickSort(arr)
// console.log('a: ', a);
// a = mergeSort(arr)
// console.log('a: ', a);

// function mergeSort2(arr) {
//     for (let step = 1; step < arr.length; step *= 2) {
//         for (let start = 0; )
//     }
// }

// 希尔排序 也是属于插入排序的 small -> big
function shellSort(arr) {
    let length = arr.length
    let gap = (length / 2) >>> 0
    while (gap > 0) {
        for (let i = 0; i < length; i += gap) {
            let temp = i
            for (let j = temp - gap; j >= 0; j -= gap) {
                if (arr[temp] < arr[j]) {
                    [arr[temp], arr[j]] = [arr[j], arr[temp]]
                    temp = j
                }
            }
        }
        gap = (gap / 2) >>> 0
    }
    console.log('arr: ', arr);
    return arr
}
shellSort(arr)
