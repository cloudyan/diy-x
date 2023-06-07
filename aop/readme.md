# AOP 面向切面编程

AOP (Aspect-oriented programming) 即面向切面编程，提倡针对同一类问题进行统一处理。比如性能监控代码

AOP 的核心思想是让某个模块能够重用，它采用横向抽取机制，将功能代码从业务逻辑代码中分离出来，扩展功能而不修改源代码，相比封装来说隔离得更加彻底。

AOP 基本上是通过代理机制实现的。AOP 可以基于动态代理运行时实现，也可以基于编译工具编译时实现

## AOP 使用的实际场景

- 性能统计／计数
  - Perf4J
- 事务处理
- 缓存处理
- 协议转换
- 日志打印
- 加密签名

## 思考

- 怎么设计让使用更为简单
- 多次调用内部为队列控制
- 使用后支持链式调用 如 `fn().before().after()`

参考：

- [什么是面向切面编程 AOP？](https://www.zhihu.com/question/24863332)
- [面试被问了几百遍的 IoC 和 AOP ，还在傻傻搞不清楚？](https://mp.weixin.qq.com/s/9_lUOU2tgVUf5VMZImfWJA)
- [说说这些年 AOP 使用的实际场景](https://zhuanlan.zhihu.com/p/39196982)
