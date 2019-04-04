


// var TemplateEngine = function (tpl, data) {
//     // magic here ...
//     var reg = /<%([^%]*)%>/g, match
//     while (match = reg.exec(tpl)) {
//         tpl = tpl.replace(match[0], data[match[1]])
//         console.log('match[0]: ', match[0]);
//         console.log('match[1]: ', match[1]);
//     }
//     return tpl
// }
var TemplateEngine = function (html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0,
        match;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}


var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.a.age%> years old.</p>';
console.log(TemplateEngine(template, {
    name: "Krasimir",
    a: { age: 29 }
}));