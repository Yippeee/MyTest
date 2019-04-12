const median = function (nums) {
    const arr = nums.sort()
    return arr[ ~~ ((nums.length - 1) / 2)]
}
var a = median([4, 5, 1, 2, 3, 6])
console.log('a: ', a);