
// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!
//  
// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
//  
// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
//  
// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
//  
// 以此类推。


// 先使用promise来做一次

class LazyMan_ {
    constructor(name) {
        this.name = name
        this.time = null
        this.timeFirst = null
        setTimeout(() => {
            Promise.resolve(this.timeFirst).then(() => {
                console.log('Hi! This is ', name)
            })
        }, 0)
    }
    sleep(time) {
        this.time = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time)
        })
        return this
    }
    eat(val) {
        setTimeout(() => {
            Promise.resolve(this.timeFirst)
                .then(() => {
                    return Promise.resolve(this.time)
                })
                .then(() => {
                    console.log('Eat ', val)
                })
        }, 0)
        return this
    }
    sleepFirst(time) {
        this.timeFirst = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('wake up after ', time)
                resolve()
            }, time)
        })
        return this
    }
}
function LazyMan(name) {
    return new LazyMan_(name)
}
LazyMan('Hank')
LazyMan('Hank').sleep(5000).eat('dinner')
LazyMan('Hank').eat('supper').eat('dinner')
LazyMan('Hank').sleepFirst(5000).eat('supper')

