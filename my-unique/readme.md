# 数组去重 `unique`

手写数组去重方法（前端应用场景中一般不会遇到数组去重，都是使用后端去重后的数据，去重仅作为考察基础知识掌握能力）

1. `Set` 实现（推荐）
2. [`for`, `for...of`, `forEach`, `filter`] + [`indexOf`, `includes`, `for`] 组合实现
3. [`reduce`] + [`indexOf`, `includes`] 实现
4. ~~`sort` + `for` 实现~~（sort 并无意义）
5. 遍历 + `hasOwnProperty` 结合缓存实现（有限制）
6. 遍历 + `Map` 缓存实现（推荐）
7. 扩展: 对象数组去重
   1. 基于某个对象属性去重
   2. 简单对象数组去重（对象为 json 数据）
   3. 基于宽松相等(内容完全相等)去重
      1. 主要考虑实现 [looseEqual](https://github.com/cloudyan/npm-modules/blob/dev/packages/vue2/vue2-shared.md)

## 1. `Set` 实现

`Set` 对象 `Set` 确保值列表的唯一性，无论是原始值或者是对象引用。

- 值的相等(`Set` 使用 `SameValueZero`比较算法来区分不同的值。不是基于 `===` 也不是 `Object.is`)
  - 对于 `Set`, `+0` 严格相等于 `-0`
    - 对于 `===`, ES2015 规范中更改为 `+0 严格相等于-0`
    - `Object.is(+0, -0)` 输出 `false`
  - `Set` 中， `NaN` 被认为是相同的, 不同于 `===`

`SameValueZero` 零值相等算法，同同值相等 `Object.is()` 方法类似，不过会认为 `+0` 与 `-0` 相等。

更多参看

- MDN [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- MDN [相等性判断](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  - ECMA-262 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero)
- ECMA-262 [Set Objects](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-set-objects)

## 2. `for` + `indexOf` 实现

通过 `for` 实现遍历，`foreach`, `filter` 类似

`indexOf()` 使用严格相等 `===` 与 Array 的元素进行比较。这个不同于 `SameValueZero` 算法。

## 3. `for...of` + `includes` 实现

`includes()` 方法使用 `sameValueZero` 算法来确定是否找到给定元素。

## 4. `reduce` + `includes` 实现

通过 `reduce` 实现遍历，写法和 `for` 区别比较大

## 5. ~~`sort` + `for` 实现~~（sort 并无意义）

该方法，是否使用 sort 并无区别，都要遍历所有。另注意 `sort` 会改变原数组，慎用

`sort()` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是先将元素转换为字符串，然后比较它们的`UTF-16`代码单元值序列时构建的

> 就地算法是一种不使用辅助数据结构来转换输入的算法。

注意：`sort()` 默认排序时，需要调用 `toString()` 方法，在 `null prototype` 场景时就会报错

自 EcmaScript 2019 起，规范 要求 Array.prototype.sort 为稳定排序。

## 6. 遍历 + `hasOwnProperty` 结合缓存实现（有限制）

此方案有限制，以下情况会异常

- 不能处理 `Object.create(null)`， 报错 `VM49:4 Uncaught TypeError: Cannot convert object to primitive value`
- 不能处理 `Symbol()`，报错 `TypeError: Cannot convert a Symbol value to a string`

大多数 Javascript 对象的`toString()`方法都继承自`Object.prototype`。但是其中一些如 `Object.create(null)`, `Symbol()` 具有 `null prototype, not havetoString()` 方法，因此 Javascript 将无法将这些对象转换为字符串原语。`and can't convert object to primitive error will rise`.

## 7. 遍历 + `Map` 实现

利用 `Map` 缓存去重

`Map` 键的相等(Key equality)是基于 sameValueZero 算法的(`NaN` 是与 `NaN` 相等的，其他的值同 `===` 运算符)

异常处理

```js
const map = new Map()

// 会报错 `Uncaught TypeError: Cannot convert object to primitive value`
map[Object.create(null)] = true

// 需改为
map.set(Object.create(null), true)
```

- MDN [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

示例

```js
// 调用 toString 会报错
Object.create(null) + ''
// 等同于
(Object.create(null)) .toString()
```

参考：https://stackoverflow.com/questions/41164750/cannot-convert-object-to-primitive-value


## 扩展

- 数组对象去重（根据特定属性值判断去重）
- `new Set()` 的时间复杂度
  - 本质是遍历一次，通过 `SameValueZero` 判断
  - `O(n)` 具有线性时间

参考：

- https://segmentfault.com/a/1190000016418021
