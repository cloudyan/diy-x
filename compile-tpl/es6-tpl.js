// ES6 模板字符串 ${xxx}

// 1
function compileTpl(tpl, data) {
  return tpl(data)
}

const tpl = (data) =>
  `<p>My name is ${data.name}, I'm ${data.age} age, my friend is ${data.friend.name}</p>`
const data = { name: 'siri', age: 4, friend: { name: 'alice' } }
console.log(compileTpl(tpl, data))
