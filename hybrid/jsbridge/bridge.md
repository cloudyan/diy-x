# JSBridge

- `mishifeng://native/<页面名>?query`
- `mishifeng://native/webview?url=encoded(<url>)`

## 方法

```javascript
// 调用数据格式 { title: 'xxx', success(res) {} }
// native 返回数据格式 { responseId: xx, responseData: { status: xxx, data: {} } }
// success 回调拿到的数据是 responseData 层 { status: xxx, data: {} }

// 所有调用方法最安全的做法是放到ready方法内调用
// 目前因为Bridge文件由前端注入，不必等待，可以直接调用，但是wechat JSSDK 仍要ready后

import Bridge from '@/utils/bridge';
Bridge.ready(birdge => {
  birdge.xxx();
})

bridge.showToast({
  content: 'toast 信息, 必填字段，最长15字',
  success(res) {
    console.log(res);
  },
});

// alert && confirm
// id 为必选字段
bridge.showAlert({
  title: '可选字段',
  content: '必填字段',
  // 点击后返回对应按钮的所有数据
  btns: [
    {
      id: 1,
      type: 'cancel',
      text: '取消',
    },
    {
      id: 2,
      type: 'sure',
      text: '确定',
    },
  ],
  success(res) {
    console.log(res);
  },
});

bridge.navigateTo({
  url: location.href,
  success(res) {
    console.log(res);
  },
});

bridge.redirectTo({
  url: location.href,
  success(res) {
    console.log(res);
  },
});

bridge.navigateBack({
  deep: 1,
  success(res) {
    console.log(res);
  },
});

bridge.getNativePath({
  success(res) {
    // 返回数据格式
    // {
    //   tabList: [],
    //   pathList: [],
    // }
    console.log(res);
  },
});
bridge.switchTab({
  url: location.href,
  success(res) {
    console.log(res);
  },
});

// 如需要透明, 使用 hex8 传 alpha 通道
// Android的使用 #AARRGGBB（见[文档](https://developer.android.com/guide/topics/resources/more-resources.html#Color)通过指出@gkaffka）。
// Web浏览器使用 #RRGGBBAA（有关浏览器支持，请参阅https://caniuse.com/#feat=css-rrggbbaa）。
// https://stackoverflow.com/questions/1419448/hex-representation-of-a-color-with-alpha-channel/13266076
// 在CSS 3中，引用规范，“RGBA值没有十六进制表示法” （参见[CSS Level 3规范](https://www.w3.org/TR/css-color-3/#rgba-color)）
// 在CSS 4 *中，您可以使用8位十六进制颜色的第7和第8个字符或4位十六进制颜色的第4个字符指定Alpha通道（请参阅[CSS Level 4规范](http://dev.w3.org/csswg/css-color/#hex-notation) *）
// 设置头透明 url可以传query参数 alpha=xx (0-1之间数值，代表透明度，默认1)
bridge.setNavigationBar({
  title: '这是标题',
  color: '#ff0000',
  backgroundColor: '#1d33ee44',
  success(res) {
    console.log(res);
  },
});

// 支持多个，自带监听效果，顺序从左到右，最多两个
// id 为必选字段且唯一（大于0 整型）
// text 必选，如有icon 优先显示icon
// icon 可以配置app内图片的key，如果以http开头，则加载远程图片（只支持2x方图 png格式）
// 字段传入为空，和未设置效果相同
// 如果是最后一个页面了
bridge.addNavigationBarMenu({
  left: [
    {
      id: 1,
      icon: 'back',
      text: '返回',
      color: '#ff0000',
      fontSize: '',
    },
  ],
  right: [
    {
      id: 2,
      icon: '',
      text: '保存',
      color: '#ff0000',
      fontSize: '',
    },
    {
      type: 'share',
      id: 3,
      icon: 'share',
      text: '分享',
      color: '',
      fontSize: '',
    },
  ],
  success(res) {
    if (res.data.type === 'share') {
      bridge.showShare({
        type: 1,
        title: '分享的标题',
        desc: '分享的描述信息',
        link: 'https://baidu.com',
        imgUrl:
          'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
        success(res2) {
          console.log(res2);
        },
      });
    }
    console.log(res);
  },
});

// 同时也移除了监听事件
bridge.removeNavigationBarMenu({
  ids: [1],
  success(res) {
    console.log(res);
  },
  fail() {},
  complete() {},
});

// type 控制显示样式
// 当存在 onlySelectChannel 时，只显示其设定的分享目标渠道
bridge.showShare({
  type: 1,
  url: '当前url',
  title: '分享的标题',
  desc: '分享的描述信息',
  link: 'https://baidu.com',
  imgUrl:
    'http://img02.tooopen.com/images/20160509/tooopen_sy_161967094653.jpg',
  weixin: {
    // 特定渠道定制数据，key 和分享渠道名一致
    title: '不一样的标题，覆盖通用分享数据',
  },
  weixin_timeline: {

  },
  onlySelectChannel: [
    'weixin',
    'weixin_timeline',
    'qq',
    'qzone',
    'weibo',
    'copy_link',
    'image',
  ],
});

// bridge.setShareInfo({
//   title: '',
//   desc: '',
//   link: '',
//   imgUrl: '',
// });

// 以下仅为参考:
// http://am-team.github.io/h5container/jsapi-doc.html#share-%E5%88%86%E4%BA%AB
// https://myjsapi.alipay.com/jsapi/native/start-share.html
// 当用户选择该数组内指定的分享渠道时，仅返回渠道名，而不是真正开始自动分享
// 通过 `onlySelectChannel` 屏蔽掉自动分享功能后，自行调用 `shareToChannel` 接口进行单独分享
bridge.startShare({
  onlySelectChannel: [
    'Weibo',
    'ALPContact',
    'ALPTimeLine',
    'SMS',
    'Weixin',
    'WeixinTimeLine',
    'QQ',
    'QQZone',
    'DingDing',
    // 'OpenInSafari',
    'OpenInBrowser',
    'Favorite',
  ],

  channels: {
    weibo: {},

  },
  // channels: [
  //   {
  //     name: 'Weibo',
  //     param: shareData,
  //   },
  //   {
  //     name: 'Weixin',
  //     param: shareData,
  //   },
  //   {
  //     name: 'CopyLink',
  //     param: shareData,
  //   },
  //   {
  //     name: 'ALPContact',
  //     param: shareData,
  //   },
  // ],
}, data => {
  console.log('当前用户点击的分享渠道名为：' + data.channelName);

  bridge.shareToChannel({
    name: data.channelName,
    param: shareData,
  })
});

```

