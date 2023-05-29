// hooks.js
// 通过这个hook建立一个hash map，相当于一个插件注册中心。每个key代表一个类型的钩子
class Hooks {
  constructor() {
    this.hooks = new Map();
  }
  add(name, fn) {
    const hooks = this.get(name);
    hooks.add(fn);
    this.hooks.set(name, hooks);
  }
  get(name) {
    return this.hooks.get(name) || new Set();
  }
  invoke(name, ...args) {
    for (const hook of this.get(name)) {
      hook(...args);
    }
  }
  async invokePromise(name, ...args) {
    for (const hook of this.get(name)) {
      await hook(...args);
    }
  }
}

module.exports = new Hooks();
