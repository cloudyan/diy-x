// MDN [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

// 回调版本
function ajax1(url, options = {}) {
  const noop = () => {}
  const {
    method = 'get',
    success = noop,
    fail = noop,
    complete = noop,
  } = options
  // 1. 创建ajax对象
  let xhr = null
  try {
    xhr = new XMLHttpRequest()
  } catch (error) {
    // eslint-disable-next-line no-undef
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  // 2. 等待数据响应
  // 必须在调用open()方法之前指定onreadystatechange事件处理程序才能确保跨域浏览器兼容性                //问题
  // 只要readyState属性的值有变化，就会触发readystatechange事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // TODO: 这里到底该怎么设计好？
      // jQuery.ajax 以及 axios 是怎么考虑设计的，为什么?
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        try {
          // TODO:  xhr.response vs req.responeText
          const result = JSON.parse(xhr.responseText)
          success(result)
        } catch (err) {
          fail(err)
        }
      } else {
        fail('Error:' + xhr.status)
      }
    }
  }

  // 3. 调用open（默认为 true 表示异步, false 表示异步）
  xhr.open(method, url, true)

  // 4. 设置 HTTP 请求头的值。必须在 open() 之后、send() 之前调用
  // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

  // 5. 调用send
  xhr.send()
}

// promise版
function ajax2(url, options = {}) {
  const { method = 'get' } = options
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // If specified, responseType must be empty string or "text"
    xhr.responseType = 'text'

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        // if(req.status >= '200' && req.status <= 300){
        if (xhr.status === 200) {
          console.log(xhr)
          resolve(xhr.response)
        } else {
          reject(xhr)
        }
      }
    }
    xhr.open(method, url)
    xhr.send(options.data)
  })
}

// example
ajax1('https://baidu.com', {
  success(res) {
    console.log(res)
  },
  fail(err) {
    console.log(err)
  },
})

ajax2('https://baidu.com')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