```javascript
// 用于创建桥接对象的函数
function connectWebViewJavascriptBridge() {
  // 如果桥接对象已存在，则直接调用callback函数
  if (window.WebViewJavascriptBridge) {
    // callback(window.WebViewJavascriptBridge);
    onWebViewJavascriptBridgeReady();
  }
  // 否则添加一个监听器来执行callback函数
  else {
    document.addEventListener('WebViewJavascriptBridgeReady', function(event) {

      // var bridge = event.bridge;  //这个其实就是 WebViewJavascriptBridge
      // 这里的 bridge === window.WebViewJavascriptBridge
      // Start using the bridge
      // callback(window.WebViewJavascriptBridge);
    }, false)
  }
}

Bridge.ready(function(bridge) {
  bridge.hideNavigationBar({
    animation: true
  });
});


// window.webAttributes 这是什么鬼，有用么

// ready 之后，原方法把所有 method 执行了一遍，
// 参数传为空，为什么，貌似没什么用
// 这里要确认下

/*
  ready 之后立马获取地理位置 geolocationAddr
  这里不管，具体情况，使用出自己调用
**/

// 挂载后方法怎么调用，参数格式是什么样子的
bridge.share = function(obj){
  // 参数obj是个对象，其属性值可以包含五种回调方法，这些方法不会传递到 Native 中，会做过滤
  // ['success', 'fail', 'cancel', 'complete', 'trigger']
  // 其他属性值，可作为 message 传递到 Native 中，
}

//如此来调用
Bridge.ready(function(bridge){
  bridge.method({
    //此中即上面的参数数据
  })
})

```
