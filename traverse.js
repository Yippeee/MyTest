// 对树结构的遍历
// 两种方法：
// 1. 递归 2.层遍历法（有点DP的思想）
let count = 0

function traverse(obj) { // 获取层数
    if (obj === null) return 0
    // 判断是不是单层对象
    const getSons = (obj) => {
        return getObjChildren(obj).every((item) => {
            return Object.prototype.toString.call(item) !== '[object Object]'
        })
    }
    count++
    if (getSons(obj)) return 1
    let max = 0
    getObjChildren(obj).forEach(item => {
        max = traverse(item) > max ? traverse(item) : max
    })
    return max + 1
}

function getObjChildren(obj) {
    let result = []
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            result.push(element)
        }
    }
    return result
}
let a = {
    a: {
        b: {
            c: {},
            d: {}
        },
        c: {
            f: {
                v: {
                    b: {
                        p: {
                            df: {

                            },
                            dfs: {

                            },
                            dfsds: {
                                lll: {
                                    fd: {
                                        s: {
                                            f: {
                                                fdsf: {
                                                    dfsds: {
                                                        lll: {
                                                            fd: {
                                                                s: {
                                                                    f: {
                                                                        fdsf: {

                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }, dfsds: {
                                                lll: {
                                                    fd: {
                                                        s: {
                                                            f: {
                                                                fdsf: {

                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    d: {
                        l: {}
                    }
                }
            },
            o: {

            }
        }
    },
    f: {}
}
// traverse(a)
console.log('traverse(a): ', traverse(a));
console.log('getObjChildren(obj): ', getObjChildren(a));
console.log('count: ', count);

function layerTraverse(obj) {
    if (obj === null) return 0
    let layer = 1
    let queues = [] // 用于存放一层的所有数据
    queues = getObjChildren(obj)
    // 如何通过两个while 完成对所有节点的遍历
    // 第一个while 作为外圈， 判断下一层是否还有数据
    // 第二个while 用来判断当层的数据是否全部都执行完（将子元素 push进入 queue
    while (queues.length > 0) {
        layer++
        let length = queues.length
        while (length > 0) {
            let item = queues.shift()
            queues.push(...getObjChildren(item))
            length--
        }
    }
    return layer
}
console.log('layerTraverse(a): ', layerTraverse(a));

// 阶乘
function factorial(n) {
    if (n == 1) return 1
    return factorial(n - 1) * n
}
console.log('factorial(5): ', factorial(5));

function factorial2(n) {
    if (n === 1) return 1
    let result = 1
    for (let i = 2; i < n + 1; i++) {
        result = i * result
    }
    return result
}
console.log('factorial2(5): ', factorial2(5));

// 费布拉切
function Fibonacci(n) {
    if (n === 1 || n === 2) return 1
    return Fibonacci(n - 1) + Fibonacci(n - 2)
}
console.log('Fibonacci(6): ', Fibonacci(3));
function Fibonacci2(n) {
    if (n === 1 || n === 2) return 1
    let result = 1 // when n equal 3 , the result is 2 . but in first result is the one before result
    let a1 = 1 // result's previous val
    for (let i = 3; i <= n; i++) {
        result = result + a1
        a1 = result - a1
    }
    return result
}
console.log('Fibonacci2(6): ', Fibonacci2(3));

let HanoiTower_count = 0
console.log('HanoiTower_count: ', HanoiTower_count);
function HanoiTower(n, from, by, to) {
    if (n === 1) {
        HanoiTower_count++
    } else {
        HanoiTower(n-1,from,to,by)
        HanoiTower(1, from, by, to)
        HanoiTower(n-1, by, from, to)
    }
}
HanoiTower(5,'a','b','c')
console.log('HanoiTower_count: ', HanoiTower_count);