// Promise 模拟实现

// promise的状态枚举
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
  constructor(fn) {
    this.status = PENDING

    this.resolveData = null
    this.rejectData = null

    this.onFulfilledList = []
    this.onRejectedList = []
  }

  then(onFulfilled, onRejected) {}
  catch() {}
  finally() {}

  static all() {}
  static race() {}
  static allSettled() {}
  static resolve() {}
  static reject() {}
  static any() {}
  static try() {}
}
