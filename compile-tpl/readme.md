# 自定义实现一个模板引擎

## ES6 模板字符串 ${xxx}

```js
// 1
function compileTpl(tpl, data) {
  return tpl(data)
}

const tpl = (data) => `<p>My name is ${data.name}, I'm ${data.age} age, my friend is ${data.friend.name}</p>`
const data = {name: 'siri', age: 4, friend: {name: 'alice'}}
console.log(compileTpl(tpl, data))
```

## {{ xxx }}表达式 转换

```js
function compileTpl(tpl, data) {
  const reg = /{{([a-zA-Z_$][a-zA-Z0-9_.]*)}}/g
  // 多一个括号，replace 回调中第二个参数 key 就起作用了
  return tpl.replace(reg, (row, key, offset, string) => {
    // return data[key] || raw;

    var paths = key.split('.');
    var lookup = data;
    while (paths.length > 0){
      lookup = lookup[paths.shift()];
    }
    return lookup || raw;
  })
}

const tpl = `<p>My name is {{name}}, I'm {{age}} age, my friend is {{friend.name}}</p>`
const data = {name: 'siri', age: 4, friend: {name: 'alice'}}
console.log(compileTpl(tpl, data))
```

## 测试用例

## 知识点

- `replace()`

参考：

- [手写一个简单模板引擎总结](https://www.jianshu.com/p/c192cc7f3c0f)
- [前端手写方法系列之模板引擎](https://juejin.cn/post/6885974740519878664)
