
// {{ xxx }}表达式 转换

export function compileTpl(template, data) {
  // const reg = /{{([a-zA-Z_$][a-zA-Z0-9_.]*)}}/g
  const reg = /{{\s*?([a-zA-Z_$][a-zA-Z0-9_.]*)\s*?}}/g
  // 多一个括号，replace 回调中第二个参数 key 就起作用了
  return template.replace(reg, (row, key, offset, string) => {
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


// 使用 exec
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/   // 模板字符串正则
  if (reg.test(template)) {     // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]  // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name])  // 将第一个模板字符串渲染
    return render(template, data)       // 递归的渲染并返回渲染后的结构
  }
  return template   // 如果模板没有模板字符串直接返回
}
