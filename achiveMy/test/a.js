console.log('a js')
setTimeout(() => {
    console.log('aaaaa')
}, 12)
for (let i = 0; i < 10000; i++) {
    console.log('ccccccc')
}
//  在有JS的情况下, DOMContentLoaded 一定会在所有的资源加载完成之后才调用