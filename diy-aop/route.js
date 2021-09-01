
// 路由切换
// 1. href

// 2. hashchange
window.addEventListener('hashchange', function() {
  // 上报【进入页面】事件
}, true)

// 3. History API
// 第一阶段：我们对原生方法进行包装，调用前执行 dispatchEvent 了一个同样的事件
function aop (type) {
  var source = window.history[type];
  return function () {
    var event = new Event(type);
    event.arguments = arguments;
    window.dispatchEvent(event);
    var rewrite = source.apply(this, arguments);
    return rewrite;
  };
}

// 第二阶段：将 pushState 和 replaceState 进行基于 AOP 思想的代码注入
window.history.pushState = aop('pushState');
window.history.replaceState = aop('replaceState'); // 更改路由，不会留下历史记录

// 第三阶段：捕获pushState 和 replaceState
window.addEventListener('pushState', function() {
  // 上报【进入页面】事件
}, true)
window.addEventListener('replaceState', function() {
  // 上报【进入页面】事件
}, true)
