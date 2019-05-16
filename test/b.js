// class Node {
// 	constructor(prev, content) {
// 		this.prev = prev;
// 		this.content = content;
// 	}
// }

// function deepClone(source) {
// 	// 广度遍历 使用队列  shift()出队列  push()进队列
// 	let result = new source.__proto__.constructor();
// 	let queues = [new Node(result, source)];
// 	while (queues.length > 0) {
// 		let length = queues.length;
// 		while (length > 0) {
// 			let item = queues.shift();
// 			const { prev, content } = item;
// 			for (const key in content) {
// 				if (content.hasOwnProperty(key)) {
// 					if (typeof content[key] === 'object') {
// 						prev[key] = new content[key].__proto__.constructor();
// 						queues.push(new Node(prev[key], content[key]));
// 					} else {
// 						prev[key] = content[key];
// 					}
// 					length--;
// 				}
// 			}
// 		}
// 	}
// 	return result;
// }

// function cloneLoop(x) {
// 	const root = {};

// 	// 栈
// 	const loopList = [
// 		{
// 			parent: root,
// 			key: undefined,
// 			data: x,
// 		},
// 	];

// 	while (loopList.length) {
// 		console.log(0);
// 		// 深度优先
// 		const node = loopList.pop();
// 		const parent = node.parent;
// 		const key = node.key;
// 		const data = node.data;

// 		// 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
// 		let res = parent;
// 		if (typeof key !== 'undefined') {
// 			res = parent[key] = {};
// 		}

// 		for (let k in data) {
// 			if (data.hasOwnProperty(k)) {
// 				console.log('k: ', k);
// 				if (typeof data[k] === 'object') {
// 					// 下一次循环
// 					loopList.push({
// 						parent: res,
// 						key: k,
// 						data: data[k],
// 					});
// 				} else {
// 					res[k] = data[k];
// 				}
// 			}
// 		}
// 	}

// 	return root;
// }
// let obj = { a: { f: { s: 1 } }, b: 'hello', c: { a: 'sdf', ff: { ss: '1' } } };
// cloneLoop(obj);
