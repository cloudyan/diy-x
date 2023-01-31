// 计算器项目
const betaCalc = {
  currentValue: 0,

  setValue(newValue) {
    this.currentValue = newValue;
    console.log(this.currentValue);
  },

  plus(addend) {
    this.setValue(this.currentValue + addend);
  },

  minus(subtrahend) {
    this.setValue(this.currentValue - subtrahend);
  }

  // 注册插件
  register(plugin) {
    const { name, exec } = plugin;
    this[name] = exec;
  }
};

// 定义插件
// 在大多数插件系统中，插件通常被分为两个部分：
//   1. 要被执行的代码
//   2. 元数据（包括名称、描述、版本号、依赖项等）
const squaredPlugin = {
  name: 'squared',
  exec: function() {
    this.setValue(this.currentValue * this.currentValue)
  }
};

// 注册插件
betaCalc.register(squaredPlugin);

// 使用计算器
betaCalc.setValue(3); // => 3
betaCalc.plus(2);     // => 5
betaCalc.squared();   // => 25
betaCalc.squared();   // => 625









// 这个系统的优点很多。该插件是一种简单的对象字面量，可以传递给我们的函数。这意味着可以通过 npm 去下载插件并将其作为 ES6 模块导入。轻松分发是非常重要的。

// 不过这个插件系统有一些缺陷。

// 通过为插件提供对 BetaCalc 的 this 的访问权限，他们可以对所有 BetaCalc 的代码进行读写访问。虽然这样对于获取和设置 currentValue 很轻松，但是也很危险。如果一个插件要重新定义一个内部函数（如 setValue），它会给 BetaCalc 和其他插件带来意想不到的后果。这违背了[开放封闭原则](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)，开放封闭原则的核心思想是软件实体是可扩展而不可修改的。

// 另外 squared 函数是通过产生副作用发挥作用的。这在 JavaScript 中很常见，但是感觉并不好，特别是当其他插件可能处在同一内部状态的情况下。我们需要一种更加实用的方法使我们的系统更安全、更可预测。
