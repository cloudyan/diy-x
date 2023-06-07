// 提供一种通信方案
// 默认通信为直接通信，可选消息模式通信
// 通过在 bridge 上注册方法等来增强自身的能力，支持注册方法、调用方法
// plugin 的公有方法通过在 bridge 上注册来暴露方法，通过唯一的 key 来记录对应的方法
// plugin 调用非自身的功能方法，也通过 bridge 得调用方法来间接调用

const objProto = Object.prototype
const owns = objProto.hasOwnProperty
const toString = objProto.toString

function isString(v) {
  return toString.call(v) === '[object String]'
}
function isFunction(v) {
  const isAlert = typeof window !== 'undefined' && v === window.alert
  if (isAlert) {
    return true
  }
  const str = toString.call(v)
  return (
    str === '[object Function]' ||
    str === '[object GeneratorFunction]' ||
    str === '[object AsyncFunction]'
  )
}

let uniqueId = 1
const commonArgs = ['success', 'fail', 'cancel', 'complete', 'trigger']

function each() {}

function getMapNames(methodName) {
  let pluginMethodName = methodName
  if (Array.isArray(methodName)) {
    pluginMethodName = methodName[1]
    methodName = methodName[0]
  }
  return {
    callName: methodName,
    realName: pluginMethodName,
  }
}

// 处理参数，参数为对象格式
function dealArgs(args) {
  const data = {}
  each(args, function (arg, key) {
    // 不是 commonArgs 中列出的方法，是要给 Native 传递的 message
    // 先将其转存到 data 上
    if (commonArgs.indexOf(key) === -1) {
      data[key] = args[key]
      delete args[key]
    }
  })
  // 最后将 data 对象挂载到参数的 data，用于传递 message
  args.data = data
  return args
}

export default class Bridge {
  constructor(config = {}) {
    this._config = config
    const _sendMessageQueue = []
    this._sendMessageQueue = _sendMessageQueue
    this._messageHandlers = {}
    this._responseCallbacks = {}
    this._uniqueId = 1
    // this._doSend = (message, responseCallback) => {
    //   if (responseCallback) {
    //     const callbackId =
    //       'cb_' + this._uniqueId++ + '_' + new Date().getTime();
    //     this._responseCallbacks[callbackId] = responseCallback;
    //     message.callbackId = callbackId;
    //   }
    //   _sendMessageQueue.push(message);
    // };
  }

  // 注册方法，通过此方法注册公开方法，提供给外部(native/other)来使用
  registerHandler(handlerName, handler) {
    const { _messageHandlers } = this
    if (_messageHandlers[handlerName]) {
      console.error(`${handlerName} 已经被注册，请改用其他名称注册`)
    } else {
      _messageHandlers[handlerName] = handler
    }
    return this
  }

  // 调度中心，所有公开的功能方法，通过此方法来调用
  // 传入 `handlerName`和`data`，bridge 记录 `responseCallback`
  // 在 bridge 上，可以有多个 handler，所以 `callHandler` 需要一个key来寻找指定方法
  callHandler(handlerName, data, responseCallback) {
    // if (arguments.length == 2 && isFunction(data)) {
    //   responseCallback = data;
    //   data = null;
    // }
    this._doSend(
      {
        handlerName,
        data,
      },
      responseCallback,
    )
  }

  _doSend(message, responseCallback) {
    const { _sendMessageQueue } = this
    if (responseCallback) {
      const callbackId = 'cb_' + uniqueId++ + '_' + new Date().getTime()
      this._responseCallbacks[callbackId] = responseCallback
      message.callbackId = callbackId
    }
    _sendMessageQueue.push(message)

    this.postMessage(_sendMessageQueue)

    this._sendMessageQueue = []
  }

  postMessage(messageQueue) {
    // 可自定义实现消息传递
    // 默认为直接调用
    const message = JSON.parse(JSON.stringify(messageQueue))
    message.forEach((item) => {
      const { handlerName, data, callbackId } = item
      const { _messageHandlers, _responseCallbacks } = this
      if (
        !_messageHandlers[handlerName] &&
        !isFunction(_messageHandlers[handlerName])
      ) {
        console.error(`${handlerName} 方法不存在`)
      } else {
        const result = _messageHandlers[handlerName](data)
        if (callbackId && _responseCallbacks[callbackId]) {
          _responseCallbacks[callbackId](result)
        }
      }
    })
  }

  // 向外暴露的工具方法，批量注册方法以及事件
  addMethods(pluginMethods, plugin) {
    if (isString(pluginMethods)) pluginMethods = [pluginMethods]
    each(pluginMethods, (methodName) => {
      const names = getMapNames(methodName)
      this._generateMethod(names.callName, names.realName, plugin)
    })
  }

  // addEvents(pluginEvents) {
  //   if (isString(pluginEvents)) pluginEvents = [pluginEvents];
  //   each(pluginEvents, function(methodName) {
  //     const names = getMapNames(methodName);
  //     generateEvent(names.callName, names.realName);
  //   });
  // }

  _generateMethod(callName, realName, plugin) {
    this.registerHandler(callName, function (...rest) {
      return plugin[realName](...rest)
    })
    this[callName] = (args) => {
      console.log(`called ${realName}`, args)
      args = dealArgs(args || {})
      this.callHandler(realName, args.data, (responseData) => {
        if (isString(responseData)) {
          responseData = JSON.parse(responseData)
        }
        const status = responseData.status
        if (status === 'success') {
          args.success && args.success(responseData)
        } else if (status === 'fail') {
          args.fail && args.fail(responseData)
        } else if (status === 'cancel') {
          args.cancel && args.cancel(responseData)
        }
        args.complete && args.complete(responseData)
      })
    }
  }
}
