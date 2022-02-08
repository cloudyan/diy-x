
require('./apply')
require('./call')
require('./bind')


// testing
let name = '小王';
let age = 17;
let obj = {
  name:'小张',
  age: this.age,
  myFun: function (from, to){
    console.log(`${this.name} 年龄 ${this.age} 来自 ${from} 去往 ${to}`)
  }
}
let db = {
  name: '德玛',
  age: 99
}

// 结果
obj.myFun.myCall(db,'成都','上海');         // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.myApply(db,['成都','上海']);      // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.myBind(db, '成都', '上海')();     // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.myBind(db, ['成都', '上海'])();   // 德玛 年龄 99 来自 成都,上海 去往 undefined

obj.myFun.call(db,'成都','上海');         // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.apply(db,['成都','上海']);      // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.bind(db, '成都', '上海')();     // 德玛 年龄 99 来自 成都 去往 上海
obj.myFun.bind(db, ['成都', '上海'])();   // 德玛 年龄 99 来自 成都,上海 去往 undefined
