/* eslint-disable no-extend-native,prefer-rest-params */

// https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
// 非常简单的示例
Function.prototype.simpleBind = function simpleBind(scope) {
  var fn = this
  return function simpleBinded() {
    return fn.apply(scope)
  }
}

// 函数原型方法 `bind` 的实现
Function.prototype.myBind = function myBind(context, ...args) {
  if (typeof this !== 'function') {
    // if (!(this instanceof Function)) {
    // 当前调用bind方法的不是函数
    throw new TypeError('this is not a function type.')
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

function es5Bind() {
  //arguments are just Array-like but not actual Array. Check MDN.
  let bindFn = this,
    bindObj = arguments[0],
    bindParams = [].slice.call(arguments, 1) //----> [arg1,arg2..] Array.isArray --> true
  return function () {
    bindFn.apply(bindObj, bindParams.concat([].slice.call(arguments)))
  }
}

function es6Bind(...bindArgs) {
  let context = this
  return function (...funcArgs) {
    context.call(bindArgs[0], ...[...bindArgs.slice(1), ...funcArgs])
    // we can use above line using call (OR) below line using apply
    //context.apply(bindArgs[0], [...(bindArgs.slice(1)), ...funcArgs]);
  }
}
// Function.prototype.es5Bind = es5Bind;
// Function.prototype.es6Bind = es6Bind;
