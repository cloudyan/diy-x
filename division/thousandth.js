
// 实现切分千分位

// 1. 使用 toLocaleString 方法
// 小数只能保留3位（第二个参数兼容性不好）
// 更多参见 MDN [Number.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
function thousandth(num) {
  return Number(num).toLocaleString();
}

// testing
console.log(thousandth(1234567890))               // 1,234,567,890
console.log(thousandth(1234567890.1234567890))    // 1,234,567,890.123
console.log(thousandth('1234567890.1234567890'))  // 1,234,567,890.123


// 2. 使用正则
// 无小数点
let num1 = '1234567890'
num1.replace(/(\d)(?=(\d{3})+$)/g, '$1,')

// 有小数点
let num2 = '1234567890.1234567890'
num2.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')


// /(\d)(?=(\d{3})+(?!\d))/g

// 低版本浏览器报错
// /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g
