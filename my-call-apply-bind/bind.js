/* eslint-disable no-extend-native,prefer-rest-params */

// 函数原型方法 `bind` 的实现
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }

  // 表示当前函数 this
  const _this = this

  // 判断有没有传参进来，若为空则赋值[] 或直接使用 args
  const arg = [...arguments].slice(1)

  return function newFn(...newFnArgs) {
    // 处理函数使用new的情况
    if (this instanceof newFn) {
      return new _this(...arg, ...newFnArgs)
    } else {
      return _this.apply(context, [...arg, ...newFnArgs])
    }
  }
}
