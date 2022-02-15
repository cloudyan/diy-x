
// 现在 7.js 所有单测都通过了，但是还缺少一些方法
// catch
// finally ES2018
// all
// race
// allSettled ES2020
// any ES2021
// try 提案阶段

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch(err) {
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
      while(this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      while(this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const onFulfilled1 = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    const onRejected1 = typeof onRejected === 'function' ? onRejected : (reason) => {throw reason}

    const promise2 = new MyPromise((resolve, reject) => {
      const onResolve = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled1(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }
      const onReject = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected1(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(err) {
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
  // 只对 reject 做处理
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  // ES2018
  finally(fn) {
    return this.then(value => {
      return MyPromise.resolve(fn()).then(() => value)
    }, err => {
      return MyPromise.resolve(fn()).then(() => { throw err })
    })
  }

  static resolve(parameter) {
    if (parameter instanceof MyPromise) {
      return parameter
    }
    return new MyPromise(resolve => {
      resolve(parameter)
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  // 1. 传入空的可迭代对象 返回已完成 resolved
  // 2. 传入的参数不包含 promise，返回异步完成 resolved
  // 3. 所有都都成功或任何一个失败，就变为 resolved 或 reject
  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      const result = []
      const length = promiseList.length
      let count = 0;

      if (length === 0) {
        return resolve(result)
      }

      promiseList.forEach((promise, index) => {
        MyPromise.resolve(promise).then(value => {
          count++
          result[index] = value
          if (count === length) {
            resolve[result]
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }
  // 1. 传入空的可迭代对象，则返回的 promise 将永远等待
  // 2. 返回第一个结果值（无论 resolved 或 rejected）
  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      const length = promiseList.length

      // TODO:
      if (length === 0) {
        return
        // return resolve()
      }
      for (let i = 0; i < length; i++) {
        MyPromise.resolve(promiseList[i]).then(value => {
          return resolve(value)
        }, reason => {
          return reject(reason)
        })
      }
    })
  }
  // 所有都完成（无论是resolved 或 rejected）才返回结果（包含每个 promise 的结果和状态）
  static allSettled(promiseList) {
    return new MyPromise((resolve, reject) => {
      const result = []
      const length = promiseList.length
      let count = 0;

      if (length === 0) {
        return resolve(result)
      }

      for (let i = 0; i < length; i++) {
        const currentPromise = MyPromise.resolve(promiseList[i])
        currentPromise.then(value => {
          count++
          result[i] = {
            status: FULFILLED,
            value,
          }
          if (count === length) return resolve(result)
        }, reason => {
          count++
          result[i] = {
            status: REJECTED,
            value,
          }
          if (count === length) return resolve(result)
        })
      }
    })
  }
  // 这个方法和Promise.all()是相反的。
  // 1. 传入空的可迭代对象 返回已失败 rejected
  // 2. 传入的参数不包含 promise，返回异步完成 resolved
  // 3. 任何一个成功或所有都失败，返回 resolved 或 reject
  //
  // https://github.com/es-shims/Promise.any/blob/main/implementation.js
  static any(values) {
    return new MyPromise((resolve, reject) => {
      let hasResolved = false
      let promiseLikes = []
      let iterableCount = 0
      let rejectionReasons = []

      function resolveOnce(value) {
        if (!hasResolved) {
          hasResolved = true
          resolve(value)
        }
      }

      function rejectionCheck(reason) {
        // TODO: 这样不能保证结果的顺序
        rejectionReasons.push(reason)
        if (rejectionReasons.length >= iterableCount) reject(rejectionReasons)
      }

      for (let value of values) {
        iterableCount++
        promiseLikes.push(value)
      }

      for (let promiseLike of promiseLikes) {
        if (promiseLike.then !== undefined || promiseLike.catch !== undefined) {
          promiseLike
            .then(result => resolveOnce(result))
            .catch(err => {})
          promiseLike.catch(reason => rejectionCheck(reason))
        } else {
          resolveOnce(promiseLike)
        }
      }
    })
  }
  // Promise.try 让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API
  // https://es6.ruanyifeng.com/#docs/promise#Promise-try
  // https://github.com/tc39/proposal-promise-try/blob/main/polyfill.js
  static try(func) {
    return new MyPromise((resolve, reject) {
      resolve(func());
    })
  }
}

function resolvePromise(p, x, resolve, reject) {
  if (p === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  // 按规范 2.3.3 ~ 2.3.4 对以下逻辑进行处理
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) return resolve(x)

    let then
    try {
      then = x.then
    } catch(err) {
      return reject(err)
    }

    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(p, y, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch(err) {
        if (called) return
        reject(err)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

// 单测需要附加以下代码
MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = MyPromise;
