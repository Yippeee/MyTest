// 判断字符串是否是回文
function isPalindrome(str) {
  return str.split('').reverse().join('') === str
}

console.log('isPalindrome(): ', isPalindrome('atta'));

function isPalindrome2(str) {
  if (typeof str !== 'string') {
    throw new Error('str must be a string')
  }
  let finish = ~~((str.length - 1) / 2)
  for (let i = 0; i <= finish; i++) {
    if (str.charAt(i) !== str.charAt(length - 0)){
      return false
    }
  }
  return true
}

console.log('isPalindrome(): ', isPalindrome('atta'));
console.log('isPalindrome(): ', isPalindrome('sssssa'));
console.log('isPalindrome(): ', isPalindrome('assssa'));


// [1,2,3,4,5] [1,2,3,4,5,6]


class Storage{
  constructor(name) {

  }
}