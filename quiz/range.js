function range(from, to, step) {
    let result = []
    let fromCode, toCode
    let isString = false
    if (typeof from === 'number'){
        fromCode = from
        toCode = to
    } else if (typeof from === 'string') {
        fromCode = from.charCodeAt(0)
        toCode = to.charCodeAt(0)
        isString = true
    } else {
        throw new Error('Type is not support!')
    }

    for (let i = fromCode; i <= toCode; i += step) {
        result.push(isString ? String.fromCharCode(i) : i)
    }
    console.log('result: ', result);
    return result
}

range(1, 10, 3)
range('A', 'F', 2)
