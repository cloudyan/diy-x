# 实现函数原型方法 `call` `apply` 和 `bind`

## `call` 的实现

- 第一个参数为`null`或者`undefined`时，`this` 指向全局对象`window`，值为原始值的指向该原始值的自动包装对象，如 `String`、`Number`、`Boolean`
- 为了避免函数名与上下文(`context`)的属性发生冲突，使用`Symbol`类型作为唯一值
- 将函数作为传入的上下文(`context`)属性执行
- 函数执行完成后删除该属性，不然会对传入对象造成污染
- 返回执行结果

## `apply` 的实现

- 前部分与 `call` 的实现一样
- 第二个参数可以不传，但类型必须为数组或者类数组

## `bind` 的实现

需要考虑：

- `bind` 除了 `this` 外，还可传入多个参数；
- `bind` 创建的新函数可能传入多个参数；
- 新函数可能被当做构造函数调用；
- 函数可能有返回值；

实现方法：

- `bind` 方法不会立即执行，需要返回一个待执行的函数；（闭包）
- 实现作用域绑定（`apply`）
- 参数传递（`apply` 的数组传参）
- 当作为构造函数的时候，进行原型继承

参考：

- https://mp.weixin.qq.com/s/oOmX4lcCy_vZfXx0KjLKOg
- https://juejin.cn/post/6844903999791955982

扩展

- https://stackoverflow.com/questions/51503894/how-can-create-own-call-function-in-javascript

While each browser has its own source code for implementing Javascript, you can find how many of the native Javascript functions are implemented with the ECMA specifications found here:

http://www.ecma-international.org/ecma-262/10.0/index.html#sec-properties-of-the-function-prototype-object

- For specs of `apply`, see: 19.2.3.1
- For specs of `bind`, see: 19.2.3.2
- For specs of `call`, see: 19.2.3.3

If you're interested for example, how Node implemented apply, you can dig into their source code on Github here: https://github.com/nodejs/node
