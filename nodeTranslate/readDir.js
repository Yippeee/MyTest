const fs = require('fs')
const path = require('path')

/*** 
 * @return [ARRAY] 返回目录下符合要求的所有文件名
*/

// 都使用异步的放方法，保证其效率

function readDirPromise(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, lists) => {
            if (err) { reject(err) } else {
                resolve(lists)
            }
        })
    })
}

function readStatPromise(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stat) => {
            if (err) { reject(err) } else {
                resolve(stat)
            }
        })
    })
}

function readDir(dir, resultArr = []) {
    return readDirPromise(dir).then(async function (files) {
        for (const file of files) {
            let stat = await readStatPromise(path.join(dir, file))
            let basename = path.basename(file)
            if (stat.isFile()) {
                // lang.js 排除
                if (!basename.match(/min|jquery|lang.js/i)) {
                    resultArr.push(path.resolve(dir, file))
                }
            } else {
                if (!/plugin|img|css|images|bootstrap|datetimepicker/i.test(basename)) {
                    await readDir(path.resolve(dir, file), resultArr)
                }
            }
        }
        return resultArr
    }).catch(err => {
        console.error(err)
    })
}

// readDir('E:\\company-projectMediumWeb\\portalRouter').then((val) => {
//     console.log('val: ', val);
//     console.log(1111111)
// })

module.exports = { readDir }