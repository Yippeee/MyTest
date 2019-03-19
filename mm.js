function getHowManyLevel(obj) {
    let res = JSON.stringify(obj).replace(/[^{|^}]/g, '')
    while (/}{/g.test(res)) {
        res = res.replace(/}{/g, '')
    }
    return res.replace(/}/g, '').length
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
console.time(1)
console.log('getHowManyLevel(a): ', getHowManyLevel(a));
console.timeEnd(1)

function getObjDepth(obj) {
    if (obj === null) return 0
    let arr = getArrFromObj(obj)
    let judge = arr.every(item => {
        return Object.prototype.toString.call(item) !== "[object Object]"
    })
    if (judge) {
        return 1
    }
    let max = 0
    arr.forEach(element => {
        max = getObjDepth(element) > max ? getObjDepth(element) : max
    });
    return max + 1
}

function getArrFromObj(obj) {
    let result = []
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            result.push(element)
        }
    }
    return result
}
console.time(2)
console.log('getObjDepth(a): ', getObjDepth(a));
console.timeEnd(2)

function getLevelByCycle(obj) {
    // 不用遍历，用循环来解决需要用遍历的问题
    // 使用队列来做
    if (obj === null) {
        return 0
    }
    let queues = []
    let depth = 0
    queues.push(obj)
    while (queues.length > 0) {
        // console.log('queues: ', queues);
        let length = queues.length
        if (length === 0) {
            break
        }
        depth++
        while (length > 0) {
            let node = queues.shift()
            queues = queues.concat(getArrFromObj(node))
            length--
        }
    }
    return depth
}
console.time(3)
console.log('getLevelByCycle(a): ', getLevelByCycle(a));
console.timeEnd(3)
