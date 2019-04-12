var data = {
    name: "Krasimir",
    age: 29,
    info: {
        gender: 'man'
    },
    show: 'true',
    show1: 'aaaaaaa',
    show2: 'bbbbbbbbbbb',
}

let r = [];
r.push("<p>Hello, my name is ");
r.push(data.name); r.push(". I'm ");
r.push(data.age);
r.push(" years old. And I'm ");
r.push(data.info.gender);
r.push("</p>< p > ");
console.log('r: ', r.join(""));
// r.push(if(data.show){);
//     r.push("        data.show1        ");
//     r.push(}else{);r.push("        data.show2        ");
//     r.push(});
//     r.push(" >        </p > ");
//     return r.join("")

if(this.show)
