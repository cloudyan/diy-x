
// 实现 Array.prototype.forEach
// MDN polyfill 源码大体如下
// 更多参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#polyfill
Array.prototype.myForEach = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  const temp = Object(this)       // this 就是当前的数组
  const len = temp.length >>> 0   // 后面有解释
  let k = 0
  while (k < len) {
    if (k in temp) {
      callback.call(thisArg, temp[k], k, temp);
    }
    k++;
  }
}












// >>> 0 是无符号右移 0 位，那有什么意义嘛？
// 就是为了保证转换后的值为正整数。其实底层做了 2 层转换，
//    第一是非 number 转成 number 类型，
//    第二是将 number 转成 Uint32 类型。
// 更多参见 [js中 something >>> 0是什么意思?](https://zhuanlan.zhihu.com/p/100790268)
