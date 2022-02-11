
// 参考学习：https://juejin.cn/post/6945319439772434469

{
// 1. 传入执行器 executor
class MyPromise1 {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    executor()
  }
}
};


{
// 2. executor 传入 resolve 和 reject 方法
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入 resolve 和 reject 方法
    executor(this.resolve, this.reject)
  }

  // resolve 和 reject 为什么要用箭头函数？
  // 如果直接调用的话，普通函数 this 指向的是 window 或者 undefined
  // 用箭头函数就可以让 this 指向当前实例对象
  // 更改成功后的状态
  resolve = () => {}
  // 更改失败后的状态
  reject = () => {}
}
};


// 3. 状态与结果的管理

// 定义三个常量表示状态
{
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise3 {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败的原因
  reason = null;

  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }

  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }
}
}


// 4. then 的简单实现
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  status = PENDING;

  value = null;

  reason = null;

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }

  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason)
    } else if (this.status === PENDING) {
      // 未处理 pending
      console.log('pending')
    }
  }
}

// 对外暴露 MyPromise 类
// export default MyPromise

// testing
const p1 = new MyPromise((resolve, reject) => {
  resolve('success')
  reject('err')
})

p1.then(value => {
  console.log('p1 resolve', value)
}, reason => {
  console.log('p1 reject', reason)
})

// 当前问题, 未处理异步逻辑，
// then 会马上执行，虽然判断了 pending 状态，但没有等待这个状态
// 接下来还需要处理一下 pending 的状态，参见 2.js
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000);
})

p2.then(value => {
  console.log('p2 resolve', value)
}, reason => {
  console.log('p2 reject', reason)
})
