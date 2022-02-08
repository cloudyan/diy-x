/* eslint-disable no-extend-native,prefer-rest-params */

// 函数原型方法 `apply` 的实现
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }
  const arr = arguments[1]
  if (typeof arr !== 'undefined' && !Array.isArray(arr)) {
    throw new TypeError('not array')
  }

  if ([undefined, null].includes(context)) {
    context = window
  }

  let tempFn = Symbol()
  context[tempFn] = this

  const result = arr ? context[tempFn](...arr) : context[tempFn]()

  delete context[tempFn]

  return result
}
