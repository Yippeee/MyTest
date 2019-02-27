
const reverse = function (head) {
    // write your code here
    return head && head.split('->').reverse().join('->')
}

a = reverse('0->null')
console.log(a);