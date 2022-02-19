# diy-x

亲手实现 xxx, 用来检验掌握的知识点

源自 [learn-javascript diy](https://github.com/cloudyan/learn-javascript/tree/master/diy)

此项目使用 pnpm 管理依赖

diy-x && toy-x 并无特别大的区别，不用在意

## diy-x

亲手实现一些 ployfill 或 实现原理机制，甚至框架等

- [x] [数据类型判断](./my-is/readme.md)
- [x] 实现函数原型方法
  - [x] [`call` 的实现](./my-call-apply-bind/readme.md)
  - [x] [`apply` 的实现](./my-call-apply-bind/readme.md)
  - [x] [`bind` 的实现](./my-call-apply-bind/readme.md)
- [x] [实现 `new` 关键字](./my-new/readme.md)
- [x] [实现 `instanceof` 关键字](./my-instanceof/readme.md)
- [x] [实现 `Object.create`](./polyfill-object/create.js)
- [x] [实现 `Object.assign`](./polyfill-object/assign.js)
- [ ] JSON
  - [ ] 实现 `JSON.stringify`
  - [ ] 实现 `JSON.parse`
    - [ ] `eval` 实现
    - [ ] `new Function` 实现
- [ ] `inherit` 实现继承（es5 es6）
- [x] [深浅拷贝区别及实现](./my-clone/readme.md)
  - [x] 深度优先与广度优先的区别
  - [x] 深度优先实现
  - [ ] 广度优先实现
- [x] 防抖、节流区别及实现
  - [x] [防抖 `debounce`](./my-debounce-throttle/readme.md)
  - [x] [节流 `throttle`](./my-debounce-throttle/readme.md)
- [x] curry 函数柯里化
- [ ] 偏函数
- [ ] 数组相关
  - [ ] forEach
  - [ ] map
  - [ ] filter
  - [ ] some
  - [ ] reduce
  - [x] flat 数组扁平化
  - [x] [数组去重](./my-unique/readme.md)
    - [x] 对象数组去重
  - [x] [类数组转化为数组](./polyfill-array/array-like.js)
- [x] 切分/分割类题目
  - [x] [实现一个函数，切分数字千分位（10000 => 10,000）](./division/thousandth.js)
- [ ] 手写一个观察者模式
- [x] EventEmitter 手写事件总线（发布订阅模式） 参见 [node-modules tiny-emitter](https://github.com/cloudyan/npm-modules/blob/dev/packages/emitter/readme.md)
- [ ] 手写一个通用的事件侦听器函数
- [x] [手写 JSONP 实现](./fetch/jsonp.js)
  - [ ] 扩展 axios 支持 JSONP
- [x] [简单封装 xhr 发起 ajax 请求](./fetch/xhr.js)
- [ ] 针对 xhr 和 fetch 请求，如何实现以下诉求
  - [ ] 取消
  - [ ] 超时
  - [ ] 失败重试
  - [ ] 并发控制
- [x] 手写 Promise [my-promise](./my-promise/readme.md)
- [ ] 手写各种排序
- [x] 手写命名风格转换（小驼峰，首字符大写，帕斯卡）参见 [vue2-shared 源码分析](https://github.com/cloudyan/npm-modules/blob/dev/packages/vue2/vue2-shared.md)
- [x] 手写一个 sleep, 参见 [delay 源码分析](https://github.com/cloudyan/npm-modules/blob/dev/packages/delay/readme.md)
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
- [ ] [尾递归优化](https://juejin.cn/post/6959549674990600228)
- [ ] 生产随机数的各种方法

## x-xxx

一些问题的解决方案

- [ ] 实现图片懒加载？
- [ ] fetch-jsonp
- [ ] 解析 URL 参数为对象
- [ ] 如何实现选中复制的功能？
- [ ] 如何实现选中添加备注的功能？
- [ ] 实现 async await
- [ ] 实现 Promise.prototype.finally()
- [ ] 实现一个接口测试的框架 apitest
- [ ] 实现大文件的分包上传
- [ ] 实现大文件的分包下载
- @deepjs/uni-script
- 逆向 sourceMap


- HTTP2 头部压缩的原理是什么
- 什么是 DSL

## 参考

- https://mp.weixin.qq.com/s/oOmX4lcCy_vZfXx0KjLKOg
- https://mp.weixin.qq.com/s/7KwM6fNM5MICHiIwoRDm-w
- https://juejin.cn/post/7022795467821940773
- https://juejin.cn/post/7020562888657993741

## 扩展阅读

- 可以膜拜下大神 [Fabrice Bellard](https://bellard.org/)
