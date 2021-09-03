/*
 * jQuery插件实现机制：
 * 就是给原型添加一些功能方法。
 * */

// 沿用了1.7的版本
// jQuery 实现
(function(win) {
  // 对外暴露的工厂函数
  function jQuery() {
    return new jQuery.fn.init();
  }
  // 给原型提供一个简写方式
  jQuery.fn = jQuery.prototype = {};

  // init是jQuery中真正的构造函数
  var init = (jQuery.fn.init = function() {});

  // 替换构造函数的原型 为 jQuery工厂的原型
  init.prototype = jQuery.fn;

  // 把工厂通过两个变量暴露出去
  win.jQuery = win.$ = jQuery; //这里现在是官方标准写法
})(window);

// 避免与其它库的冲突 TODO: noConflict 的实现机制
// var custom$ = $.noConflict();


// 实现一个jQ弹出框插件
jQuery.fn.alert = function(msg) {
  alert(msg);
  return this;
};

// 测试插件
var $tip = $();
$tip.alert('弹出框插件');
