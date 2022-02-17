# fetch 相关

- 手写 xhr 请求封装


## 扩展

### xhr中的 response 和responseText 区别

xhr（XMLHttpRequest），这个对象，代表着http协议规范在客户端js中的实现

http规范，直白点说，就是http请求中的数据传输规范还有其他一些标准。无论是什么语言，什么地方的http实现，本质上，都是tcp之上的满足http规范的数据传输。

在web前端，一次http请求，对应着一个xhr实例（基本的面向对象概念）。

这个xhr实例上，就可以取到http协议中规定的各种协议属性。本质上，所有的请求响应报文的主体，都是二进制的数据，我们传输的文本内容，也是编码好的二进制数据。

http规范中规定了一个Content-type头，用来指明数据主体的格式，来告诉收发的两端将二进制的数据主体按照什么类型进行解析。而这两个接口（response和responseText），其实只是提供了一些便捷的接口，配合responseType，方便用户获取到解析好的响应，省去手动解析响应主体的步骤。

如果你想详细理解的话，其实你需要去了解下数据传输时候的编码和解码。不同mime type的数据，传输时候的编码方式是不同的。

普通的文本（text/plain），就是编码好的字串，这两个接口上都可以直接读取。

json（application/json）,传输时候，其实是序列化后的json字串，传输时候是按照字串传输的。前端接收到的时候，其实可以直接在responseText上，按照字符串解析成一个json字串，然后手动JSON.parse。也可以手动指定responseType，直接在response上获取解析好的json对象。

document（text/html），如果指定好了responseType, responseText可以获取到html文本，response却可以获取到解析好的DOM对象。

对于其他数据，比如媒体类型（视频，音频），普通二进制流，如果你去responseText获取，那肯定就是乱码了，因为这种二进制肯定没法按照DOMString解析。但是你却可以指定好responseType为blob，在response上获取到Blob对象，然后再通过对应的工具进行处理解析。

总之啊，初级的理解这俩区别，那就是按照文档说的，让你啥时候用啥就用啥。如果你想理解下底层的本质，你需要去了解http协议规范，和数据编码。

参考：

- https://github.com/pfan123/Articles/issues/68
- [xhr中的 response 和responseText 区别](https://segmentfault.com/q/1010000018898974)
  - MDN [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
