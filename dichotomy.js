function dichotomy(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let key
    while (left < right) {
        key = Math.floor((left + right) / 2)
        if (target == arr[key]) {
            return key
        } else if (target < arr[key]) {
            right = key
        } else {
            left = key
        }
    }
    return -1
}
a = dichotomy([1,8,15,22,29,35,37,39,44,50,57,60,61,62,69,70,71,78,80],60)
console.log(a)