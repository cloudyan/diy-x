
// {{ xxx }}表达式 转换

export function compileTpl(tpl, data) {
  // const reg = /{{([a-zA-Z_$][a-zA-Z0-9_.]*)}}/g
  const reg = /{{\s*?([a-zA-Z_$][a-zA-Z0-9_.]*)\s*?}}/g
  // 多一个括号，replace 回调中第二个参数 key 就起作用了
  return tpl.replace(reg, (row, key, offset, string) => {
    // return data[key] || raw;

    var paths = key.split('.');
    var lookup = data;
    while (paths.length > 0){
      lookup = lookup[paths.shift()];
    }
    // 匹配中了则读取替换，否则替换为空字符串(原始匹配 row)
    // return lookup || row;
    return lookup || '';
  })
}

// testing
const tpl = `<p>My name is {{ name}}, I'm {{age}} age, my friend is {{friend.name}}</p>`
const data = {name: 'siri', age: 4, friend: {name: 'alice'}}
console.log(compileTpl(tpl, data))
