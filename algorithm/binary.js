function binary(item, array) {
  let start = 0, end = array.length, flag = ~~(end / 2)
  while (start <= end) {
    flag = ~~((start + end) / 2)
    if (array[flag] > item) {
      end = flag - 1
    } else if (array[flag] < item) {
      start = flag + 1
    } else {
      return flag
    }
  }
  return -1
}

console.time(1)
console.log('binary: ', binary(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 120, 1999, 9090]));
console.timeEnd(1)


// 在使用递归函数的时候,如果需要使用每次运算保留的值,需要return 每一次的的返回值才可以
function binary2(item, array, start = 0, end = array.length) {
  if (start > end) return -1;
  let flag = ~~((start + end) / 2)
  if (array[flag] > item) {
    return binary2(item, array, start, flag - 1)
  } else if (array[flag] < item) {
    return binary2(item, array, flag + 1, end)
  } else {
    return flag
  }
}

console.time(2)
console.log('binary2: ', binary2(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 120, 1999, 9090]));
console.timeEnd(2)


function bubble(array) {
  let length = array.length
  for (let i = 0; i < length; i++) {
    for (let j = j + 1; j < length; j++){
      if(array[i] > array[j]){
        [array[i],array[j]] = [array[j],array[i]]
      }
    }
  }
}