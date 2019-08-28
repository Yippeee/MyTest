function bubble(arr) {
    console.time(1)
    let changed = false
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
                changed = true
            }
        }
        if (!changed) break
    }
    console.timeEnd(1)
    return arr
}
a = bubble([4, 11, 9, 12, 13, 7, 5, 6, 8, 20])
console.log('a: ', a);
// 冒泡排序是可以优化的, 优化的主要是在于几个点:
// 1. 一轮循环都没有变化数据的话,可以说明数组可以排序完成了,可以直接退出循环
// 2. 数据内部的部分数据如果已经是有序的了, 跳过
// 3. 双向冒泡, 最大 最小同时归位