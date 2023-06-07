// 实现 `Object.create`

// 参考
// MDN 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// Object.create() 会将参数对象作为一个新创建的空对象的原型, 并返回这个空对象

// 简略版
function myCreate(obj) {
  // 新声明一个函数
  function C() {}
  // 将函数的原型指向obj
  C.prototype = obj
  // 返回这个函数的实力化对象
  return new C()
}

// MDN 官方版 Polyfill
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create#polyfill
// 请注意，尽管在 ES5 中 Object.create支持设置为[[Prototype]]为null，但因为那些ECMAScript5以前版本限制，此 polyfill 无法支持该特性。
if (typeof Object.create !== 'function') {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto)
    } else if (proto === null) {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.",
      )
    }

    if (typeof propertiesObject !== 'undefined')
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument.",
      )

    function F() {}
    F.prototype = proto

    return new F()
  }
}
