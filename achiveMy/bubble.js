// 一般的冒泡算法

const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]]

function bubble(arr) {
    let length = arr.length - 1
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
        }
    }
    console.log('arr: ', arr);
    return arr
}

// 开始优化

// method 1: 设置标志变量 changed
// 原理:  如果在一轮排序中都没有变化, 说明数组已经有序, 就可以直接退出了

function bubble_1(arr) {
    let length = arr.length - 1,
        sorted = false
    for (let i = 0; i < length && !sorted; i++) {
        sorted = true
        for (let j = 0; j < length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
                sorted = false
            }
        }
    }
    console.log('arr: ', arr);
    return arr
}

// method 1_1 标志出哪里发生了变化
function bubble_2(arr) {
    let length = arr.length - 1,
        sorted = false,
        lastPos = length
    for (let i = 0; i < lastPos && !sorted; i++) {
        sorted = true
        for (let j = 0; j < length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
                sorted = false
                // 记录下最后一个发生交换的位置
                lastPos = j
            }
        }
    }
    console.log('arr: ', arr);
    return arr
}

// method 2: 双向排序 (鸡尾酒排序)
// 原理: 先从左到右, 再从右到左, 依次轮转, 确定最大,最小,第二大,第二小,直至完成排序
// 优势: 能在大部分数组项已经排序好的情况下, 效率更好

function cocktailSort(arr) {
    let length = arr.length,
        left = 0,
        right = length - 1,
        sorted = false
    while (!sorted && left <= right) {
        sorted = true
        for (let i = left; i <= right; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1)
                sorted = false
            }
        }
        right--
        for (let j = right; j > left; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j - 1, j)
                sorted = false
            }
        }
        left++
    }
    console.log('arr: ', arr);
    return arr
}
var arr = [2, 1, 3, 4, 5, 6, 2, 3, 4, 99, 100, 101];

console.time(1)
bubble(arr)
console.timeEnd(1)

console.time(1)
bubble_1(arr)
console.timeEnd(1)

console.time('bubble_2')
bubble_2(arr)
console.timeEnd('bubble_2')

console.time('cocktailSort')
cocktailSort(arr)
console.timeEnd('cocktailSort')
