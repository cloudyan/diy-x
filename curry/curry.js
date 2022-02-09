
// 函数柯里化

function curry(fn, ...args) {
  const fnLen = fn.length
  const argsLen = args.length
  // 对比函数的参数和当前传入参数
  // 若参数不够就继续递归返回 curry
  // 若参数够就调用函数返回相应的值
  if (fnLen > argsLen) {
    return function(...arg2s) {
      return curry(fn, ...args, ...arg2s)
    }
  }else{
    return fn(...args)
  }
}


// testing
function sumFn(a, b, c) { return a + b + c }
let sum = curry(sumFn)
console.log(sum(2)(3)(5))   // 10
console.log(sum(2, 3)(5))   // 10
