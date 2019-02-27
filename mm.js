const dropEggs = function (n) {
    let k = 0
    while (Math.pow(k,2) <= 2*n) {
        k++
    }
    k = k - 1
    return k
}
console.log('dropEggs(10): ', dropEggs(100));