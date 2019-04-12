var TemplateEngine = function (tpl, data) {
    const reg = /<%(.+?)%>/g, regOperator = /(if|else|switch|break|case|}|{)/g
    let group
    let code = 'let r = [];', pointer = 0
    const handleTpl = (line, isJs) => {
        if (isJs) {
            if (regOperator.test(line)) {
                
                code += line
            } else {
                
                code += 'r.push(' + line + ');'
            }
        } else {
            code += 'r.push("' + line + '");'
        }
    }
    while ((group = reg.exec(tpl)) !== null) {
        handleTpl(tpl.slice(pointer, group.index))
        handleTpl(group[1], true)
        pointer = group.index + group[0].length
    }
    handleTpl(tpl.slice(pointer))
    code += 'return r.join("");'
    
    return new Function(code).call(data)
}
var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.age%> years old. And I\'m <%this.info.gender%></p>\
    <p><%if(this.show){%><%this.show1%><%}else{%><%this.show2%><%}%></p>\
';
console.log(TemplateEngine(template, {
    name: "Krasimir",
    age: 29,
    info: {
        gender: 'man'
    },
    show: 'true',
    show1: 'aaaaaaa',
    show2: 'bbbbbbbbbbb',
}));
