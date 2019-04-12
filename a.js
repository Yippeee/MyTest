// function addScript(url){
//     var script = document.createElement('script')
//     script.src = src
//     document.appendChild(script)
// }

// addScript('https://xxx.com?callback=fn')

// function fn(data){
//     console.log(data)
// }

// ["A","B","C","B","A"].reduce((o, k, index) => {
//     console.log(o, k, index)
//     k in o ? o[k].push(index) : (o[k] = [index]);
//     // k in o 的判断需要修改成为 
//     return o;
// },{});

// function press(str) {
//     let total = str.length
//     for (let i = 1; i < total; i++) {
//         if (str[i] == str[i -1]){
//             // console.log(str[i])
//         }
//     }
//     console.log(str)
// }
// press('aaajjjhhhaaa')
// let a = 'ffffffffffff'

// 递归
function binarySearch(item, array, start = 0, end = array.length - 1) {
    if (start > end) return -1
    let flag = ~~((start + end) / 2)
    if (array[flag] < item) {
        return binarySearch(item, array, flag + 1, end)
    } else if (array[flag] > item) {
        return binarySearch(item, array, start, flag - 1)
    } else {
        return flag
    }
}

console.log('binarySearch(6, [1, 2, 3, 4, 5, 6, 7, 8, 29, 100]): ', binarySearch(4, [1, 2, 3, 4, 5, 6, 7, 8, 29, 100]));

function binarySearch2(item, array) {
    let start = 0, end = array.length - 1, flag = ~~((start + end) / 2)
    while (start <= end) {
        flag = ~~((start + end) / 2)
        if (array[flag] > item) {
            end = flag - 1
        } else if (array[flag] < item) {
            start = flag + 1
        } else {
            return flag
        }
    }
    return -1
}
console.log('binarySearch2(6, [1, 2, 3, 4, 5, 6, 7, 8, 29, 100]): ', binarySearch2(12080, [1, 2, 3, 4, 5, 6, 7, 8, 29, 100]));


function bubble(arr) {
    let length = arr.length
    for (let i = length; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    console.log('arr: ', arr);
    return arr
}
bubble([1, 2, 56, 3, 5, 6, 23, 45, 6, 3, 20])

function quickSort(arr) {
    let length = arr.length
    if (length === 0) { return arr; }
    let pivotNum = ~~(length / 2)
    let pivot = arr.splice(pivotNum, 1)[0]
    let left = [], right = []
    for (let i = 0; i < length - 1; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

console.log('quickSort([1, 2, 56, 3, 5, 6, 23, 45, 6, 3, 20]): ', quickSort([1, 2, 56, 3, 5, 6, 23, 45, 6, 3, 20]));

function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let temp = i
        for (let j = temp; j >= 0; j--) {
            if (arr[temp] < arr[j]) {
                ;[arr[temp], arr[j]] = [arr[j], arr[temp]]
                temp = j
            }
        }
    }
    console.log('insertSort_arr: ', arr);
    return arr
}

insertSort([3, 2, 4, 56, 6, 7, 23, 12, 4, 67, 1])

function selectSort(arr) {
    let minIndex, min
    for (let i = 0; i < arr.length; i++) {
        minIndex = i
        min = arr[i]
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j]
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    console.log('selectSort_arr: ', arr);
    return arr
}
selectSort([2, 3, 4, 651, 324, 65, 5, 32, 2, 4, 3])

