// function stackSort(arr) {
//     var length = arr.length - 1;
//     var lastNodeIndex = (length - 1) >> 1;
//     for (var i = lastNodeIndex; i >= 0; i--) {
//         maxHeap(arr, i, length);
//     }
//     console.log('arr: ', arr);
//     for (let index = 0; index < length; index++) {
//         [arr[0], arr[length - index]] = [arr[length - index], arr[0]]
//         maxHeap(arr, 0, length - index - 1)
//     }
//     return arr
// }

// function maxHeap(arr, index, end) { // 这个是从上到下的
//     let childLeft = index * 2 + 1,
//         childRight = childLeft + 1,
//         childrenMax = childLeft;
//     if (childLeft > end) return
//     if (childRight <= end && arr[childRight] > arr[childLeft]) { // 选取子节点中最大的
//         childrenMax = childRight
//     }
//     if (arr[childrenMax] > arr[index]) {
//         [arr[childrenMax], arr[index]] = [arr[index], arr[childrenMax]]
//         maxHeap(arr, childrenMax, end)
//     }
// }

// var arr = [1, 23, 14, 8, 10, 9, 235, 21, 45, 56, 4, 32, 79, 15, 56, 985, 343];
// r = stackSort(arr)
// console.log('r: ', r);

function stackSort(arr) {
    let { length } = arr
    length-- // 为了数组的下标考虑
    // 1. 构建一个小顶堆
    let startIndex = Math.floor((length - 1) / 2)// 从最后一个元素的父节点开始
    for (let i = startIndex; i >= 0; i--) {
        minHeapify(arr, i, length)
    }
    // 2. 排序
    for (let i = 0; i < length; i++) {
        [arr[0], arr[length - i]] = [arr[length - i], arr[0]]
        minHeapify(arr, 0, length - i - 1)
    }
    return arr
}

function minHeapify(arr, index, end) {
    let leftIndex = index * 2 + 1,
        rightIndex = leftIndex + 1,
        minIndex = leftIndex;
    if (leftIndex > end) return
    if (arr[rightIndex] < arr[leftIndex] && rightIndex <= end) {
        minIndex = rightIndex
    }
    if (arr[minIndex] < arr[index]) {
        [arr[minIndex], arr[index]] = [arr[index], arr[minIndex]]
        minHeapify(arr, minIndex, end)
    }
}

var arr = [1, 23, 14, 8, 10, 9, 235, 21, 45, 56, 4, 32, 79, 15, 56, 985, 343];
r = stackSort(arr)
console.log('r: ', r);