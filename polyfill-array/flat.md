# `flat` 实现数组扁平化

```js
let arr = [1, 2, [3, 4, [5, [6]]]]
console.log(arr.flat(Infinity))
// flat 参数为指定要提取嵌套数组的结构深度，默认值为 1
```

使用 `reduce` 实现

```js
// 没控制深度，相当于 Infinity
const myFlat = function flat(arr){
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flat(cur) : cur)
  }, [])
}

let arr = [1, 2, [3, 4, [5, [6]]]]
console.log(myFlat(arr, Infinity))
```
