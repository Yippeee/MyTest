
class LazyMan_ {
    constructor(name) {
        this.queues = []
        this.queues.push(function () {
            console.log('Hi this is', name)
        })
        setTimeout(() => {
            this.next()
        }, 0)
    }
    next() {
        let fn = this.queues.shift()
        fn && fn()
    }
    sleep(time) {
        this.queues.push(function () {
            setTimeout(() => {
                this.next()
            }, time)
        })
        return this
    }
    eat(sth) {
        this.queues.push(function () {
            console.log('Eat ', sth)
        })
        return this
    }
}

function LazyMan(name) {
    return new LazyMan_(name)
}


// LazyMan('Hank')
LazyMan('Hank').sleep(5000).eat('dinner')
// LazyMan('Hank').eat('supper').eat('dinner')
// LazyMan('Hank').sleepFirst(5000).eat('supper')