import './WebViewJavascriptBridge';

// 使用可以参看 bridge.md
// 底层支持参看 WebViewJavascriptBridge.js

const noop = () => {};

let inited;
let bridgeReady;
const fnListCaches = [];

export default class Bridge {
  constructor({
    methods = [],
    events = [],
    // ready = noop,
    // init = noop,
  }) {
    this.methods = methods;
    this.methods = events;
    this._nativeFnList = [];

    const that = this;

    function onWebViewJavascriptBridgeReady() {
      that.init(window.WebViewJavascriptBridge);
    }

    if (window.WebViewJavascriptBridge) {
      onWebViewJavascriptBridgeReady();
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        onWebViewJavascriptBridgeReady,
        false,
      );
    }
  }

  init(bridge) {
    if (!this.isInApp && this.bridgeReady) return;
    this.bridgeReady = true;
    // if (window.deepJsBridgeInited) return;
    // window.deepJsBridgeInited = true;

    if (isFunction(bridge.init)) {
      bridge.init();

      // 这里挂载所有方法/事件，到 bridge 对象上
      bridge.addMethods(this.methods);
      bridge.addEvents(this.events);

      // 直接执行 xxx
      const that = this;
      if (isFunction(bridge.getNativeFnList)) {
        bridge.getNativeFnList({
          success(res) {
            const { data = [] } = res;
            that._nativeFnList = data;
          },
        });
      }
      // Object.assign(bridge, window.webAttributes);

      // 把 ready 中缓存执行了
      runJsBridgeFn(bridge);
    } else {
      console.warn('WebViewJavascriptBridge 的初始化 init 未成功');
    }
  }

  ready(callback) {
    if (!this.isInApp || !isFunction(callback)) return;

    if (!this.bridgeReady) {
      fnListCaches.push(callback);
    } else {
      callback(window.WebViewJavascriptBridge);
    }
  }

  canIUse(fnName) {
    return this._nativeFnList.indexOf[fnName] > -1;
  }
}

function isFunction(fn) {
  return fn && {}.toString.call(fn) === '[object Function]';
}

function runJsBridgeFn(bridge) {
  for (let i = 0, len = fnListCaches.length; i < len; i++) {
    fnListCaches[i](bridge);
  }
}

// 用于创建桥接对象的函数
// function connectWebViewJavascriptBridge() {
//   if (window.WebViewJavascriptBridge) {
//     onWebViewJavascriptBridgeReady();
//   } else {
//     document.addEventListener(
//       'WebViewJavascriptBridgeReady',
//       onWebViewJavascriptBridgeReady,
//       false
//     );
//   }
// }

// function onWebViewJavascriptBridgeReady() {
//   bridgeReady = true;
//   console.log('JSBridge ready');
//   Bridge._init(window.WebViewJavascriptBridge);
// }
