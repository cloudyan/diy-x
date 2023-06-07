# fetch 相关

- 手写 xhr 请求封装

## 扩展

### xhr 中的 response 和 responseText 区别

xhr（XMLHttpRequest），这个对象，代表着 http 协议规范在客户端 js 中的实现

http 规范，直白点说，就是 http 请求中的数据传输规范还有其他一些标准。无论是什么语言，什么地方的 http 实现，本质上，都是 tcp 之上的满足 http 规范的数据传输。

在 web 前端，一次 http 请求，对应着一个 xhr 实例（基本的面向对象概念）。

这个 xhr 实例上，就可以取到 http 协议中规定的各种协议属性。本质上，所有的请求响应报文的主体，都是二进制的数据，我们传输的文本内容，也是编码好的二进制数据。

http 规范中规定了一个 Content-type 头，用来指明数据主体的格式，来告诉收发的两端将二进制的数据主体按照什么类型进行解析。而这两个接口（response 和 responseText），其实只是提供了一些便捷的接口，配合 responseType，方便用户获取到解析好的响应，省去手动解析响应主体的步骤。

如果你想详细理解的话，其实你需要去了解下数据传输时候的编码和解码。不同 mime type 的数据，传输时候的编码方式是不同的。

普通的文本（text/plain），就是编码好的字串，这两个接口上都可以直接读取。

json（application/json）,传输时候，其实是序列化后的 json 字串，传输时候是按照字串传输的。前端接收到的时候，其实可以直接在 responseText 上，按照字符串解析成一个 json 字串，然后手动 JSON.parse。也可以手动指定 responseType，直接在 response 上获取解析好的 json 对象。

document（text/html），如果指定好了 responseType, responseText 可以获取到 html 文本，response 却可以获取到解析好的 DOM 对象。

对于其他数据，比如媒体类型（视频，音频），普通二进制流，如果你去 responseText 获取，那肯定就是乱码了，因为这种二进制肯定没法按照 DOMString 解析。但是你却可以指定好 responseType 为 blob，在 response 上获取到 Blob 对象，然后再通过对应的工具进行处理解析。

总之啊，初级的理解这俩区别，那就是按照文档说的，让你啥时候用啥就用啥。如果你想理解下底层的本质，你需要去了解 http 协议规范，和数据编码。

参考：

- https://github.com/pfan123/Articles/issues/68
- [xhr 中的 response 和 responseText 区别](https://segmentfault.com/q/1010000018898974)
  - MDN [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
