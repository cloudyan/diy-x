const isFunction = (fn) => typeof fn === 'function'
const isObject = (obj) => typeof obj === 'object' && obj !== null

// 实现 `new` 关键字
function myNew(fn, ...args) {
  if (typeof fn !== 'function') {
    throw 'myNew function the first param must be a function'
  }
  const newObj = Object.create(fn.prototype) // 创建一个继承自 fn.prototype 的新对象
  const result = fn.apply(newObj, args) // 将构造函数 fn 的 this 绑定到 newObj 中

  if (isObject(result) || isFunction(result)) {
    return result
  }
  return newObj
}

// testing
function Ctor() {}
let c = myNew(Ctor)
console.log(c)
