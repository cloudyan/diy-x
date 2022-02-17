# `flat` 实现数组扁平化

## ES6 flat

```js
let arr = [1, 2, [3, 4, [5, [6]]]]
console.log(arr.flat(Infinity))
// flat 参数为指定要提取嵌套数组的结构深度，默认值为 1
```

## 使用 `reduce` 实现

```js
// 没控制深度，相当于 Infinity
const myFlat = function flat(arr){
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flat(cur) : cur)
  }, [])
}

let arr = [1, 2, [3, 4, [5, [6]]]]
console.log(myFlat(arr, Infinity))

console.log([1,2].concat(3, [4, 5]))
```

`concat(valueN)` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

concat 的参数 `valueN` 为数组和/或值，将被合并到一个新的数组中。如果省略了所有 valueN 参数，则 concat 会返回调用此方法的现存数组的一个浅拷贝。
