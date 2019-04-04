
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify(newVal) {
        for (const iterator of this.subs) {
            iterator.update(newVal)
        }
    }
}

class Watch {
    constructor() {
        Dep.target = this
    }
    update(newVal) {
        console.log("哦？到我了啊。", newVal)
    }
}

function proxyDate(data) {
    for (const key in data) {
        console.log('key: ', key);
        let dep = new Dep()
        if (data.hasOwnProperty(key)) {
            let val = data[key]
            Object.defineProperty(data, key, {
                get() {
                    // register 
                    dep.addSub(Dep.target)
                    return val
                },
                set(newVal) {
                    if (val === newVal) return
                    // notify changed
                    val = newVal
                    dep.notify(newVal)
                }
            })
        }
    }
}

class Vue {
    constructor(option) {
        this.data = option.data
        proxyDate(this.data)
        new Watch()
        // simulate render
        console.log('simulate render~' + this.data.test)
    }
}

let o = new Vue({
    data: {
        test: 'kkk'
    }
})

o.data.test = 'ooo'
o.data.test = 'ooo'
o.data.test = 'ooo'
o.data.test = '12ooo'


// console.log('o: ', o);