# Hybrid

Hybrid App（混合模式移动应用）是指介于 web-app、native-app 这两者之间的 app，兼具“Native App 良好用户交互体验的优势”和“Web App 跨平台开发的优势”。

Hybrid App 按网页语言与程序语言的混合，通常分为三种类型：多 View 混合型，单 View 混合型，Web 主体型。

- PhoneGap
- WeX5
- Kerkee
- AppCan
- APICloud
- ReactNative
- Weex

Web App、Hybrid App、Native APP 对比

|                      | Web App(网页应用) | Hybrid App(混合应用) | Native App(原生应用) |
| :------------------- | ----------------- | -------------------- | -------------------- |
| 开发成本             | 低                | 中                   | 高                   |
| 维护更新             | 简单              | 简单                 | 复杂                 |
| 体验                 | 差                | 中                   | 优                   |
| Store 或 market 认可 | 不认可            | 认可                 | 认可                 |
| 安装                 | 不需要            | 需要                 | 需要                 |
| 跨平台               | 优                | 优                   | 差                   |

## 实现方案

感谢 Marcus Westin 的开源框架 [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge/blob/master/WebViewJavascriptBridge/WebViewJavascriptBridge_JS.m)，应该是当前最流行最成功的 OC 与 Web 交互实现了。

## 原理解析

- 其他资料 https://juejin.im/entry/58e4a76a44d904006d2a7778

我们可以在 OC 中调用 javascript 方法，但是反过来不能在 javascript 中调用 OC 方法。所以 WebViewJavascriptBridge 的实现过程就是在 OC 环境和 javascript 环境各自保存一个相互调用的信息。每一个调用之间都有 id 和 callbackid 来找到两个环境对应的处理。下图是我对于每个类的讲解：

通过 WebViewJavascriptBridge.js 搭建 Native 和 JavaScript 互通消息的桥梁

::: tip 提示
这里只是 WebViewJavascriptBridge.js 的实现分析，不涉及 Native 端的相关实现。
:::
