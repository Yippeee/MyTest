const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]]

// small -> big

function bubbleSort(arr) {
    let length = arr.length
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i; j++) {
            if (arr[j + 1] < arr[j]) {
                swap(arr, j, j + 1)
            }
        }
    }
    return arr
}

function insertSort(arr) {
    let length = arr.length
    for (let i = 1; i < length; i++) {
        let temp = i
        for (let j = temp - 1; j >= 0; j--) {
            if (arr[temp] < arr[j]) {
                swap(arr, temp, j)
                temp = j
            }
        }
    }
    return arr
}

function selectSort(arr) {
    let length = arr.length
    for (let i = 0; i < length; i++) {
        let smallest = i, j
        for (j = i + 1; j < length; j++) {
            if (arr[j] < arr[smallest]) {
                smallest = j
            }
        }
        swap(arr, i, smallest)
    }
    return arr
}

function quickSort(arr) {
    if (arr.length <= 1) return arr
    let length = arr.length,
        right = [],
        left = [];
    let pivot = (length / 2) >>> 0,
        pivotVal = arr.splice(pivot, 1)[0]
    for (let i = 0; i < length - 1; i++) {
        if (arr[i] <= pivotVal) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return [...quickSort(left), pivotVal, ...quickSort(right)]
}

function mergeSort(arr) {
    let length = arr.length,
        mid = (length / 2) >>> 0
    if (length <= 1) return arr
    let left = arr.slice(0, mid),
        right = arr.slice(mid)
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

function heapSort(arr) {
    let length = arr.length - 1
    // 1. minHeapify arr
    minHeapify(arr, 0, length)
    // 2. sort
    let firstParentIndex = Math.floor(length / 2 - 1)
    for (let i = firstParentIndex; i >= 0; i--) {
        minHeapify(arr, i, length)
    }
    return arr
}

function minHeapify(arr, index, end) {
    let left = index * 2 + 1,
        right = left + 1,
        minChild = left
    if (left > end) return
    if (arr[right] < arr[left] && right <= end) {
        minChild = right
        swap(arr, index, minChild)
        minHeapify(arr, minChild, end)
    }
}

function shellSort(arr) {
    let length = arr.length,
        gap = (length / 2) >>> 0
    while (gap) {
        for (let i = 0; i < length; i++) {
            let temp = i
            for (let j = temp - gap; j >= 0; j -= gap) {
                if (arr[j] > arr[temp]) {
                    swap(arr, j, temp)
                    temp = j
                }
            }
        }
        gap = (gap / 2) >>> 0
    }
    return arr
}

var arr = [1, 23, 14, 8, 10, 9, 235, 21, 45, 56, 4, 32, 79, 15, 56, 985, 343];
// a = bubbleSort(arr)
// console.log('bubbleSort: ', a);
// a = insertSort(arr)
// console.log('insertSort: ', a);
// a = selectSort(arr)
// console.log('selectSort: ', a);
// a = quickSort(arr)
// console.log('quickSort: ', a);
// a = heapSort(arr)
// console.log('heapSort: ', a);
// a = mergeSort(arr)
// console.log('mergeSort: ', a);
// a = shellSort(arr)
// console.log('shellSort: ', a);

// search algorithm
