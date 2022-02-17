# 深浅拷贝区别与实现

建议分析 lodash 的深拷贝实现

## 浅拷贝

只考虑对象类型

```js
// 1
Object.assign({}, obj)

// 2
{...obj}
```

简单实现

```js
function shallowCopy(obj) {
  if (typeof obj !== 'object') return

  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
```

## 深拷贝 `deepclone`

### 递归实现

深度优先

1. 判断类型，**正则**和**日期**直接返回新对象
2. 是函数，通过 `new Function` 和 `toString` 返回 clone
3. **空 null**或者**非对象类型**，直接返回原值
4. 考虑循环引用，判断如果`hash`中含有直接返回`hash`中的值
5. 新建一个相应的 `new obj.constructor` 加入 `hash`
6. 遍历对象递归（普通 `key` 和 `key` 是 `symbol` 类型的情况）
7. key 是 symbol 类型，类似 6，也是遍历递归

### 深度遍历广度遍历的区别？

对于算法来说 无非就是时间换空间 空间换时间

1. 深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大
2. 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点
3. 深度优先采用的是堆栈的形式, 即先进后出
4. 广度优先则采用的是队列的形式, 即先进先出

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
