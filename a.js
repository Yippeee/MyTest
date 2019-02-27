// function addScript(url){
//     var script = document.createElement('script')
//     script.src = src
//     document.appendChild(script)
// }

// addScript('https://xxx.com?callback=fn')

// function fn(data){
//     console.log(data)
// }

// ["A","B","C","B","A"].reduce((o, k, index) => {
//     console.log(o, k, index)
//     k in o ? o[k].push(index) : (o[k] = [index]);
//     // k in o 的判断需要修改成为 
//     return o;
// },{});

function press(str) {
    let total = str.length
    for (let i = 1; i < total; i++) {
        if (str[i] == str[i -1]){
            // console.log(str[i])
        }
    }
    console.log(str)
}
press('aaajjjhhhaaa')
let a = 'ffffffffffff'


