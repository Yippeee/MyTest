const fs = require("fs");
const md5 = require('md5');
const axios = require('axios');

function translateFile(path) {
    fs.readFile(path, function (err, data) {
        if (err) {
            return
        }
        data = data.toString()
        const reg = /zh\:\s*'(.*?)'/gms
        const regEn = /en\:\s*'(.*?)'/gms
        let arr = []

        let matchArr
        while ((matchArr = reg.exec(data)) !== null) {
            arr.push(matchArr[1])
        }
        arr.forEach((item, index) => {
            arr[index] = item.match(/[\u2E80-\u9FFF]|!|！|\.\.\.|\/(?=[\u2E80-\u9FFF])|:|：|，/g).join('') // 保留中文，以及相关符号
        })
        console.log('arr: ', arr);
        translate(arr).then(res => {
            let i = 0
            let result = data.replace(regEn, () => `en: '${res[i++]}'`)
            fs.writeFile('./test.txt', result, 'utf8', function (err) {
                if (err) return
                console.log('翻译完成！')
            });
        }).catch(() => {
            console.log('翻译失败！')
        })
    })
}


function translate(words) {
    return new Promise((resolve, reject) => {
        let result = []
        let queryArr = words;
        let axiosArr = []
        let appid = '20190130000260357';
        let key = 'ad0HuSCtr35WmBVzwoC6';
        let salt = (new Date).getTime();
        let from = 'zh';
        let to = 'en';

        let axiosSetting = {
            method: 'get',
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            dataType: 'jsonp',
        }
        queryArr.forEach(item => {
            let set = Object.assign(axiosSetting, {
                params: {
                    q: item,
                    sign: md5(appid + item + salt + key),
                    appid: appid,
                    salt: salt,
                    from: from,
                    to: to,
                }
            })
            axiosArr.push(axios(set))
        })
        axios.all(axiosArr).then(function (response) {
            result = response.map((item) => {
                return item.data.trans_result ? item.data.trans_result[0].dst : '';
            })
        }).then(() => {
            console.log('translate completed')
            resolve(result)
        })
    })
}

module.exports = { translateFile, translate }