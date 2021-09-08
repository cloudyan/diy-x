
// 回调版本
function ajax(url, options = {}) {
  const noop = () => {}
  const {
    method = 'get',
    success = noop,
    fail = noop,
    complete = noop,
  } = options
  // 1、创建ajax对象
  var xhr = null;
  try {
    xhr = new XMLHttpRequest();
  }catch(error){
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 2、等待数据响应
  // 必须在调用open()方法之前指定onreadystatechange事件处理程序才能确保跨域浏览器兼容性                //问题
  // 只要readyState属性的值有变化，就会触发readystatechange事件
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      // 判断本次下载的状态码都是多少 304表示请求的资源没有被修改
      if((xhr.status >= 200 && xhr.status<300)||xhr.status ==304){
        success(xhr.responseText);
      }else{
        fail("Error:" + xhr.status);
      }
    }
  }

  // 3、调用open
  xhr.open(method, url, true);

  // 4、 如需要，必须在send方法之前，去设置请求格式
  // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

  // 5、调用send
  xhr.send();
}


// promise版
function ajax(url, options) {
  const {
    method = 'get'
  } = options
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr);
        }
      }
    };
    xhr.open(method, url);
    xhr.send(method.data);
  });
}

// example
ajax('https://baidu.com', {
  success(res){ console.log(res) },
  fail(err) { console.log(err) },
})

ajax('https://baidu.com')
  .then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  });
