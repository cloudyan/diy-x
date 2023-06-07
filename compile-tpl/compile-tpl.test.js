// 使用 jest 测试

import { compileTpl } from './compile-tpl'

describe('模板编译', () => {
  it('{{}} 表达式', () => {
    const tpl = `<div>{{ name }}</div>`
    const data = { name: 'jack' }
    const output = compileTpl(tpl, data)
    expect(output).toBe(`<div>jack</div>`)
  })

  it('{{}} toUpperCase 表达式', () => {
    const tpl = '<div>{{ name.toUpperCase() }}</div>'
    const data = { name: 'jack' }
    const output = compileTpl(tpl, data)
    expect(output).toBe(`<div>JACK</div>`)
  })

  it('{{}} +连接', () => {
    const tpl = `<div>{{ '[' + name + ']' }}</div>`
    const data = { name: 'jack' }
    const output = compileTpl(tpl, data)
    expect(output).toBe(`<div>[jack]</div>`)
  })

  it('forEach 遍历', () => {
    const tpl = `{%arr.forEach(item => {%}
  <li>{{item}}</li>
{%})%}`
    const data = {
      arr: ['aaa', 'bbb'],
    }
    const output = compileTpl(tpl, data)
    expect(output).toBe(
      `
  <li>aaa</li>
  <li>bbb</li>
`,
    )
  })

  it('if 表达式', () => {
    const tpl = `{% if(isShow) { %} <div>{{ name }}</div> {% } %}`
    const data = { isShow: true, name: 'jack' }
    const output = compileTpl(tpl, data)
    expect(output).toBe(`<div>jack</div>`)
  })
})
