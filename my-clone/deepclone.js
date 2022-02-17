

// 递归实现深拷贝 深度优先
function deepClone(obj, hash = new WeakMap()){
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (typeof obj === 'function') return new Function('return ' + obj.toString())();
  if (obj === null || typeof obj !== 'object') return obj; // 其他基本类型，直接返回
  // 处理循环引用的情况
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  // new 一个相应的对象
  // obj 为 Array，相当于new Array()
  // obj 为 Object，相当于new Object()
  let constr = new obj.constructor(); // 为什么用这个，完成原型链的 clone
  hash.set(obj, constr);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash)
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
const obj1 = {a: {b: 1}, c: [{d: 1}], e: null, f: undefined, [symbol1]: {a: 1}, g: symbol1, h: () => {return 1}};
const obj2 = deepClone(obj1);

obj1.a.b=2;
obj1.c[0].d=2;
obj1[symbol1].a=2;

console.log(obj1)
console.log(obj2)
console.log(obj1.g === obj2.g)
console.log(obj1.h === obj2.h)
console.log(obj1.h(), obj2.h())
