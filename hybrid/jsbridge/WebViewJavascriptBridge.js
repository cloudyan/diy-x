/* eslint-disable unicorn/filename-case */

// WebViewJavascriptBridge.js
// 用于和客户端 app 通信

// 此文件放在 app 中，构建 bridge(app 注入有延迟，可以直接打包到 H5 中)
// WebViewJavascriptBridge 是 Webview和 Html 交互通信的桥梁

// 参看：http://www.cocoachina.com/ios/20150629/12248.html
//      http://blog.csdn.net/mociml/article/details/47701133

// test:
// var bridge = window.WebViewJavascriptBridge;
// bridge.addMethods('getAppConfig', {}, function(){console.log(111)})
// bridge.getAppConfig({success:function(data){console.log(222)}})
// bridge._fetchQueue()

;(function (document, window) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  const WebViewJavascriptBridge = window.WebViewJavascriptBridge
  if (WebViewJavascriptBridge) return

  const version = '1.0.0'
  let sendMessageQueue = []
  let receiveMessageQueue = []
  const messageHandlers = {}
  // var messagingIframe;
  let uniqueId = 1
  const responseCallbacks = {}
  let dispatchMessagesWithTimeoutSafety = true
  // var CUSTOM_PROTOCOL_SCHEME = 'native';
  // var QUEUE_HAS_MESSAGE = '__QUEUE_MESSAGE__';

  const ua = navigator.userAgent.toLowerCase()
  const isAndroid = ua.indexOf('android') > -1
  const isIphone = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1

  // JSBridge
  window.WebViewJavascriptBridge = {
    version,
    init, // 初始化
    send, // js 发消息给 native
    registerHandler,
    callHandler,
    _fetchQueue,
    _handleMessageFromNative,
  }

  function isString(data) {
    return typeof data === 'string'
  }
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
  // function isFunction(fn) {
  //   return fn && {}.toString.call(fn) === '[object Function]';
  // }

  function disableJavscriptAlertBoxSafetyTimeout() {
    dispatchMessagesWithTimeoutSafety = false
  }

  // function _createQueueReadyIframe(doc) {
  //   messagingIframe = doc.createElement('iframe');
  //   messagingIframe.style.display = 'none';
  //   // 引用路径出问题会导致如下错误
  //   // Uncaught SyntaxError: Unexpected token <
  //   // NOTE: 短时间内连续调用N次，只会触发最后一次，所以消息数据用其他方法传递
  //   messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
  //   doc.documentElement.appendChild(messagingIframe);
  // }

  // 初始化
  function init(messageHandler) {
    const bridge = window.WebViewJavascriptBridge
    if (bridge._messageHandler) {
      throw new Error('WebViewJavascriptBridge.init called twice')
    }
    bridge._messageHandler =
      messageHandler ||
      ((data) => {
        console.log('落地函数, data:', data)
      })
    const receivedMessages = receiveMessageQueue
    receiveMessageQueue = null
    for (let i = 0; i < receivedMessages.length; i++) {
      _dispatchMessageFromNative(receivedMessages[i])
    }
  }

  function send(data, responseCallback) {
    _doSend(
      {
        data,
      },
      responseCallback,
    )
  }

  // 注册JS 方法，提供给 Native 来调用
  function registerHandler(handlerName, handler) {
    messageHandlers[handlerName] = handler
  }

  // JS 调用 Native 方法
  // 传入`handlerName`和`data`数据给Native端，JS端记录`responseCallback`
  // 在JS端，可以有多个handler，所以`callHandler`需要一个key来寻找指定方法
  function callHandler(handlerName, data, responseCallback) {
    // if (arguments.length == 2 && isFunction(data)) {
    //   responseCallback = data;
    //   data = null;
    // }
    _doSend(
      {
        handlerName,
        data,
      },
      responseCallback,
    )
  }

  // 提供给 Native 使用，用于处理从 Native 端返回的消息
  // 这个是整个 bridge 中JS端最重要的函数
  // { responseId: xx, responseData: { status: xxx, data: {} } }
  function _dispatchMessageFromNative(messageJSON) {
    if (dispatchMessagesWithTimeoutSafety) {
      setTimeout(_doDispatchMessageFromNative)
    } else {
      _doDispatchMessageFromNative()
    }
    function _doDispatchMessageFromNative() {
      const message = JSON.parse(messageJSON)
      let responseCallback

      // native call finished, now need to call js callback function
      if (message.responseId) {
        responseCallback = responseCallbacks[message.responseId]
        if (!responseCallback) return
        responseCallback(message.responseData)
        // 支持多次回调要一直有效
        // delete responseCallbacks[message.responseId];
      } else {
        // 直接发送
        if (message.callbackId) {
          const callbackResponseId = message.callbackId
          responseCallback = function (responseData) {
            _doSend({
              responseId: callbackResponseId,
              responseData,
            })
          }
        }

        let handler = window.WebViewJavascriptBridge._messageHandler
        if (message.handlerName) {
          handler = messageHandlers[message.handlerName]
        }

        // 查找指定handler
        try {
          handler && handler(message.data, responseCallback)
        } catch (exception) {
          if (typeof console !== 'undefined') {
            console.warn(
              'WebViewJavascriptBridge: WARNING: javascript handler throw.',
              message,
              exception,
            )
          }
        }
      }
    }
  }

  // 提供给native调用
  // receiveMessageQueue 在会在页面加载完后赋值为null，
  // 所以页面未加载完成，先缓存，加载完成后，直接处理
  function _handleMessageFromNative(messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON)
    } else {
      _dispatchMessageFromNative(messageJSON)
    }
  }

  // 触发native处理 sendMessage
  function _doSend(message, responseCallback) {
    // sendMessage add message, 触发native处理 sendMessage
    if (responseCallback) {
      const callbackId = 'cb_' + uniqueId++ + '_' + new Date().getTime()
      responseCallbacks[callbackId] = responseCallback
      message.callbackId = callbackId
    }
    sendMessageQueue.push(message)
    console.log(JSON.stringify(sendMessageQueue))
    _sendMessage(sendMessageQueue)
    sendMessageQueue = []
    // messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
  }

  // 向 native 发送消息，该函数作用：
  function callIphoneBridge(msg) {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.deepJsBridge &&
      window.webkit.messageHandlers.deepJsBridge.postMessage
    ) {
      return window.webkit.messageHandlers.deepJsBridge.postMessage(msg)
    } else {
      console.log('当前webview 不支持 webkit postMessage')
    }
  }
  function _sendMessage(msg) {
    if (isIphone) {
      return callIphoneBridge(msg)
    } else {
      // 如果是 Android 以及非 iPhone
      if (window.deepJsBridge && window.deepJsBridge.callNative) {
        return window.deepJsBridge.callNative(JSON.stringify(msg))
      }
    }
  }

  // 提供给 native 调用，该函数作用：
  // 获取 sendMessageQueue 返回给 native，由于android不能直接获取返回的内容，
  // 所以使用 url shouldOverrideUrlLoading 的方式返回内容
  function _fetchQueue() {
    const messageQueueString = JSON.stringify(sendMessageQueue)
    sendMessageQueue = []
    return messageQueueString
    // if (isIphone) {
    //   // android < 4.4 can't read directly the return data,
    //   // so we can reload iframe src to communicate with java
    //   return messageQueueString;
    // } else if (isAndroid) {
    //   console.log('messageQueueString');
    //   messagingIframe.src =
    //     CUSTOM_PROTOCOL_SCHEME + '://return/_fetchQueue/' + messageQueueString;
    // }
  }

  ;(function (bridge) {
    const commonArgs = ['success', 'fail', 'cancel', 'complete', 'trigger']
    const handlerCaches = {}

    bridge.addMethods = function (bridgeMethods) {
      if (isString(bridgeMethods)) bridgeMethods = [bridgeMethods]
      each(bridgeMethods, function (methodName) {
        const names = getJsAndNativeNames(methodName)
        generateMethod(names.js, names.native)
      })
    }

    bridge.addEvents = function (bridgeEvents) {
      if (isString(bridgeEvents)) bridgeEvents = [bridgeEvents]
      each(bridgeEvents, function (methodName) {
        const names = getJsAndNativeNames(methodName)
        generateEvent(names.js, names.native)
      })
    }

    function each(arr, callback) {
      if (isArray(arr)) {
        for (let i = 0, len = arr.length; i < len; i++) {
          if (callback(arr[i], i, arr) === false) break
        }
      } else {
        for (const key in arr) {
          // eslint-disable-next-line no-prototype-builtins
          if (arr.hasOwnProperty(key)) {
            if (callback(arr[key], key, arr) === false) break
          }
        }
      }
    }

    function getJsAndNativeNames(methodName) {
      let nativeMethodName = methodName
      if (isArray(methodName)) {
        nativeMethodName = methodName[1]
        methodName = methodName[0]
      }
      return {
        js: methodName,
        native: nativeMethodName,
      }
    }

    function generateMethod(jsName, nativeName) {
      bridge[jsName] = function (args) {
        console.log(`called ${nativeName}`, args)
        args = dealArgs(args || {})
        bridge.callHandler(nativeName, args.data, function (responseData) {
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

    function generateEvent(jsEventName, nativeEventName) {
      bridge['on' + getAdaptName(jsEventName)] = function (args) {
        return on(nativeEventName, args)
      }
      bridge['off' + getAdaptName(jsEventName)] = function (args) {
        return off(nativeEventName, args)
      }
    }

    function getAdaptName(name) {
      return name.charAt(0).toUpperCase() + name.substr(1)
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

    function on(eventName, args) {
      const init2 = initEvent(eventName)
      const cache = handlerCaches[eventName] || {}

      each(commonArgs, function (handlerName) {
        const typeHandler = args[handlerName]
        // 同一个监听器不要重复监听
        if (typeHandler && cache[handlerName].indexOf(typeHandler) === -1) {
          cache[handlerName].push(typeHandler)
        }
      })

      if (init2) {
        bridge.callHandler(
          'on_' + eventName,
          {},
          handlerCaches[eventName]._handler,
        )
      }

      return args
    }

    function off(eventName, args) {
      let allEmpty = true

      if (args) {
        const cache = handlerCaches[eventName] || {}

        each(commonArgs, function (handlerName) {
          const handlerCache = cache[handlerName] || []
          const handlerNeedOff = args[handlerName]
          const index = handlerCache.indexOf(handlerNeedOff)
          // 从此方法缓存中删除此 handler
          if (index !== -1) handlerCache.splice(index, 1)

          if (handlerCache.length > 0) allEmpty = false
        })
      }
      if (allEmpty) {
        delete handlerCaches[eventName]
        bridge.callHandler('off_' + eventName, {})
      }
    }

    function initEvent(eventName, force) {
      if (handlerCaches[eventName] && !force) return false
      else {
        handlerCaches[eventName] = {
          success: [],
          fail: [],
          cancel: [],
          complete: [],
          trigger: [],
          _handler: generateHandler(eventName),
        }
        return true
      }
    }

    function generateHandler(eventName) {
      return function handler(responseData) {
        if (typeof responseData === 'string')
          responseData = JSON.parse(responseData)
        const cache = handlerCaches[eventName] || {}
        const status = responseData.status
        if (status === 'success') executeHandler(cache, status, responseData)
        else if (status === 'fail') executeHandler(cache, status, responseData)
        else if (status === 'cancel')
          executeHandler(cache, status, responseData)
        executeHandler(cache, 'complete', responseData)
      }
    }

    function executeHandler(cache, handlerName, responseData) {
      const handlers = cache[handlerName]
      each(handlers, function (handler) {
        handler(responseData)
      })
    }
  })(window.WebViewJavascriptBridge)

  const doc = document
  // _createQueueReadyIframe(doc);
  const readyEvent = doc.createEvent('Events')
  readyEvent.initEvent('WebViewJavascriptBridgeReady')
  readyEvent.bridge = WebViewJavascriptBridge
  doc.dispatchEvent(readyEvent)

  registerHandler(
    '_disableJavascriptAlertBoxSafetyTimeout',
    disableJavscriptAlertBoxSafetyTimeout,
  )
})(document, window)
