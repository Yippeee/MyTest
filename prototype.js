function B () {
    this.b = 'b'
    this.a = 'b'
}
function A () {
    this.a = 'a'
}
A.prototype = new B()
let a = new A()
console.log(a.a, a.b)
