class Stack {
    constructor(arr, option = 'max') {
        this.arr = arr.slice(0)
        this.option = option
        let length = arr.length
        let firstBrachIndex = Math.floor((length - 1) / 2)
        if (option === 'max') {
            for (let i = firstBrachIndex; i >= 0; i--) {
                this.maxHeapify(i, length)
            }
        } else {
            for (let i = firstBrachIndex; i >= 0; i--) {
                this.minHeapify(i, length)
            }
        }
    }
    minHeapify(index, end) { // 小顶对构建
        let leftChildIndex = 2 * index + 1,
            rightChildIndex = leftChildIndex + 1,
            minChildIndex = leftChildIndex;
        if (leftChildIndex > end) return
        if (this.arr[rightChildIndex] < this.arr[leftChildIndex] && rightChildIndex <= end) {
            minChildIndex = rightChildIndex
        }
        if (this.arr[minChildIndex] < this.arr[index]) {
            [this.arr[minChildIndex], this.arr[index]] = [this.arr[index], this.arr[minChildIndex]]
            this.minHeapify(minChildIndex, end)
        }
    }
    maxHeapify(index, end) { // 大顶对构建
        let leftChildIndex = 2 * index + 1,
            rightChildIndex = leftChildIndex + 1,
            maxChildIndex = leftChildIndex;
        if (leftChildIndex > end) return
        if (this.arr[rightChildIndex] > this.arr[leftChildIndex] && rightChildIndex <= end) {
            maxChildIndex = rightChildIndex
        }
        if (this.arr[maxChildIndex] > this.arr[index]) {
            [this.arr[maxChildIndex], this.arr[index]] = [this.arr[index], this.arr[maxChildIndex]]
            this.maxHeapify(maxChildIndex, end)
        }
    }
    insert(item) {
        this.arr.push(item)
        let length = this.arr.length - 1
        let pIndex = Math.floor((length - 1) / 2)
        if (this.option === 'max') {
            while (pIndex >= 0) {
                if (this.arr[pIndex] < item) {
                    pIndex = Math.floor((pIndex - 1) / 2)
                } else {
                    break
                }
            }
        } else {
            while (pIndex >= 0) {
                if (this.arr[pIndex] < item) {
                    pIndex = Math.floor((pIndex - 1) / 2)
                } else {
                    break
                }
            }
        }
        if (pIndex < 0) { pIndex = 0 }
        [this.arr[pIndex], this.arr[length]] = [this.arr[length], this.arr[pIndex]]
    }
    delete() {
        let length = this.arr.length - 1
        let result = this.arr[0]
        this.arr[0] = this.arr[length]
        this.arr.pop()
        if (this.option === 'max') {
            this.maxHeapify(0, length - 1)
        }
        return result
    }
    sort() {
        let arr = this.arr,
            length = arr.length - 1
        if (this.option === 'max') {
            for (let i = 0; i < length; i++) {
                [arr[0], arr[length - i]] = [arr[length - i], arr[0]]
                this.maxHeapify(0, length - i - 1)
            }
        } else {
            for (let i = 0; i < length; i++) {
                [arr[0], arr[length - i]] = [arr[length - i], arr[0]]
                this.minHeapify(0, length - i - 1)
            }
        }
    }
    toString() {
        console.log(this.arr)
    }
    valueOf() {
        console.log(this.arr)
    }

}
var arr = [1, 23, 14, 8, 10, 9, 235, 21, 45, 56, 4, 32, 79, 15, 56, 985, 343];
let s = new Stack(arr)
s.insert(1000)
    + s;
let ss = new Stack(arr, 'min')

const tryCatch = thunk => {
    try {
        return [null, thunk()]
    } catch (err) {
        return [err]
    }
}

function sleep(time) {
    return new Promise(r => {
        setTimeout(r, time)
    })
}