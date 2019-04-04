class Dep {
    constructor() {
        this.subs = [] // 初始化订阅者list
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify(newVal) {
        for (const sub of this.subs) {
            sub.update(newVal)
        }
    }
}

class Watch {
    constructor() {
        Dep.target = this
    }
    update(val) {
        // 
        console.log('changed~' + val)
    }
}

// 数据劫持
function defineObserver(data) {
    for (const key in data) {
        let dep = new Dep()
        if (data.hasOwnProperty(key)) {
            let value = data[key]
            Object.defineProperty(data, key, {
                get() {
                    dep.addSub(Dep.target)
                    return value
                },
                set(newVal) {
                    if (newVal === value) return
                    dep.notify(newVal)
                    value = newVal
                }
            })
        }
    }
}

class Vue {
    constructor(opn) {
        this.data = opn.data
        defineObserver(this.data)
        new Watch()
        console.log("模拟渲染的过程~", this.data.test)
    }
}

let o = new Vue({
    data: {
        test: 'dsf'
    }
})

o.data.test = 'cha'
o.data.test = 'cha1'
o.data.test = 'cha2'
o.data.test = 'cha3'
