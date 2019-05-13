function Father() { }

function Son() {
    Father.call(this) //继承属性
}

Son.prototype = Object.create(Father.prototype)// 继承方法
Son.prototype.constructor = Son


var Obj = function (msg) {
    this.msg = msg;
    this.shout = function () {
        alert(this.msg)
    }
    this.waitAndShout = function () {
        // 隔五秒钟后执行上面的 shout 方法
        setTimeout(() => {
            this.shout()
        }, 5000)
    }
}

;(function symmetry() {
    let result = []
    for (let i = 1; i <= 10000; i++) {
        if (i === +(i + '').split('').reverse().join('')){
            result.push(i)
        }
    }
    console.log('result: ', result);
    return result
})()
