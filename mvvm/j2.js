// var html = '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>';


// let reg = /^<((?:[a-zA-Z_][\w\-\.]*\:)?[a-zA-Z_][\w\-\.]*)/

// const singleAttrAssign = /(?:=)/

// console.log(html.match(reg))
// // string 的 match 和 reg 的exec 返回的数组格式是一样的

// // (?:[a-zA-Z_][\w\-\.]*\:)?


// let reg = /\{\{((?:.|\n)+?)\}\}/
// let html = `<div>{{this.info.name

// .firstWord}}</div>`


// console.log('html.match(reg):[1] ', html.match(reg)[1]);

// 以@或v-on开头的字符
// reg = /^@|^v\-on/

// 匹配如 item in list 或者 item of list
// reg = /([\w]*)\s+(?:in|of)\s+([\w]*)/



// let reg = /^<((?:[a-zA-Z_][\w\-\.]*\:)?[a-zA-Z_][\w\-\.]*)/

// 先假象一个需求： 匹配（）中间的

const regex = /(00)?(00)/;
const str = `00`;
let m;

if ((m = regex.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}