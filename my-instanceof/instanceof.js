
// 实现 `instanceof` 关键字

// instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
// __proto__ 已废弃, 建议使用 Object.getPrototypeOf() (其兼容性已非常好)
function myInstanceof2(left, right) {
  // 获取对象的原型
  // let left = a.__proto__;
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
