// const searchMatrix = function (matrix, target) {
//   // write your code here
//   let res = false
//   matrix.forEach(element => {
//     element.forEach(e => {
//       if (e === target) res = true
//     })
//   });
//   return res
// }
const searchMatrix = function (matrix1, target) {
  let matrix,
    left = 0,
    right = matrix1.length,
    key,item,length
  while (left <= right) {
    key = Math.floor((left + right) / 2)
    console.log('key: ', key);
    if (key === 0 || key === matrix1.length) {
      break
    }
    item = matrix1[key]
    console.log('item: ', item);
    length = item.length
    console.log('length: ', length);
    console.log('right: ', right);
    console.log('left: ', left);
    if (target < item[length - 1]) {
      right = key - 1 
    } else {
      left = key + 1
    }
  }
  matrix = matrix1[key]
  console.log('key final: ', key);
  console.log('matrix: ', matrix);
  // return dichotomy(matrix, target)
}
function dichotomy(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let key
  while (left <= right) {
      key = Math.floor((left + right) / 2)
      if (target == arr[key]) {
          return true
      } else if (target < arr[key]) {
          right = key - 1
      } else {
          left = key + 1
      }
  }
  return false
}
a = searchMatrix([[1,4,5],[6,7,8]],9)
console.log('a: ', a);