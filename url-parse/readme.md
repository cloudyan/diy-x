# 接续 URL Params 为对象

```js
// 正则表达式解析 url

var parse_url =
  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/

var a1 = `http://nodejs.cn/api/url.html#url_url_strings_and_url_objects`
var a2 = `https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash`

console.log(a1.match(parse_url))
// 1、捕获型分组：(...)
// 2、非捕获型分组：(?: .....)
// 3、向前正向匹配：(?=........)
// 4、向前负向匹配：(?!.........)
```

第一个分组

整个正则因子是匹配一个协议名：`http`

1. `^`表示字符串的开始
2. `(?: )`表示一个非捕获型分组：即在这个括号内的，但是不在其子括号内所匹配到的字符将不放入结果数组中。
3. `()`表示一个捕获型分组，此括号内所匹配到的字符放入结果数组中对应 url 中的: `http字符`
4. `[]`为正则表达式类，表示符合中括号内任一一个字符。
5. `A-Za-z`表示字母 A 到字母 Z，字母 a 到字母 z。`[A-Za-z]`表示符合字母 A 到字母 Z，字母 a 到字母 z 的任一一个字符
6. `+`表示匹配 1 次货多次
7. `?`表示此组为可选匹配条件

第二个正则因子：

- `(\/{0,3})`://
  捕获型分组，\/表示一个应该被匹配的/，`{0,3}`表示\将被匹配 0 次或者 1 到 3 次之间
- `([0-9.\-A-Za-z]+)`:qiji123.kerlai.net
  捕获型分组，由一个或多个数字 ，“.”，”\-“(转义成”-“)，字母 A 到 Z 和字母 a 到 z 组成
- `(?::(\d+))?`：81
  前置：放在非捕获型分组中将不会出现在返回数组中，\d 表示匹配数字。整个因子就是匹配前置为：后面跟随一个或多个数字。此分组因子为可选的
- `(?:\/([^?#]*))?`：GoodsBasic/Operate/12678
  该分组由/开始，^在此处表示非的意思，即除?#之外的所有字符 最后一个？表示此正则因子分组可选
- `(?:\?([^#]*))?` ：q
  该分组表示包含 0 个或多个非#字符
- `(?:#(.*))?`：simen
  该分组以#开始，(.)将匹配除结束符以外的所有字符。
- $表示这个字符串结束。

```js
/**
 * http://nodejs.cn/api/url.html#url_url_strings_and_url_objects
 *
 * http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┴──────────┴──────────┴─────────────────────┤          │                │       │
│                       origin                            │ pathname │     search     │ hash  │
├─────────────────────────────────────────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

 */

// const url = require('url');

// export const URL = url.URL;
```

## 练习题

实现一个函数解析 URL Params 为对象

```js
let url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
const result = parseParam(url)
console.log(result)
/* 结果
{
  user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京',      // 中文需解码
  enabled: true,    // 未指定值得 key 约定为 true
}
*/

// 实现

function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1] // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&') // 将字符串以 & 分割后存到数组中
  let paramsObj = {}
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split('=') // 分割 key 和 value
      val = decodeURIComponent(val) // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val)
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true
    }
  })

  return paramsObj
}
```
