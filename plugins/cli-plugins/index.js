#!/usr/bin/env node

// [【第 1 期】插件系统的设计](https://zhuanlan.zhihu.com/p/106183037)
const fs = require('fs');
const hookBus = require('./hooks');

function onCreate() {
  console.log('onCreate');
  hookBus.invoke('onCreate', {a: 1,b: 2}); // 这里增加了主生命周期钩子的注册,可以将主流程中的上下文变量传过去
}
async function onStart() {
  console.log('onStart');
  await hookBus.invokePromise('onStart', {a: 3, b: 4}); // 这里是一个主生命周期异步钩子的注册
}
// 这个方法传给plugin，提供给插件来调用钩子
function hook(name, fn) {
  hookBus.add(name, fn);
}

function loadPlugin() {
  fs.readdirSync(__dirname)
    .filter(item => /^plugin/.test(item))
    .forEach(file =>
      require(require.resolve(`${__dirname}/${file}`)).apply(hook) // 这里统一向钩子暴露了apply方法，作为插件主入口
    );
}

function main() {
  loadPlugin();
  onCreate();
  onStart();
}

main();
