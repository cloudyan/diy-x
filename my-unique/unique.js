// 1. Set
function unique1(arr) {
  return [...new Set(arr)];
  // return Array.from(new Set(arr))
}

// 2. for + indexOf, (foreach, filter 类似)
function unique2(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) > -1) continue;
    result.push(arr[i]);
  }
  return result;
}

// 3. for...of + includes
function unique3(arr) {
  const result = [];
  for (const item of arr) {
    if (result.includes(item)) continue;
    result.push(item);
  }
  return result;
}

// 4. reduce + includes
function unique4(arr) {
  return arr.reduce(
    (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
    [],
  );
  // return arr.reduce((prev, cur) => prev.includes(cur) ? prev : prev.concat(cur), [])
  // return arr.reduce((prev, cur) => prev.indexOf(cur) > -1 ? prev : prev.concat(cur), [])
}

// 废弃方案 5. sort + for
function unique5(arr) {
  let result = [];
  let last;

  // 这里解构是为了不对原数组产生副作用
  [...arr]
    // 默认将 key 转为字符串比较，会报错
    .sort((a, b) => (a === b ? 0 : 1))
    .forEach((item) => {
      if (item != last) {
        result.push(item);
        last = item;
      }
    });
  return result;
}

// 6. 遍历 + `hasOwnProperty` 实现
function unique6(arr) {
  const obj = {};
  return arr.filter((item) => {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}

// 7. 遍历 + `Map` 实现
// map 的 key, 不能为 Object.create(null);
function unique7(arr) {
  const map = new Map(); // 改为 Map
  return arr.filter((item) => {
    return map.has(item) ? false : !!map.set(item, true);
  });
}

// testing
let name;
let symbol = Symbol(1);
let arr = [
  +0,
  -0,
  0,
  NaN,
  NaN,
  1,
  1,
  false,
  false,
  '',
  '0',
  '0',
  '1',
  'NaN',
  undefined,
  name,
  null,
  null,
  // symbol, symbol, Symbol(1), Symbol(2), Symbol(2),
  // 引用类型，不重复
  {},
  {},
  Object.create(null),
  Object.create(null),
  { city: 'shanghai' },
  { city: 'shanghai' },
];
console.log(unique1(arr));
console.log(unique2(arr));
console.log(unique3(arr));
console.log(unique4(arr));
console.log(unique5(arr));
console.log(unique6(arr));
console.log(unique7(arr));

// console.log(arr.sort((a, b) => a === b ? 0 : 1))
