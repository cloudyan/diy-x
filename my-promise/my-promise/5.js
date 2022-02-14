
// 接 4.js, 4中我们处理了 fulfilled 状态下的错误流程，下面来处理下
//  - 将 rejected 和 pending 状态的也改造下
//  - then 中的 onRejected 回调可以不传

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
    // 参数判断
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const promise = new MyPromise((resolve, reject) => {

      // 提取方法，以复用错误
      const onResolve = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }
      const onReject = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise, x, resolve, reject)
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
    return promise
  }
}

function resolvePromise(p, x, resolve, reject) {
  if (p === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}


// testing

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolve')
    reject('reject')
  }, 2000)
})

const p1 = promise.then(res => {
  console.log('1', res)
  return 'p1'
})

p1.then(res => {
  console.log('2', res)
})
