// bridge

// 方法 api 可以参看 worktile 文档介绍
// 使用可以参看 bridge-readme.md
// 底层支持参看 WebViewJavascriptBridge.js.txt

// import device from '@/utils/device';

let isBridgeReady = false;
let inited;
const fnListCaches = [];
// const isInApp = device.msf || device.hsq || device.iqg;
const isInApp = true;

function isFunction(fn) {
  return fn && {}.toString.call(fn) === '[object Function]';
}

var bridgeMethods = [
  // common
  'getAppConfig',
  'getNativePath',
  // account
  'login',
  'logout',
  'getUserInfo',
  // system
  'getSystemInfo',
  'getLocationInfo',
  // 跳转
  'navigateTo',
  'redirectTo',
  'navigateBack',
  'switchTab',
  // 交互
  'showToast',
  'showAlert',
  'showLoading',
  'hideLoading',
  'scanCode', // 调起扫码
  // 下拉刷新
  'enableRefresh', // 开启
  'disableRefresh', // 禁用
  'stopRefresh', // 停止
  // header 头
  'setNavigationBar',
  'addNavigationBarMenu',
  'removeNavigationBarMenu',
  // 分享
  'showShare',
  // 'setShareInfo',
];

var bridgeEvents = [
  'shake', // demo: onShake offShake
  'back',
  'pageShow',
  'pageHide',
  // ['refresh', 'pullRefresh'],
  'pullRefresh',
  // 'cityChange',
  // 'geoChange',
  // 'addressChange',
  'locationChanged',
  'loginStatusChanged', // 登录状态监听
];

function runJsBridgeFn(bridge) {
  for (var i = 0, len = fnListCaches.length; i < len; i++) {
    fnListCaches[i](bridge);
  }
}

var Bridge = {
  _init(bridge) {
    if (inited || !isInApp || !bridge) return;

    if (isFunction(bridge.init)) {
      inited = true;
      bridge.init();

      // 这里挂载所有方法/事件，到 bridge 对象上
      bridge.addMethods(bridgeMethods);
      bridge.addEvents(bridgeEvents);

      // Object.assign(bridge, window.webAttributes);

      // 把 ready 中缓存执行了
      runJsBridgeFn(bridge);
    } else {
      console.warn('WebViewJavascriptBridge 的初始化 init 未成功');
    }
  },
  ready(callback) {
    if (!isInApp || !isFunction(callback)) return;

    if (!isBridgeReady) {
      fnListCaches.push(callback);
    } else {
      callback(window.WebViewJavascriptBridge);
    }
  },
  scanQRCode() {
    const bridge = window.WebViewJavascriptBridge;
    return new Promise((resolve, reject) => {
      if (!isBridgeReady || !bridge) {
        reject({ errno: 10002, msg: 'init 未成功' });
      }
      bridge.scanCode({
        success(res) {
          const { data = {} } = res;
          const resultStr = data.resultStr || '';
          //
          let [code, tempArray] = ['', []];
          if (resultStr.indexOf('http://') >= 0) {
            tempArray = resultStr.split('?');
            code = tempArray[1];
          } else if (resultStr.indexOf(',') >= 0) {
            tempArray = resultStr.split(',');
            code = tempArray[1];
          } else {
            code = resultStr;
          }
          resolve({ code: code });
        },
        fail(err) {
          reject(err);
        },
      });
      //
    });
  },
};

// 用于创建桥接对象的函数
function connectWebViewJavascriptBridge() {
  if (window.WebViewJavascriptBridge) {
    onWebViewJavascriptBridgeReady();
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      onWebViewJavascriptBridgeReady,
      false
    );
  }
}

function onWebViewJavascriptBridgeReady() {
  isBridgeReady = true;
  console.log('JSBridge ready');
  Bridge._init(window.WebViewJavascriptBridge);
}

if (isInApp) {
  // 页面加载后，立刻调用创建桥接对象的函数
  connectWebViewJavascriptBridge();
}

export default Bridge;
