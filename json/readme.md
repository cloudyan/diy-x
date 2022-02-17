# JSON

**JSON** 对象包含两个方法: 用于解析 JavaScript Object Notation  (JSON) 的 `parse()` 方法，以及将对象/值转换为 JSON字符串的 `stringify()` 方法。除了这两个方法, JSON这个对象本身并没有其他作用，也不能被调用或者作为构造函数调用。

**JSON** 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 `null` 。它基于 JavaScript 语法，但与之不同：**JavaScript不是JSON，JSON也不是JavaScript**。

JSON：并不是JavaScript 的子集。[JavaScript 与 JSON 的区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON#description)

详细参见

- MDN [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- MDN [`JSON.stringify`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- MDN [`JSON.parse`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

## `JSON.stringify(value[, replacer [, space]])`

JSON 序列化

该方法将一个 `JavaScript` 对象或值转换为 `JSON` 字符串，如果指定了一个 `replacer` 函数，则可以选择性地替换值，或者指定的 `replacer` 是数组，则可选择性地仅包含数组指定的属性。

- 异常
  - 当在循环引用时会抛出异常 `TypeError` ("cyclic object value")（循环对象值）
  - 当尝试去转换 `BigInt` 类型的值会抛出`TypeError` ("BigInt value can't be serialized in JSON")（`BigInt`值不能`JSON`序列化）、
- 处理规则
  - 转换值如果有 `toJSON()` 方法，该方法定义什么值将被序列化。
  - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
  - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
  - `undefined`、任意的**函数**以及 `symbol` 值，在序列化过程中会被**忽略**（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。**函数**、`undefined` 被单独转换时，会返回 `undefined`，如 `JSON.stringify(function(){})` or `JSON.stringify(undefined)`
  - 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
  - 所有以 `symbol` 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
  - `Date` 日期调用了 `toJSON()` 将其转换为了 `string` 字符串（同`Date.toISOString()`），因此会被当做字符串处理(格式如 `2022-02-17T05:46:30.441Z`)。
  - `NaN` 和 `Infinity`, `-Infinity` 格式的数值及 `null` 都会被当做 `null`。
  - 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，**仅会序列化可枚举的属性**（不可枚举的属性默认会被忽略）。

```js
const noop = () => {}
const obj = {
  null: null,
  undefined: undefined, // 忽略, 在数组中会转为 null
  symbol: Symbol(),     // 忽略, 在数组中会转为 null
  fn_1: noop,           // 忽略, 在数组中会转为 null
  nan: NaN,             // 转为 null
  num_1: 0,
  num_2: -0,            // 转为 0
  num_3: Infinity,      // 转为 null
  num_4: -Infinity,     // 转为 null
  date: new Date('2022-02-17T08:53:59.659Z'), // 转为字符串 2022-02-17T08:53:59.659Z
  bool_1: true,
  bool_2: false,
  // 值在数组中
  arr_2: [NaN, 0, -0, Infinity, new Date('2022-02-17T08:53:59.659Z')],
  arr_1: [undefined, Symbol(), noop],   // 作为属性会忽略，在数组中会转为 null
}

// key 为 Symbol 也会忽略

console.log(JSON.stringify(noop))         // 函数       单独转换时，会返回 undefined
console.log(JSON.stringify(undefined))    // undefined 单独转换时，会返回 undefined
console.log(JSON.stringify(obj, null, 2))
```

参见手写实现 JSON.stringify，加深理解

## `JSON.parse(text[, reviver])`

该方法用来解析`JSON`字符串，构造由字符串描述的`JavaScript`值或对象。提供可选的 `reviver` 函数用以在返回之前对所得到的对象执行变换(操作)。

如果指定了 `reviver` 函数，则解析出的 `JavaScript` 值（解析值）会经过一次转换后才将被最终返回（返回值）。

- 异常
  - 若传入的字符串不符合 `JSON` 规范，则会抛出 `SyntaxError` 异常。
  - `JSON.parse()` 不允许用逗号作为结尾

```js
const jsonStr = '{}'

console.log(JSON.parse(jsonStr))
```

手写实现 JSON.parse

- 使用 eval 实现
- 使用 new Function 实现

参考

- 深拷贝系列 ———— [自己实现一个JSON.stringify和JSON.parse](https://juejin.cn/post/6844904001801027592)
- [JSON 之父 Douglas Crockford 写的 ployfill](https://github.com/douglascrockford/JSON-js)，里面提供了三种实现方式
  - 推荐：上文解析 [JSON.parse 三种实现方式](https://juejin.cn/post/6844903568919527432)
- [关于模板引擎的工作方式和性能？](https://www.zhihu.com/question/28466557/answer/241364553)
