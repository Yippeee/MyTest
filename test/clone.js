// function shallowClone(source) {
// 	let result = {};
// 	for (const key in source) {
// 		if (source.hasOwnProperty(key)) {
// 			const element = source[key];
// 			result[key] = element;
// 		}
// 	}
// 	return result;
// }

// let obj = { a: [1, 2, 3], b: 'hello', c: 'fuck' };

// let b = {};

// let c = shallowClone(obj);
// console.log('c: ', c);

// Object.assign(b, obj);

// b.a.push(12);

// console.log(b);
// console.log('obj: ', obj);
// console.log('c: ', c);

const isArray = x => {
	return {}.toString.call(x) === '[object Array]';
};

const isObject = x => {
	return {}.toString.call(x) === '[object Object]';
};

const getType = x => {
	return x.__proto__.constructor;
	return /\s(.*)]/.exec({}.toString.call(x))[1];
};

function deepClone(source, type = Object) {
	// if (!isObject(source)) throw new Error('must be object!');
	let result = new type();
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			const element = source[key];
			if (typeof element === 'object') {
				result[key] = deepClone(element, getType(element));
			} else {
				result[key] = element;
			}
		}
	}
	return result;
}

function createData(deep, breadth) {
	var data = {};
	var temp = data;

	for (var i = 0; i < deep; i++) {
		temp = temp['data'] = {};
		for (var j = 0; j < breadth; j++) {
			temp[j] = j;
		}
	}

	return data;
}

class Node {
	/**
	 * @param  {} prev
	 * @param  {} content
	 */
	constructor(prev, content) {
		this.prev = prev;
		this.content = content;
	}
}

function deepCloneBreadth(source) {
	// 广度优先遍历 使用队列  shift()出队列  push()进队列
	let result = new source.__proto__.constructor();
	let queues = [new Node(result, source)]; // 队列

	/*======增加部分=======*/
	let objArr = [];
	function findInObjArr(arr, item) {
		for (const iterator of arr) {
			if (iterator.source === item) {
				return iterator.target;
			}
		}
	}
	/*=======增加部分======*/

	while (queues.length > 0) {
		let item = queues.shift();
		const { prev, content } = item;
		for (const key in content) {
			if (content.hasOwnProperty(key)) {
				if (typeof content[key] === 'object') {
					if (findInObjArr(objArr, content[key])) {
						prev[key] = findInObjArr(objArr, content[key]);
						continue;
					}
					prev[key] = new content[key].__proto__.constructor();
					queues.push(new Node(prev[key], content[key]));
					objArr.push({
						target: prev[key],
						source: content[key],
					});
				} else {
					prev[key] = content[key];
				}
			}
		}
	}
	return result;
}
