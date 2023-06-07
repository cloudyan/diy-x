import device from '@deepjs/device'

const noop = () => {}
const fnList = ['setShare', 'showShare', 'showOptionMenu', 'hideOptionMenu']
const bridge = {}

fnList.forEach((key) => {
  bridge[key] = noop
})

switch (device.host.name) {
  // case 'alipay':
  //   if (!device.aliapp) {
  //     Object.assign(bridge, require('./alipay'));
  //     if (env.isEnv(['prod', 'beta'])) {
  //       bridge.hideOptionMenu();
  //     }
  //   }
  //   break;
  // case 'wechat':
  //   Object.assign(bridge, require('./wechat'));
  //   break;
  case 'msf':
  case 'hsq':
  case 'iqg':
  case 'jsz':
  case 'iqgsh':
    // eslint-disable-next-line global-require
    require('./WebViewJavascriptBridge')
    // eslint-disable-next-line no-case-declarations,global-require
    const Bridge = require('./index')
    Object.assign(bridge, Bridge, window.WebViewJavascriptBridge)
    // console.log('app bridge', bridge);
    break
  default:
  // do nothing...
}

export default bridge
