function Super (name) {
    this.name = name
    this.skill = ['java']
    this.fuck = 'fuck'
}
Super.prototype.sayName = function () {
    console.log(this.name, this.skill, this.fuck)
}
let aPerson = new Super('tony')
// 现在有一个需求, 我们这里还有一种类, 它包含了super中的所有方法, 但是还有自己的方法, 怎么去实现这一种继承呢
// 类方法继承

function Child () {

}

Child.prototype = new Super('fuck you') // 这是类继承的关键
let c = new Child()
console.log(c)
let c2 = new Child
c2.skill.push('php')
aPerson.sayName()
c.sayName()
c2.sayName()
// 问题的关键在于,Child.prototype 都是一套数据, 对于引用类型会出现公用的情况

//为了解决类引用出现的问题,提出了构造函数继承的方法
console.log('--------------------构造函数继承方法----------------------')
function Child2 (name) {
    Super.call(this, name)
}
let d = new Child2('adsf')
// d.sayName()  ERROR ,并没有继承父类原型链上面的方法

//
console.log('------------------组合继承-----------------------------')
function Child3 (name, age) { // age就是子类可以自己定义的方法
    Super.call(this, name) // 继承父类中的属性
    this.age = age
 } // 这样之后肯定没有完, 完了不就成了构造函数继承了嘛, 父类原型链中的方法都还没有继承到呢
 // 下面的就是继承父类中的方法
 Child3.prototype = new Super()
 Child3.prototype.constructor = Child3 // 修正被上面方法修改了constructor的child3
 Child3.prototype.sayAge = function () { // 定义子类自己的方法v
     console.log('age: ' + this.age)
 }

 let e1 = new Child3('mahuateng', 43)
 e1.skill = [1,2,3]
 e1.sayName()

 let e2 = new Child3('mayun', 50)
 e2.sayName()
 e2.sayAge()
 //上诉方法的唯一问题在于, 父类型的构造被调用了两次