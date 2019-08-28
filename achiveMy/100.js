// 判断两个有序数组的子集关系
function isSubArr_1(a, b) {
    if (b.length > a.length || a.length === 0 || b.length === 0) return false
    let startIndex = a.indexOf(b[0])
    for (let i = 0; i < b.length; i++) {
        let aIndex = startIndex + i
        if (a[aIndex] === b[i]) {
            if (i === b.length - 1) {
                return true
            }
        } else {
            return false
        }
    }
}

a = isSubArr_1([1, 2, 3, 4, 5, 8], [1, 2, 3, 4, 8])
console.log('a: ', a);


function isSubArr_2(a, b) {
    if (b.length > a.length || a.length === 0 || b.length === 0) return false
    let startIndex = a.indexOf(b[0])
    for (let i = 0, length = b.length; i < length; i++) {
        for (let j = startIndex; j < a.length; j++) {
            if (b[i] === a[j]) {
                startIndex = j + 1
                break
            } else if (j === a.length - 1) {
                return false
            }
        }
    }
    return true
}
a = isSubArr_2([1, 2, 3, 4, 5, 8], [2, 3, 4, 8])
console.log('a: ', a);


function isSubArr_3(a, b) {
    if (b.length > a.length || a.length === 0 || b.length === 0) return false
    let p0 = -1, p1 = 0;
    while (p1 < b.length) {
        a = a.slice(p0 + 1)
        if ((p0 = a.indexOf(b[p1++])) < 0) {
            return false
        }
    }
    return true
}
a = isSubArr_3([1, 2, 3, 4, 5, 8], [1, 5, 5, 8])
console.log('a: ', a);

function isSubArr_4(a, b) {
    if (b.length > a.length || a.length === 0 || b.length === 0) return false
    let p_a = 0, p_b = 0;
    while (p_a < a.length) {
        if (a[p_a] === b[p_b]) {
            p_b++
            if (p_b === b.length) return true
        }
        p_a++
    }
    return false
}
a = isSubArr_4([1, 2, 3, 4, 5, 8], [1, 5, 8])
console.log('a: ', a);

// 一定记住这么个真理, 有序数组的遍历, 都可以在一次遍历完成操作

function isSubArr_5(a, b) {
    if (b.length > a.length || a.length === 0 || b.length === 0) return false
    let p_a = 0, p_b = 0;
    while (p_b < b.length) {
        if (a[p_a] === b[p_b]) {
            p_b++
            if (p_b === b.length) return true
        } else {
            p_a++
            if (p_a === a.length) return false
        }
    }
    return false
}
a = isSubArr_5([1, 2, 3, 4, 5, 8], [1, 1, 2, 5, 8])
console.log('a5: ', a);