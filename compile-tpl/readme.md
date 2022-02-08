# 自定义实现一个模板引擎

```js
// 1
function compileTpl(tpl, data) {
  return tpl(data)
}

const tpl = (data) => `<p>${data.name}</p>`
const data = {name: 'siri'}
compileTpl(tpl, data);
```

```js
function compileTpl(tpl, data) {
  const reg = /{{([a-zA-Z_$][a-zA-Z0-9_.]*)}}/g
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
compileTpl(tpl, data);
```

参考：

- [手写一个简单模板引擎总结](https://www.jianshu.com/p/c192cc7f3c0f)
- [前端手写方法系列之模板引擎](https://juejin.cn/post/6885974740519878664)
