/* eslint-disable no-extend-native,prefer-rest-params */

// 实现一个call函数
// 将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  context = context || window
  context.fn = this
  const arg = [...arguments].slice(1)
  const result = context.fn(...arg)
  delete context.fn
  return result
}

// 参考：

// - https://mp.weixin.qq.com/s/620g6Gw6KF1N-jWUguw8yQ
