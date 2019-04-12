
function binarySearch(item, arr, start = 0, end = arr.length) {
    if (start > end) return -1
    let flag = ~~((start + end) / 2)
    if (item < arr[flag]) {
        return binarySearch(item, arr, start, flag - 1)
    } else if (item > arr[flag]) {
        return binarySearch(item, arr, flag + 1, end)
    } else {
        console.log('flag: ', flag);
        return flag
    }
}

binarySearch(6, [4, 3, 5, 6, 7, 8, 9, 3, 2, 4, 2])

function binarySearch2(item, arr) {
    let start = 0, end = arr.length - 1, flag
    while (start <= end) {
        flag = ~~((start + end) / 2)
        if (item > arr[flag]) {
            start = flag + 1
        } else if (item < arr[flag]) {
            end = flag - 1
        } else {
            console.log('binarySearch2: ', flag);
            return flag
        }
    }
    return -1
}

binarySearch2(6, [4, 3, 5, 6, 7, 8, 9, 3, 2, 4, 2])


// from small to big
function bubble(arr) {
    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] 
            }
        }
    }
    console.log('arr: ', arr);
    return arr
}

bubble([2,3,4,5,1,2,4,32,23,543,23])

