/* eslint-disable no-extend-native,prefer-rest-params */

// 函数原型方法 `call` 的实现
// 将要改变 this 指向的方法挂到目标上执行并返回
// 注意：既然是模拟实现，不应该用更高级的方法 如 ... 运算符，改造如下
//     [...arguments].slice(1) 改为 [].slice.call(arguments, 1)
//     Symbol() 可以用随机数 Math.random().toString() 同时避免已存在
//     但调用时，去除 ... 难以处理参数格式 （想到的办法，就是拼接 new Function 字符串了）
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }

  // context = context || window 改为如下 (这里使用 globalThis 处理 nodejs 执行无 window 的情况)
  if ([undefined, null].includes(context)) {
    context = globalThis || window
  }

  // context.fn = this 改为如下
  // 将当前被调用的方法定义在 context.tempFn 上。(为了能以对象调用形式绑定this)
  // FIXED: 避免函数名与上下文属性冲突，改为使用 Symbol
  let tempFn = Symbol()
  // 思考下为什么要这样做？arguments[0].fn = this
  context[tempFn] = this

  // 以对象调用形式调用tempFn, 此时this指向 context 也就是传入的需要绑定的this指向
  const arg = [].slice.call(arguments, 1)

  // 执行保存的函数, 这个时候作用域就是在执行方的对象的作用域下执行，这会改变的this的指向
  const result = context[tempFn](...arg) // 如果 arg 为空数组时，这里就是无参数

  // FIXED: 删除该方法，不然会对传入对象造成污染（添加该方法）
  delete context[tempFn]

  return result
}

