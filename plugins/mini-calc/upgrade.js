// 计算器项目
const betaCalc = {
  currentValue: 0,

  setValue(value) {
    this.currentValue = value
    console.log(this.currentValue)
  },

  core: {
    plus: (currentVal, addend) => currentVal + addend,
    minus: (currentVal, subtrahend) => currentVal - subtrahend,
  },

  plugins: {},

  press(buttonName, newVal) {
    const func = this.core[buttonName] || this.plugins[buttonName]
    this.setValue(func(this.currentValue, newVal))
  },

  register(plugin) {
    const { name, exec } = plugin
    this.plugins[name] = exec
  },
}

// 我们的插件
const squaredPlugin = {
  name: 'squared',
  exec: function (currentValue) {
    return currentValue * currentValue
  },
}

betaCalc.register(squaredPlugin)

// 使用计算器
betaCalc.setValue(3) // => 3
betaCalc.press('plus', 2) // => 5
betaCalc.press('squared') // => 25
betaCalc.press('squared') // => 625

// 优化点
// 1. 把插件与计算器“核心”方法分开，做法是将其放入它自己的插件对象中。将我们的插件存储在一个 plugin 对象中可以使系统更加安全。现在此插件访问 this 时看不到 BetaCalc 的属性，只能得到 betaCalc.plugins 属性。
// 2. 我们实现了一个 press 方法，该方法按名称查找功能对应的函数，然后调用。现在，当我们调用插件的exec 函数时，会把计算器当前的值（currentValue）传给它，并得到新的值。

// 从本质上来说，新增加的 press 方法把所有的计算器功能都转换为了纯函数（pure functions），它们返回结果只依赖其参数，并且在执行过程中没有副作用。这样做有很多好处：
// - 简化了API。
// - 简化了测试（对于 BetaCalc 和插件本身）。
// - 它减少了系统的依赖性，也就是实现了松耦合。

// 这种新的架构与第一个例子相比受到了更多的限制，但是效果很好。实际上，我们为插件的作者设置了防护边界，限制他们只能做我们允许的事。

// 不过它可能过于严格了，现在我们的计算器插件只能对 currentValue 进行操作。如果插件的作者想要添加一些高级的功能，例如“暂存结果”或跟踪历史记录的功能，就无能为力了。

// 从另外一个角度来看，也许没什么关系。因为你赋予插件作者的力量是一种微妙的平衡。给他们开放过多的功能由可能会影响项目的稳定性，但是反过来，给他们的功能过少会也使他们很难解决自己的问题，如果这样的话你还不如没有插件。
