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

function countLevel(obj) {
    if (obj === null) return 0
    let arr = getArrByObj(obj)
    let flag = arr.every(item => Object.prototype.toString.call(item) !== "[object Object]")
    if (flag) {
        return 1
    }
    let max = 0
    arr.forEach((item) => {
        max = Math.max(countLevel(item), max)
    })
    return max + 1
}

function getArrByObj(obj) {
    let result = []
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            result.push(element)
        }
    }
    return result
}

// countLevel(a)
console.log('countLevel(a): ', countLevel(a));
// 递归到底是什么? 
//  递归是一种遍历树层级结构的操作,
//  递归一定需要的就是上一个层级与这个层级之间的关系,同时也一定得知道递归退出的条件

// 用循环代替递归的操作

function cycle(obj){
    // 可以用循环代替递归的方法一定是用while,再配上队列
    //  是吗..用上一定的说法,好像有点绝对
    let queues = []
    

}