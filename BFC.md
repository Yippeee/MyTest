### 学习BFC

> 什么是BFC,全称 Block Formatting Context,中文就是块级格式化上下文.

#### 产生BFC的条件

1. 根元素或者包含它的子元素
2. 浮动 (元素的 float 不为 none 的情况)
3. 绝对定位元素 ( position为 fixed 或者 absolute )
4. 行内快 ( display 为 inline-block )
5. 表格单元格 ( display 为 table-cell )
6. overflow 不为 visible 的元素
7. 弹性盒 flex 布局

#### BFC特性

BFC中会形成一个隔离空间,其中会有一个常规流
计算BFC的高度的时候,考虑包含BFC的所有元素,浮动元素也计算其中
但是,浮动盒区域不会叠加到BFC上面
> 
    内部的Box会在垂直方向，从顶部开始一个接一个地放置。
    Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加
    每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
    BFC的区域不会与float box叠加。
    BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
    计算BFC的高度时，浮动元素也参与计算。


利用这些特性可以解决的问题:

margin 合并的问题  -  特性: BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。

使用浮动元素之后,高度塌陷 - 特性: 就是BFC不会与浮动盒子叠加, 就不会产生任何的塌陷了

清除浮动, 这个与上面的问题相似, 是让浮动元素也参与高度计算的方法 - 特性: 计算BFC的高度时，浮动元素也参与计算。


### 异步知识补充

其实关于JS的事件循环的宏任务,微任务基本上了解的差不多. (仅仅是了解,实现了解的还不够深入)
但是关于async 和 await 的知识却忽略了.
补充知识:
```js
    async function async1() {
        console.log('async1 start');
        await async2();
        console.log('async1 end');
    }
    async function async2() {
        console.log('async2');
    }

    console.log('script start');

    setTimeout(function() {
        console.log('setTimeout');
    }, 0)

    async1();

    new Promise(function(resolve) {
        console.log('promise1');
        resolve();
    }).then(function() {
        console.log('promise2');
    });
    console.log('script end');
````
看上面的await async2();console.log('async1 end')
其实await 只是 promise的语法糖而已,
await是一个让出线程的标志,会先把后面的代码执行一遍,把后面的代码加入micro任务中,然后就会跳出这个async函数

等同于:
Promise.resolver(async2().then( () =>{
    console.log(async1 end)
}))