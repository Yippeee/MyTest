const fs = require('fs')
const { translate } = require('./translate.js')

function generateLangFile(data) {
    const reg = /(\/\/\s*[^\s]*)*([\u4E00-\u9FA5\uf900-\ufa2d]*[a-zA-Z,.，]*[\u4E00-\u9FA5\uf900-\ufa2d]+[a-zA-Z,.，!]*[\u4E00-\u9FA5\uf900-\ufa2d]*)(?:<|'|")/gsm

    let wordArr = []
    let resultObj = {}
    let resultStr = ''

    while (Arr = reg.exec(data)) {
        !Arr[1] && wordArr.push(Arr[2])
    }
    wordArr = [...new Set(wordArr)]
    console.log('找到的中文数组为: ', wordArr);
    translate(wordArr).then((wordArrEn) => {
        wordArr.forEach((element, index) => {
            resultObj['text_' + index] = {
                zh: element,
                en: wordArrEn[index]
            }
        });
        resultStr = `var lang = ${JSON.stringify(resultObj)}`
        resultStr = resultStr.replace(/},/g, '},\n').replace(/= {/, '= {\n').replace(/"text_/g, '\t"text_')
        fs.writeFile('lang.js', resultStr, 'utf-8', function (err) {
            err && console.log('err: ', err);
        })
    })
}

// multiply files sync read

let files = ['./editPortal.html', './groupManage.htm']

let data = files.reduce((allData, curPath, index) => {
    try {
        let data = fs.readFileSync(curPath)
        return allData.toString().concat(data.toString())
    } catch (e) {
        console.log(`第{index}个文件，${curPath}发生了错误${e}`)
    }
}, '')

generateLangFile(data)
