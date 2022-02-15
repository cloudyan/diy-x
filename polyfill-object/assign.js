
// 实现 `Object.assign`

// MDN 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

// Object.prototype.hasOwnProperty.call(obj, key)
// Object.hasOwn() 目前兼容性不够好
Object.myAssign = function(target, ...source) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  let ret = Object(target)

  source.forEach(function(obj) {
    if (obj != null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = obj[key]
        }
      }
    }
  })

  return ret
}


// MDN 官方 Polyfill
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#polyfill_2
// 这个 polyfill 不支持 symbol 属性, 由于 ES5 中本来就不存在 symbols
// ES6 的 Object.assign 是支持处理 symbol 属性的
//     考虑更周全的版本可以参见 https://github.com/es-shims/object.assign/blob/main/implementation.js
//     通过 has-symbols 模块 && Object.getOwnPropertySymbols 判断是否支持 symbol 然后做处理
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
