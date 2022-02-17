
// 接 1.js 接下来处理 pending 状态
// 先将 1.js 的实现手写迁移过来

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

  // 存储成功或失败的回调函数
  onFulfilledCallback = [];
  onRejectedCallback = [];

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value

      // 状态变更为成功，调用所有成功的回调
      while (this.onFulfilledCallback.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift 不是纯函数，取出后会改变数组，直到数组为空
        // 这里清空了数组，实际并不必要，for 循环也是也可以的
        // 思考 如果执行的过程出错了，怎么办
        this.onFulfilledCallback.shift()(value)
      }
    }
  }
  reject = (value) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason

      // 状态变更为失败，调用所有失败的回调
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason)
      }
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilledCallback(this.value)
    } else if (this.status === REJECTED) {
      onRejectedCallback(this.reason)
    } else if (this.status === PENDING) {
      // 不知道后续的状态变化，先将回调存储起来，
      // 等到状态变更时调用
      this.onFulfilledCallback.push(onFulfilled)
      this.onRejectedCallback.push(onRejected)
    }
  }
}


// testing pending
const p1 = new MyPromise((resolve, reject) => {
  // resolve('success')

  setTimeout(() => {
    resolve('success')
    reject('fail')
  }, 2000);
})

p1.then(value => {
  console.log('0')
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})


// 回调存储使用数组，支持 then 方法多次调用
p1.then(value => {
  console.log('1')
  console.log('resolve1', value)
}, reason => {
  console.log('reject1', reason)
})
p1.then(value => {
  console.log('2')
  console.log('resolve2', value)
}, reason => {
  console.log('reject2', reason)
})

// 此时还不支持 then 的链式调用，参见 3.js
