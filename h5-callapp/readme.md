# H5 唤起 APP 指南

- 推荐: [H5 唤起 APP 指南](https://suanmei.github.io/2018/08/23/h5_call_app/)
- 微信内唤起 APP/小程序

上文总结的很好，我们这里汇总整理下，另补充下示例，以及微信内相关场景

- mata apple-itunes-app
- 唤醒 app 弹窗点拒绝后， 弹框提示'Safari 浏览器打不开该网页，因为网址无效。'的问题

参考文档：

- [H5 唤起 APP 指南](https://suanmei.github.io/2018/08/23/h5_call_app/)
- apple [Support Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)
  - 跨域问题
  - IOS 9.2 以后，必须要触发跨域才能支持 Universal Link 唤端。
  - IOS 那边有这样一个判断，如果你要打开的 Universal Link 和 当前页面是同一域名，ios 尊重用户最可能的意图，直接打开链接所对应的页面。如果不在同一域名下，则在你的 APP 中打开链接，也就是执行具体的唤端操作。
  - 原文：When a user is browsing your website in Safari and they tap a universal link to a URL in the same domain as the current webpage, iOS respects the user’s most likely intent and opens the link in Safari. If the user taps a universal link to a URL in a different domain, iOS opens the link in your app.
