// 上接 2.js，下面处理 then 的链式调用
// 先手写 2.js 中已实现的功能

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  status = PENDING
  value = null
  reason = null

  onFulfilledCallback = []
  onRejectedCallback = []

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason)
      }
    }
  }
  // then 链式调用，就要返回一个 Promise 对象
  // then 方法里 return 的值作为下一个 then 方法的参数，如果 return 的是一个 promise，就需要判断这个它的状态
  then(onFulfilled, onRejected) {
    const promise = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行（此时返回为 pending 状态）
      if (this.status === FULFILLED) {
        // 将成功回调的结果，传入 resolvePromise 集中处理（这里仅处理了 FULFILLED 状态的逻辑）
        const x = onFulfilled(this.value)
        resolvePromise(x, resolve, reject)
      } else if (this.status === REJECTED) {
        onRejected(this.reason)
      } else if (this.status === PENDING) {
        console.log('pending')
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }
    })
    return promise
  }
}

function resolvePromise(x, resolve, reject) {
  // 判断 x 是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 是 Promise, 则执行 x, 调用 then 方法, 目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason)) 简化如下
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

// testing
const p1 = new MyPromise((resolve, reject) => {
  // resolve('success')
  // reject('fail')

  // TODO: 这里当使用异步时，链式调用变得失效了(此问题待后续处理)
  // 可以先思考下这里为什么会导致链式调用失效
  setTimeout(() => {
    resolve('success')
    reject('fail')
  }, 2000)
})

// 链式调用
p1.then((res) => {
  console.log('1', res)
  return 'then1'
}).then((res) => {
  console.log('then2', res)
})

// 目前我们没有做异常处理，接下来在 4.js 中我们异常捕获等情况

// NOTE: 思考，这里异步为什么会导致链式调用失效

// NOTE: 解析在下方，你确定要看，不先自行思考下

// 因为 pending 时，存储的回调不具备改变当前 promise 的能力（没有 resolve，reject 的相关处理），
// 所以此时第一个 then 返回的 promise 一直是 pending 状态（不是链式调用失效了，而是一直 pending 还未调用后面的链上 then 方法）
