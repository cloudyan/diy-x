# 深浅拷贝区别与实现

## 深拷贝 `deepclone`

- 判断类型，**正则**和**日期**直接返回新对象
- **空 null**或者**非对象类型**，直接返回原值
- 考虑循环引用，判断如果`hash`中含有直接返回`hash`中的值
- 新建一个相应的 `new obj.constructor` 加入 `hash`
- 遍历对象递归（普通 `key` 和 `key` 是 `symbol` 类型的情况）

```js
function deepClone(obj, hash = new WeakMap()){
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== 'object') return obj;
  // 处理循环引用的情况
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  // new 一个相应的对象
  // obj 为 Array，相当于new Array()
  // obj 为 Object，相当于new Object()
  let constr = new obj.constructor();
  hash.set(obj, constr);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key],hash)
    }
  }
  // 考虑key 是 symbol 类型的情况
  let symbolObj = Object.getOwnPropertySymbols(obj)
  for (let i = 0; i < symbolObj.length; i++) {
    if (obj.hasOwnProperty(symbolObj[i])) {
      constr[symbolObj[i]] = deepClone(obj[symbolObj[i]], hash)
    }
  }
  return constr
}

// testing
let symbol1 = Symbol(1)
const obj1 = {a: {b: 1}, c: [{d: 1}], e: null, f: undefined, [symbol1]: {a: 1}, g: symbol1};
const obj2 = deepClone(obj1);

obj1.a.b=2;
obj1.c[0].d=2;
obj1[symbol1].a=2;

console.log(obj1)
console.log(obj2)
console.log(obj1.g === obj2.g)
```

## 知识点

- MDN [`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
  - 其中的 key 必须是引用类型
  - 张鑫旭 [JS WeakMap应该什么时候使用](https://www.zhangxinxu.com/wordpress/2021/08/js-weakmap-es6/)
  - MDN [WeakRef](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
  - MDN [FinalizationRegistry](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry)
- `instanceof`

