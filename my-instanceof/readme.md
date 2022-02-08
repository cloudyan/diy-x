# 实现 `instanceof` 关键字

- `instanceof` 是用来判断A是否为B的实例, 表达式为：`A instanceof B`, 如果 `A` 是 `B` 的实例, 则返回 `true`, 否则返回 `false`。
- `instanceof` 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。
- 不能检测基本数据类型, 在原型链上的结果未必准确, 不能检测 `null`, `undefined`
- 实现：遍历左边变量的原型链, 直到找到右边变量的 `prototype`, 如果没有找到, 返回 `false`
