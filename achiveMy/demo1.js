function f(n) {
    if (n === 1) return 1
    if (n === 2) return 1
    return f(n - 1) + f(n - 2)
}

function f1(n) {
    if (n === 1) return 1
    if (n === 2) return 1
    let result, b1 = 1, b2 = 1;
    for (let i = 3; i <= n; i++) {
        result = b1 + b2
        b2 = b1
        b1 = result
    }
    return result
}

a = f(10)
console.log('a: ', a);
a = f1(10)
console.log('a: ', a);
function f2(n, val1 = 1, val2 = 1) {
    if (n === 3) return val1 + val2
    return f2(n - 1, val1 + val2, val1)
}
a = f2(10)
console.log('a: ', a);



function maxSonChildArr(arr) {
    let maxArr = arr[0]
    for (let i = 0; i < arr.length; i++) {

    }
}

function quickSort(arr) {
    if (arr.length === 0) return arr
    let base = arr[0], leftArr = [], rightArr = []
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > base) {
            rightArr.push(arr[i])
        } else {
            leftArr.push(arr[i])
        }
    }
    return [...quickSort(leftArr), base, ...quickSort(rightArr)]
}

a = quickSort([1, 2, 3, 1, 2, 3, 5, 6, 23, 2, 3, 432, 4, 1234, 3242, 1, 2])
console.log('a: ', a);


// 选择排序 和 插入排序的区别:
// 内层循环是对排序好的部分进行遍历, 还是对没有排序好的部分进行遍历
// 选择排序是对没有排序好的部分进行遍历, 而插入排序是对排序好的部分进行遍历

function insertSort(arr) {
    for (let i = 0; i <= arr.length; i++) {
        for (let j = i - 1; j >= 0 && arr[j] < arr[j - 1]; j--) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
        }
    }
    return arr
}

c = insertSort([1, 2, 3, 1, 2, 3, 5, 6, 23, 2, 3, 432, 4, 1234, 3242, 1, 2])
console.log('c: ', c);

function selectSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j
        }
        if (i !== minIndex) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}

b = selectSort([1, 2, 3, 1, 2, 3, 5, 6, 23, 2, 3, 432, 4, 1234, 3242, 1, 2])
console.log('b: ', b);

console.log(a.toString() === b.toString())
console.log(c.toString() === b.toString())

// 快速  冒泡 选择  插入 (都可以利用二分法查找来优化)

function bubble(arr) {
    for (let i = 0, length = arr.length; i < length; i++) {
        for (let j = i + 1; j < length - i; j++) {
            if (arr[j] > arr[j - 1]) [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
        }
    }
    return arr
}

d = selectSort([1, 2, 3, 1, 2, 3, 5, 6, 23, 2, 3, 432, 4, 1234, 3242, 1, 2])
console.log('d: ', d);
console.log(d.toString() === b.toString())
