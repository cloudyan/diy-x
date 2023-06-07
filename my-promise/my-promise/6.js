// 续 5.js, 到这里核心的 Promise 功能就完成了，但还缺少静态方法 resolve、reject
// 这里添加静态方法 Promise.resolve, Promise.reject

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
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

  then(onFulfilled, onRejected) {
    // 解决 onFufilled，onRejected 没有传值的问题
    const onFulfilled1 =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    // 因为错误的值要让后面访问到，所以这里也要抛出错误，不然会在之后 then 的 resolve 中捕获
    const onRejected1 =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    const promise2 = new MyPromise((resolve, reject) => {
      const onResolve = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled1(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      const onReject = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected1(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.status === FULFILLED) {
        onResolve()
      } else if (this.status === REJECTED) {
        onReject()
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(onResolve)
        this.onRejectedCallback.push(onReject)
      }
    })
    return promise2
  }

  // 静态方法 resolve
  static resolve(parameter) {
    // 如果传入 promise 直接返回
    if (parameter instanceof MyPromise) {
      return parameter
    }
    // 转为 promise
    return new MyPromise((resolve) => {
      resolve(parameter)
    })
  }
  // 静态方法 reject
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}

function resolvePromise(p, x, resolve, reject) {
  if (p === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>'),
    )
  }

  // 此处不符合 2.3.3 规范
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

// 基本完成了
// testing
// const p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('resolve')
//   }, 2000)
// })
// const p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('reject')
//   }, 2000)
// })
// MyPromise.resolve().then(res => {
//   console.log(res)
// })
// MyPromise.resolve(p1).then(res => {
//   console.log('res', res)
// }, err => {
//   console.log('err', err)
// })
// MyPromise.resolve(p2).then(res => {
//   console.log('res', res)
// }, err => {
//   console.log('err', err)
// })

// MyPromise.reject('static reject').then(null, err => {
//   console.log(err);
// })

// 接下来我们就可以跑下 Promise A+ 单元测试了
//   npm i promises-aplus-tests -D
//   promises-aplus-tests MyPromise

// https://promisesaplus.com/

// 单测需要附加以下代码
MyPromise.deferred = function () {
  var result = {}
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = MyPromise

/*

6.js 单测从 2.3.3 用例开始报错，这里对比 Promise A+ 规范

```bash
2.3.3: Otherwise, if `x` is an object or function,
    2.3.3.1: Let `then` be `x.then`
      `x` is an object with null prototype
        1) via return from a fulfilled promise
        2) via return from a rejected promise
      `x` is an object with normal Object.prototype
        3) via return from a fulfilled promise
        4) via return from a rejected promise
      `x` is a function
        5) via return from a fulfilled promise
        6) via return from a rejected promise
    2.3.3.2: If retrieving the property `x.then` results in a thrown exception `e`, reject `promise` with `e` as the reason.
      `e` is `undefined`
        7) via return from a fulfilled promise
        8) via return from a rejected promise
      `e` is `null`
        9) via return from a fulfilled promise
        10) via return from a rejected promise
```

规划 2.3.3 中，要求判断 x.then 是否存在，与前面写的 `x instanceof MyPromise` 类似，但更严格，接下来对这块进行改造

根据这个规范要求，改造一下 resolvePromise 方法

*/
