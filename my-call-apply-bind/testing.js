require('./apply')
require('./call')
require('./bind')

// testing
let name = '小王'
let age = 17
let obj = {
  name: '小张',
  age: this.age,
  myFun: function (from, to) {
    console.log(`${this.name} 年龄 ${this.age} 来自 ${from} 去往 ${to}`)
  },
}
let db = {
  name: '德玛',
  age: 99,
}

obj.myFun.call(null, '成都', '上海') // undefined 年龄 undefined 来自 成都 去往 上海
obj.myFun.call(db, '成都', '上海') // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.apply(db, ['成都', '上海']) // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.bind(db, '成都', '上海')() // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.bind(db, ['成都', '上海'])() // 德玛 年龄 99 来自 成都,上海 去往 undefined
console.log('\n')

// 结果
obj.myFun.myCall(null, '成都', '上海') // undefined 年龄 undefined 来自 成都 去往 上海
obj.myFun.myCall(db, '成都', '上海') // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.myApply(db, ['成都', '上海']) // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.myBind(db, '成都', '上海')() // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.myBind(db, ['成都', '上海'])() // 德玛 年龄 99 来自 成都,上海 去往 undefined

// apply 使用 arrayLike
let arrayLike = {
  0: 'tom',
  1: '65',
  2: '男',
  3: ['jane', 'john', 'Mary'],
  length: 4,
}

// 类数组转数组方法
// 下面的例子 concat.apply 说明，apply 可以接收类数组参数
console.log('\n')
console.log([].concat.apply([], arrayLike))

// 我们的 myApply 实现判断了严格的数组类型
// console.log([].concat.myApply([], arrayLike))
