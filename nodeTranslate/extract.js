const fs = require('fs')
const { translate } = require('./translate.js.js')

//TODO: optimization regular


let result = {}
let resultStr = ''

fs.readFile('./editPortal.html', function (err, data) {
    if (err) {
        console.log('err: ', err);
        return
    }
    data = data.toString()
    // const reg = />?.*?(?<=\/\/\s*)([\u2E80-\u9FFF]*).*?<?/gsm
    const reg = /(?:\/\/[^\n])|([a-zA-Z,.，]*[\u4E00-\u9FA5\uf900-\ufa2d]+[a-zA-Z,.，!]*)/gsm

    // data.match(reg)
    // let wordArr = data.match(reg)
    let wordArr = []
    while (Arr = reg.exec(data)) {
        // console.log('Arr: ', Arr);
        Arr[1] && wordArr.push(Arr[1])
    }
    console.log('wordArr: ', wordArr);
    // translate(wordArr).then((wordArrEn) => {
    //     wordArr.forEach((element, index) => {
    //         result['text_' + index] = {
    //             zh: element,
    //             en: wordArrEn[index]
    //         }
    //     });
    //     resultStr = `var lang = ${JSON.stringify(result)}`
    //     resultStr = resultStr.replace(/},/g,'},\n').replace(/= {/,'= {\n').replace(/"text_/g,'\t"text_')
    //     console.log('resultStr: ', resultStr);
    //     fs.writeFile('lang.js', resultStr, 'utf-8', function (err) {
    //         err && console.log('err: ', err);
    //     })
    // })
})


// multiply files sync read

// let data1 = fs.readFileSync('./editPortal.html')
// let data2 = fs.readFileSync('./groupManage.htm')

// let data = data1.toString().concat(data2.toString())
// console.log('data: ', data);