
import { PluginVue } from '../index'


// 使用
const tongji = new PluginVue({
  siteId: 1,
})

const fn = () => {}

// 插件示例, 以下是两种形式
// plugin 1
const baidu = {
  install() {},
  pv: fn,
  uv: fn,
  event: fn,
}

// plugin 2
const piwik = {
  pv: fn,
  uv: fn,
  event: fn,
}

tongji
  .use(baidu, {
    category: 'hsq',
  })
  .use(piwik, {
    category: 'hsq',
  })

export default tongji
