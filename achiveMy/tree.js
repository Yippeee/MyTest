let flatArr = [
    { id: 1, title: "解忧杂货铺1", parent_id: 0 },
    { id: 2, title: '解忧杂货铺2', parent_id: 0 },
    { id: 7, title: '解忧杂货铺4-1-1', parent_id: 5 },
    { id: 3, title: '解忧杂货铺2-1', parent_id: 2 },
    { id: 4, title: '解忧杂货铺3-1', parent_id: 3 },
    { id: 5, title: '解忧杂货铺4-1', parent_id: 4 },
    { id: 6, title: '解忧杂货铺2-2', parent_id: 2 },
]
function convert(list) {
    list = list.sort((a, b) => a.parent_id - b.parent_id)
    const res = [];
    const map = list.reduce((all, cur) => (all[cur.id] = cur, all), {})
    for (const item of list) {
        if (item.parent_id === 0) {
            res.push(item) // 构建初始数组
        } else {
            if (item.parent_id in map) {
                const parent = map[item.parent_id]
                parent.children = parent.children || []
                parent.children.push(item)
            }
        }
    }
    return res;
}
let returnTree = convert(flatArr);
console.log(JSON.stringify(returnTree));


a = tree2Arr(returnTree)
console.log('FinalVal: ', a);

// function tree2Arr(tree) {
//     let result = []
//     let queen = []
//     queen = queen.concat(tree)
//     while (queen.length > 0) {
//         let element = queen.shift()
//         if (element.children) {
//             queen = queen.concat(element.children)
//         }
//         delete element.children
//         result.push(element)
//     }
//     return result
// }

// 递归的话，函数本身要只对子层数据处理
function tree2Arr(tree) {
    let result = []
    let children = []
    for (const iterator of tree) {
        if (iterator.children) {
            children.push(...iterator.children)
            delete iterator.children
        }
        result.push(iterator)
    }
    result = result.concat(children.length > 0 ? tree2Arr(children) : [])
    return result
}