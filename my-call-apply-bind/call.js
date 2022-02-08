/* eslint-disable no-extend-native,prefer-rest-params */

// 函数原型方法 `call` 的实现
// 将要改变 this 指向的方法挂到目标上执行并返回
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not funciton')
  }

  // context = context || window 改为如下
  if ([undefined, null].includes(context)) {
    context = window
  }

  // context.fn = this 改为如下
  // 将当前被调用的方法定义在 context.tempFn 上。(为了能以对象调用形式绑定this)
  // FIXED: 避免函数名与上下文属性冲突，改为使用 Symbol
  let tempFn = Symbol()
  context[tempFn] = this

  // 以对象调用形式调用tempFn, 此时this指向 context 也就是传入的需要绑定的this指向
  const arg = [...arguments].slice(1)

  // const result = context[tempFn](...arg) // FIXED: 无参数就是无参数，不能改为传入空数组
  const result = arg.length > 0 ? context[tempFn](...arg) : context[tempFn]()
  // const result = args.length > 0 ? context[tempFn](...args) : context[tempFn]()

  // FIXED: 删除该方法，不然会对传入对象造成污染（添加该方法）
  delete context[tempFn]

  return result
}
