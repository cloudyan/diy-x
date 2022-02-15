
// 续 6.js, 处理 resolvePromise 方法中对于规范 2.3.3 ~ 2.3.4 的实施 https://promisesaplus.com/

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
}

function resolvePromise(p, x, resolve, reject) {
  if (p === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  // 按规范 2.3.3 ~ 2.3.4 对以下逻辑进行处理
  // if (x instanceof MyPromise) {
  //   x.then(resolve, reject)
  // } else {
  //   resolve(x)
  // }

  // 修改如下
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) return resolve(x)

    let then
    try {
      then = x.then
    } catch(err) {
      // 如果取 x.then 的值时抛出错误 err，则以 err 为据因拒绝 promise
      return reject(err)
    }

    // 如果 then 是函数(应该作为函数，这也是 thenable 的条件)
    if (typeof then === 'function') {
      let called = false
      try {
        // then 只能被调用一次，状态变更后不可再调用
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
      // 如果 then 不是函数，则以 x 为参数执行 premise
      resolve(x)
    }
  } else {
    // 如果 then 不是对象或函数，则以 x 为参数执行 premise
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

// 完成后，可以通过整个 Promise A+ 的单元测试了
