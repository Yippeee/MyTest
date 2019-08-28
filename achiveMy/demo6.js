const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]]
function binaryInsertSort(arr) {
    let length = arr.length

    for (let i = 1, item; i < length; i++) {
        // 修改成二分查找位置
        let left = 0, right = i - 1, flag
        item = arr[i]
        while (left <= right) {
            flag = ~~((left + right) / 2)
            if (item < arr[flag]) {
                right = flag - 1
            } else if (item >= arr[flag]) {
                left = flag + 1
            }
        }
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j]
        }
        arr[left] = item
    }
    console.log('arr: ', arr);
    return arr
}

var arr = [1, 23, 14, 8,0,1, 10, 9, 10000,235, 21, 45, 56,12,1000,100, 4, 32, 79, 15, 56, 985, 343];
binaryInsertSort(arr)