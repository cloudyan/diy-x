# 插件系统设计

很多库、工具实现都能见到插件化的影子，我们结合实例深入了解下

插件分类

- event-plugin
- inject-plugin

常见的插件化开发实现

- [jQuery](https://learn.jquery.com/plugins/basic-plugin-creation/)
- Webpack
- Babel
- Eslint
- Postcss
- [Vue2](https://vuejs.org/v2/guide/plugins.html)
- [Vue3](https://v3.vuejs.org/guide/plugins.html)
- koa
- Egg
- Rollup
- [Gatsby](https://www.gatsbyjs.com/docs/creating-plugins/)
- Vite
- Umi 微内核
- vscode
- SpringBoot

究其本质，插件化大致分为以下几类

- 约定/注入插件化
- 事件插件化 √

小考验：常见的插件化实现属于上面哪一类？

我们这里整理一些常见的实现，以供参考使用，还有一些考虑点

- 稳定性：插件隔离
- 性能：插件激活，插件都是懒加载的，实现上是插件注册特定激活事件

参考：


其他：

- TODO: https://github.com/unjs/unplugin
- https://css-tricks.com/designing-a-javascript-plugin-system/
  - 译文 https://segmentfault.com/a/1190000030697262
- [【第 1 期】插件系统的设计](https://zhuanlan.zhihu.com/p/106183037)
- [插件化思维](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/53.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%8F%92%E4%BB%B6%E5%8C%96%E6%80%9D%E7%BB%B4%E3%80%8B.md)
- [从0到1编写插件系统](https://www.zhihu.com/column/c_1255589339138379776)
- [大型 Web 应用插件化架构探索](https://zhuanlan.zhihu.com/p/357724347)
- [插件式可扩展架构设计心得](https://zhuanlan.zhihu.com/p/372381276)
- [库、插件、组件、控件、扩展](https://www.zhihu.com/question/49536781/answer/117606933)
- https://blog.csdn.net/wocaonima123987/article/details/8501813

1. 主程序如果希望自身的功能可以被扩展，其需要：
   1. 提供一组服务 (Service Interface)。其提供（约束）了插件对主体能力可控制的边界。服务定义的越精细，插件控制的粒度越小，能力越大，但耦合度和复杂度也越高。
   2. 定义一种扩展契约 (Plug-In Interface)，其描述了插件应该如何设计以便于主程序发现。并通过插件管理模块 (Plug-In Manager) 来发现、维护插件。
2. 插件通过实现主程序规定的扩展契约（通常是一个接口），标明自己的身份，并接收来自主程序的事件响应。通过调动主程序提供的服务，实现和主程序的交互。这一过程，通常都是被主程序以 SDK (Software Development Kit) 的形式封装。
