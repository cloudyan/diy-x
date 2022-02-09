# 深浅拷贝区别与实现

## 深拷贝 `deepclone`

### 递归实现

- 判断类型，**正则**和**日期**直接返回新对象
- **空 null**或者**非对象类型**，直接返回原值
- 考虑循环引用，判断如果`hash`中含有直接返回`hash`中的值
- 新建一个相应的 `new obj.constructor` 加入 `hash`
- 遍历对象递归（普通 `key` 和 `key` 是 `symbol` 类型的情况）

### `JSON.stringify` 结合 `JSON.parse` 实现clone

```js
const jsonClone = function (obj) {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch(err) {
    return obj;
  }
}
```

了解此方案 `clone` 的局限性，需要了解这两个方法处理时有哪些特点，详细参见 [JSON, JSON.stringify 与 JSON.parse](../json/readme.md)

## 知识点

- MDN [`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
  - 其中的 key 必须是引用类型
  - 张鑫旭 [JS WeakMap应该什么时候使用](https://www.zhangxinxu.com/wordpress/2021/08/js-weakmap-es6/)
  - MDN [WeakRef](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
  - MDN [FinalizationRegistry](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry)
  - [你不知道的 WeakMap](https://juejin.cn/post/6844904169417998349)
- `instanceof`

参考

- https://segmentfault.com/a/1190000021667397
