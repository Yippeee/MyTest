let demoData = [{
    id: 1,
    children: [{
        id: 11,
        children: [{
            id: 111,
        }, {
            id: 112
        }]
    }]
}, {
    id: 2,
    children: [{
        id: 21
    }]
}]

const fn = (val) => {
    let resultArr = []
    const proxyFn = (val, targetArr, arr = []) => {
        if (targetArr.some(i => i.id == val)) {
            resultArr = [...arr, val]
        } else {
            targetArr.forEach(i => { i.children && proxyFn(val, i.children, [...arr, i.id]) })
        }
    }
    proxyFn(val, demoData)
    return resultArr
}

a = fn(111)
console.log('a: ', a);

function reverseInt(int) {
    if (int.length === 1) return +int
    return [reverseInt(int.toString().slice(1)), reverseInt(int.toString()[0])].join('')
}
a = reverseInt(123)
console.log('a: ', a);

let list = [
    { id: 1, name: '部门A', parentId: 0 },
    { id: 2, name: '部门B', parentId: 0 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 1 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
    { id: 7, name: '部门G', parentId: 2 },
    { id: 8, name: '部门H', parentId: 4 }
];

const result = convert(list);
console.log('result: ', result);

// list 得默认是按照parentID排序的
function convert(list) {
    let resultArr = []
    const map = list.reduce((all, cur) => {
        all[cur.id] = cur
        return all
    }, {})
    list.forEach(item => {
        if (item.parentId === 0) {
            resultArr.push(item)
        } else {
            let parent = map[item.parentId]
            parent.children = parent.children || []
            parent.children.push(item)
        }
    })
    return resultArr
}