
// 类数组转化为数组

let arrayLike = {
  0: 'tom',
  1: '65',
  2: '男',
  3: ['jane','john','Mary'],
  'length': 4
}


// 1. [].slice
console.log([].slice.call(arrayLike))
// 2. Array.from
console.log(Array.from(arrayLike))
// 3. Array.apply
console.log(Array.apply(null, arrayLike))
// 4. [].concat
// 这个有点问题
console.log([].concat.apply([], arrayLike))
