const maxSubArray = function (arr) {
    var dp = [arr[0]] // 此时的dp数组相当于,0 到 I的最大和
    // 那么,if dp[i - 1] + ar[i]
    var maxArr = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (dp[i - 1] < 0) {
            // 从头开始算
            dp[i] = arr[i]
        } else {
            dp[i] = dp[i - 1] + arr[i]
        }

        if (dp[i] > maxArr) {
            maxArr = dp[i]
        }
    }
    return maxArr
}
maxSubArray([13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7])
maxSubArray([-3, -16, -23, -7, -5, -22, -1, -4])