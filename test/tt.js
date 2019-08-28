function inspect(x) {
    return (typeof x === 'function') ? inspectFn(x) : inspectArgs(x);
}

function inspectFn(f) {
    return (f.name) ? f.name : f.toString();
}

function inspectArgs(args) {
    console.log('args: ', args);
    return args.reduce(function (acc, x) {
        return acc += inspect(x);
    }, '(') + ')';
}

// const curry = function (fn, args = [].slice(arguments)) {
//     if (arguments.length === fn.length) {
//         return fn.apply(this, args)
//     }
//     return function () {
//         args = args.concat(Array.from(arguments))
//         console.log('args: ', args);
//         console.log('fn.length: ', fn.length);
//         if (args.length !== fn.length) {
//             console.log('a')
//             return curry(fn, args)
//         } else {
//             return fn.apply(this, args)
//         }
//     }
// }

// function compose(fns) {
//     fns = Array.from(arguments)
//     console.log('fns: ', fns);
//     return function () {
//         let result = Array.from(arguments)
//         for (let i = fns.length - 1; i >= 0; i--) {
//             result = fns[i].apply(null, Array.isArray(result) ? result : [result])
//             console.log('result: ', result);
//         }
//         return result
//     }
// }

function curry(fx) {
    var arity = fx.length;

    return function f1() {
        var args = Array.prototype.slice.call(arguments, 0);
        if (args.length >= arity) {
            return fx.apply(null, args);
        }
        else {
            var f2 = function f2() {
                var args2 = Array.prototype.slice.call(arguments, 0);
                return f1.apply(null, args.concat(args2));
            }
            f2.toString = function () {
                return inspectFn(fx) + inspectArgs(args);
            }
            console.log('f2: ', f2);
            return f2;
        }
    };
}

// function compose() {
//     var args = arguments;
//     var start = args.length - 1;
//     return function () {
//         var i = start;
//         var result = args[start].apply(this, arguments);
//         while (i--) result = args[i].call(this, result);
//         return result;
//     };
// };

compose = function () {
    var fns = toArray(arguments),
        arglen = fns.length;

    return function () {
        for (var i = arglen; --i >= 0;) {
            var fn = fns[i]
                , args = fn.length ? Array.prototype.slice.call(arguments, 0, fn.length) : arguments
                , next_args = Array.prototype.slice.call(arguments, (fn.length || 1)); //not right with *args
            next_args.unshift(fn.apply(this, args));
            arguments = next_args;
        }
        return arguments[0];
    }
}

var data = {
    result: "SUCCESS",
    tasks: [
        {
            id: 104, complete: false, priority: "high",
            dueDate: "2013-11-29", username: "Scott",
            title: "Do something", created: "9/22/2013"
        },
        {
            id: 105, complete: false, priority: "medium",
            dueDate: "2013-11-22", username: "Lena",
            title: "Do something else", created: "9/22/2013"
        },
        {
            id: 107, complete: true, priority: "high",
            dueDate: "2013-11-22", username: "Mike",
            title: "Fix the foo", created: "9/22/2013"
        },
        {
            id: 108, complete: false, priority: "low",
            dueDate: "2013-11-15", username: "Punam",
            title: "Adjust the bar", created: "9/25/2013"
        },
        {
            id: 110, complete: false, priority: "medium",
            dueDate: "2013-11-15", username: "Scott",
            title: "Rename everything", created: "10/2/2013"
        },
        {
            id: 112, complete: true, priority: "high",
            dueDate: "2013-11-27", username: "Lena",
            title: "Alter all quuxes", created: "10/5/2013"
        }
    ]
};

// 我们需要写一个名为 getIncompleteTaskSummaries 的函数，接收一个 username 作为参数，从服务器获取数据，然后筛选出这个用户的未完成的任务的 ids、priorities、titles、和 dueDate 数据，并且按照日期升序排序。
var fetchData = function () {
    // 模拟
    return Promise.resolve(data)
};

const getIncompleteTaskSummaries = function (username) {
    fetchData().then(res => {
        return res.tasks
    }).then(res => {
        return res.filter(item => item.username === username)
    }).then(res => {
        return res.filter(item => item.complete === false)
    }).then(res => {
        return res.map(item => {
            return {
                id: item.id,
                title: item.title,
                dueDate: item.dueDate
            }
        })
    }).then(res => {
        return res.sort((a, b) => {
            return a.dueDate - b.dueDate
        })
    }).then((c) => {
        // console.log('c: ', c);
    })
}

getIncompleteTaskSummaries('Scott')

module.exports = {
    compose,
    curry
}