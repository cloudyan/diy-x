# 函数柯里化

TODO 柯里化的优缺点与使用场景

```js
/*
 * 编写函数sum
 * sum(1)(2).count() // 3
 * sum(1)(2)(3).count() // 6
 */

function sum() {
  let args = [...arguments]
  let add = function () {
    args.push(...arguments)
    return add
  }
  add.count = function () {
    return args.reduce((acc, cur) => acc + cur)
  }
  return add
}
console.log(sum(1)(2).count()) // 3
console.log(sum(1)(2)(3).count()) // 6
```
