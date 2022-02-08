# diy-x

亲手实现的 x, 用来检验掌握的知识点

源自 [learn-javascript diy](https://github.com/cloudyan/learn-javascript/tree/master/diy)

此项目使用 pnpm 管理依赖

diy-x && toy-x 并无特别大的区别，不用在意

## diy-x

亲手实现一些 ployfill 或 实现原理机制，甚至框架等

- [x] 实现函数原型方法
  - [x] [`call` 的实现](./my-call-apply-bind/readme.md)
  - [x] [`apply` 的实现](./my-call-apply-bind/readme.md)
  - [x] [`bind` 的实现](./my-call-apply-bind/readme.md)
- [x] [实现 `new` 关键字](./my-new/readme.md)
- [x] [实现 `instanceof` 关键字](./my-instanceof/readme.md)
- [x] [实现 `Object.create`](./polyfill-object/create.js)
- [x] [实现 `Object.assign`](./polyfill-object/assign.js)
- [ ] 实现 `JSON.stringify`
- [ ] 实现 `JSON.parse`
- [ ] `inherit` 实现继承（es5 es6）
- [ ] 数组去重
- [ ] 数组扁平化
- [ ] 深浅拷贝区别及实现（广度优先，深度优先）
- [ ] 事件总线（发布订阅模式）
- [ ] 节流、防抖区别及实现
- [ ] 函数柯里化
- 实现数组原型方法
  - [ ] forEach
  - [ ] map
  - [ ] filter
  - [ ] some
  - [ ] reduce
- [ ] 手写 JSONP 实现
- [ ] 手写 ajax
- [ ] 亲手实现 Promise [diy-promise]
- [ ] 如何实现 空白屏侦测?
- [ ] 手写一个模板引擎/字符串模板
- [ ] 如何实现 mvvm ?
- [ ] 亲手实现 Koa
- [ ] 亲手实现 Egg
- [ ] 亲手实现 Vue [diy-vue]
- [ ] 亲手实现 React [diy-react]
- [ ] 亲手实现 umi 微框架 [diy-umi]
- [ ] 亲手实现 vite [diy-vite]
- [ ] 亲手实现一个测试框架 [diy-testing]

## x-xxx

一些问题的解决方案

- [ ] 实现图片懒加载？
- [ ] fetch-jsonp
- [ ] 解析 URL 参数为对象
- [ ] 如何实现选中复制的功能？
- [ ] 如何实现选中添加备注的功能？
- [ ] async await
- [ ] Promise.prototype.finally()
- @deepjs/uni-script
- 逆向 sourceMap


- HTTP2 头部压缩的原理是什么
- 什么是 DSL

## 扩展阅读

- 可以膜拜下大神 [Fabrice Bellard](https://bellard.org/)
