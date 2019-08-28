class Dep { // 订阅者
    constructor() {
        this.subs = [] // 初始化 订阅者 列表
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    update() {
        this.subs.forEach(sub => sub.update)
    }
}

class watch { // 观察者
    constructor() {
        Dep.target = this
    }
    update() {
        console.log('ho, i am changed')
    }
}

class vue {
    constructor(option) {
        // this.el = document.querySelector(option.el)
        // this.compile(this.el)
        this.observer(option.data) // 观察对象数据
    }
    compile() {

    }
    observer(data) {
        for (const key in data) {
            let dep = new Dep()
            Object.defineProperty(data, key, {
                get() {
                    dep.addSub()
                },
                set(newVal) {

                }
            })
        }
    }
}

new vue({
    el: '#app',
    data: {
        name: 'a',
        age: 12
    }
})