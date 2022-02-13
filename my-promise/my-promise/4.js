
// 续 3.js，这里处理一下错误类型处理，以及异常捕获（执行器异常，then 执行异常）
// 先手写 3.js 流程，后补充错误处理

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    // 处理执行器异常捕获
    try {
      executor(this.resolve, this.reject)
    } catch(err) {
      this.reject(err)
    }
  }

  status = PENDING;
  value = null;
  reason = null;

  onFulfilledCallback = [];
  onRejectedCallback = [];

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
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          // 处理 then 执行异常捕获
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      } else if (this.status === REJECTED) {
        onRejected(this.reason)
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }
    })
    return promise
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

// testing
// const p0 = new MyPromise((resolve, reject) => {
//   resolve('resolve')
//   reject('reject')

//   setTimeout(() => {
//     resolve('resolve')
//     reject('reject')
//   }, 2000)
// })

// 链式调用
// p0.then((res) => {
//   console.log('1', res);
//   return 'then1'
// }).then((res) => {
//   console.log('then2', res)
// })
// p0.then((res) => {
//   console.log('2', res);
//   return 'then2'
// }).then((res) => {
//   console.log('then3', res)
// })


// 处理错误

// 1. 处理 执行器错误捕获
// const p1 = new MyPromise((resolve, reject) => {
//   // new Error('执行器错误')
//   throw new Error('执行器错误')
// }).then(res => {
//   console.log('p1 success', res)
// }, err => {
//   console.log('p1 err', err.message)
// })

// 2. 处理 then 方法执行错误捕获
// const p2 = new MyPromise((resolve, reject) => {
//   // new Error('执行器错误')
//   // throw new Error('执行器错误')
//   resolve('resolve')
//   reject('reject')

//   // 这里异步时，未良好处理链式调用，可先跳过
// })

// p2.then(res => {
//   // 第一个then方法中的错误要在第二个then方法中捕获到
//   console.log('p2-1 success', res)
//   throw new Error('then 方法执行错误')
// }, err => {
//   console.log('p2-1 err', err.message)
// }).then(res => {
//   console.log('p2-2 success', res)
// }, err => {
//   console.log('p2-2 err', err.message)
// })


// 3. then 链式调用自身，导致循环调用问题
// 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
// 原生 Promise 会报类型错误
// const promise = new Promise((resolve, reject) => {
//   resolve('success')
//   reject('fail')
// })
// TypeError: Chaining cycle detected for promise #<Promise>
//  Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
// const p31 = promise.then(res => {
//   return p31
// })

// p31.then(res => {
//   console.log(res)
// }).catch(err => {
//   // Chaining cycle detected for promise #<Promise>
//   console.log(err.message)
// })

// 我们这里报
// ReferenceError: Cannot access 'p2' before initialization
// SyntaxError: Identifier 'promise' has already been declared
const promise = new MyPromise((resolve, reject) => {
  resolve('success')
  reject('fail')
})

// ReferenceError: Cannot access 'p32' before initialization
// 处理这个错误，需要创建一个异步函数去等待 其(p32) 完成初始化(可通过 queueMicrotask 实现)
const p32 = promise.then((res) => {
  console.log('2', res);
  return p32
})
p32.then(res => {
  console.log('res', res)
}, err => {
  console.log('err', err)
})


// 以上三个异常情况处理后，我们 fulfilled 分支下的流程算是处理，接下来还要把 rejected 和 pending 条件分支的逻辑都处理掉
// 参见 5.js
