export function compileTpl(tpl, data) {
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

// testing
const tpl = `<p>My name is {{name}}, I'm {{age}} age, my friend is {{friend.name}}</p>`
const data = {name: 'siri', age: 4, friend: {name: 'alice'}}
console.log(compileTpl(tpl, data))
