// 树结构的遍历的两种方法： 层遍历法  递归
function layerTraversing(obj) {
    // 重新理了一遍思路
    // 不是之前我想的那样，什么队列，while之类的
    // 更多的思想是对层的遍历
    // 一层一层的去找，用于一个队列维护。
    // 然后把队列全部推出去，用子值重新生成一个队列
    // 退出条件当然是队列中已经没有值了
    if (obj === null) return 0
    let queues = []
    queues.push(obj)
    let max = 0
    while (queues.length !== 0) {
        let length = queues.length
        max++
        while (length > 0) {
            let node = queues.shift()
            queues.push(...getArrFromObj(node))
            length--
        }
    }

    return max
}

function getArrFromObj(node) {
    let result = []
    for (const key in node) {
        if (node.hasOwnProperty(key)) {
            const element = node[key];
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

layerTraversing(a)
console.log('layerTraversing(a): ', layerTraversing(a));

function traverse(obj) {
    if (obj === null) return 0
    let max = 0
    let arr = getArrFromObj(obj)
    arr.forEach((item) => {
        max = Math.max(max, traverse(item))
    })
    return max + 1
}

console.log('traverse(a): ', traverse(a));

function factorial(n) {
    if (n === 1) return 1
    return n * factorial(n - 1)
}

console.log('factorial(5): ', factorial(5));


function factorial2(n) {
    if (n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
        result = i * result
    }
    return result
}
console.log('factorial2(5): ', factorial2(5));


function Fibonacci(n) {
    if (n === 1 | n === 2) return 1
    // return Fibonacci(n-1)+Fibonacci(n-2)
    let result
    let a1 = 1, a2 = 1
    for (let i = 3; i <= n; i++) {
        let tem = a2
        result = a1 + a2
        a2 = result
        a1 = tem
    }
    return result
}
// Fibonacci(12)
console.log('Fibonacci(12): ', Fibonacci(12));

function Fibonacci2(n) {
    if (n === 1 | n === 2) return 1
    return Fibonacci(n - 1) + Fibonacci(n - 2)
}
console.log('Fibonacci2(12): ', Fibonacci2(12));


// 汉诺塔问题

function HanoiTower(n, from, by, to) {
    if (n === 1) {
        move(1, from, to)
    } else {
        HanoiTower(n - 1, from, by, to)
        move(n, from, to)
        HanoiTower(n - 1, to, by, from)
    }
}
function move(n, from, to, index) {
    console.log(`移动第${n}个从${from} ----> ${to}`)
}
// HanoiTower(5)
console.log('HanoiTower(5): ', HanoiTower(3, 'A', 'B', 'C'));
