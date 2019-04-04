class Dep{
    constructor (){
        this.sub = []
    }
    addSub(sub) {
        this.sub.push(sub)
    }
    notify() {
        this.sub.forEach(i => {

        })
    }
}
