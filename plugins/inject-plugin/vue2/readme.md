# PluginVue

使用 https://vuejs.org/v2/guide/plugins.html

Vue 插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者属性。如: vue-custom-element
2. 添加全局资源：指令/过滤器/过渡等。如  vue-touch
3. 通过全局混入来添加一些组件选项。如  vue-router
4. 添加 Vue 实例方法，通过把它们添加到  Vue.prototype  上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如  vue-router

插件示例

```js
// calls `MyPlugin.install(Vue)`
Vue.use(MyPlugin, { someOption: true })

new Vue({
  //... options
})
```

MyPlugin

```js
MyPlugin.install = function (Vue, options) {
  // 1. add global method or property
  Vue.myGlobalMethod = function () {
    // some logic ...
  }

  // 2. add a global asset
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // some logic ...
    }
    ...
  })

  // 3. inject some component options
  Vue.mixin({
    created: function () {
      // some logic ...
    }
    ...
  })

  // 4. add an instance method
  Vue.prototype.$myMethod = function (methodOptions) {
    // some logic ...
  }
}
```

此方法改造后, 应用于统计组件, 按需配置

```js
// usage: tongji.js

import { PluginVue } from '@deepjs/plugin'

const tongji = new PluginVue({
  siteId: 1,
})

const fn = () => {}
const baidu = {
  pv: fn,
  uv: fn,
  event: fn,
}
tongji.use(baidu, {
  category: 'hsq',
})

export default tongji
```
