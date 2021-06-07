// promise的状态枚举
const STATUS = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
}

class Promise {
  constructor(task) {
    // promise初始状态
    this.status = STATUS.PENDING;
    // resolve时返回的数据
    this.resolveData = null;
    // reject时返回的数据
    this.rejectData = null;
    // resolve和reject时执行的回调队列
    // promise的resolve和reject为异步响应时，即调用then时promise为
    // pending状态，则将传入then的函数加入该队列，等待promise resolve或
    // reject时执行该队列
    this.onFulfilledList = [];
    this.onRejectedList = [];

    /**
     * promise成功，执行onFulfilledList回调
     * @param {*} data
     */
    this.onResolve = (data) => {
      if(this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.resolveData = data;
        this.onFulfilledList.forEach(fn => {
          fn(this.resolveData)
        })
      }
    }
    /**
     * promise失败，执行onRejectedList回调
     * @param {*} err
     */
    this.onReject = (err) => {
      if(this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.rejectData = err;
        this.onRejectedList.forEach(fn => {
          fn(this.rejectData)
        })
      }
    }

    /**
     * promise解析, 根据then 返回数据类型不同封装不同的promise
     * 返回，以便实现then的链式调用及Promise的thenable特性
     * @param {*当前then return数据} data
     * @param {*当前then的resolve} resolve
     * @param {*当前then的reject} reject
     */
    this.resolvePromise = (data, resolve, reject) => {
      // then return 的数据是一个promise
      if(data instanceof Promise) {
        if(data.status === STATUS.PENDING) {
          data.then((val) => {
            this.resolvePromise(val, resolve, reject);
          }, reject)
        } else if (data.status === STATUS.FULFILLED) {
          resolve(data.resolveData)
        } else {
          reject(data.rejectData)
        }
      }
      // then return的是一个对象,若对象具有then方法，则可使用此方法作为新的then
      // Promise的thenable特性基于此
      else if(data !== null && data instanceof Object) {
        try {
          let then = data.then
          if(then instanceof Function) {
            then.call(data, (val) => {
              this.resolvePromise(val, resolve, reject);
            }, reject)
          } else {
            resolve(data)
          }
        } catch (err) {
          reject(err)
        }
      }
      // then return 的是基本数据或undefined
      else {
        resolve(data)
      }
    }

    // 执行传入的任务task
    try {
      task(this.onResolve.bind(this), this.onReject.bind(this))
    } catch (err) {
      this.onReject(err)
    }
  }

  /**
   * then回调，返回一个promise
   * 说明：传入then的参数不是函数的话，直接忽略，及在返回的新promise中直接resolve或reject目前
   * promise的数据，传入then的参数是函数的话，则直接已目前promise的数据为参数执行该函数，并
   * 根据函数返回值情况确定新promise的状态
   * @param {*成功} onFulfilled
   * @param {*失败} onRejected
   */
  then(onFulfilled, onRejected) {
    let promise;
    // pending状态下将传入then的函数加入promise对应的回调队列
    // 等待promise状态改变后执行
    if(this.status === STATUS.PENDING) {
      promise = new Promise((resolve, reject) => {
        this.onFulfilledList.push(() => {
          // 传入then的参数不是函数则忽略
          if(!(onFulfilled instanceof Function)) {
            resolve(this.resolveData)
          } else {
            let data = onFulfilled(this.resolveData)
            this.resolvePromise(data, resolve, reject)
          }
        })
        this.onRejectedList.push(() => {
          // 传入then的参数不是函数则忽略
          if(!(onRejected instanceof Function)) {
            reject(this.rejectData)
          } else {
            let data = onRejected(this.rejectData)
            this.resolvePromise(data, resolve, reject)
          }
        })
      })
    }
    // fulfilled状态下以promise的resolveData为参数执行传入then的
    // 成功回调函数，再根据此函数的返回值封装新的promise返回
    else if (this.status === STATUS.FULFILLED) {
      promise = new Promise((resolve, reject) => {
        // 传入then的参数不是函数则忽略，直接resolve
        if(!(onFulfilled instanceof Function)) {
          resolve(this.resolveData)
        } else {
          let data = onFulfilled(this.resolveData)
          this.resolvePromise(data, resolve, reject)
        }
      })
    }
    // rejected状态类似fulfilled状态
    else {
      promise = new Promise((resolve, reject) => {
        // 传入then的参数不是函数则忽略，直接reject
        if(!(onRejected instanceof Function)) {
          reject(this.rejectData)
        } else {
          let data = onRejected(this.rejectData)
          this.resolvePromise(data, resolve, reject)
        }
      })
    }

    return promise
  }

  /**
   * catch方法
   * @param {*reject函数} rejectFn
   */
  catch(rejectFn) {
    //不是函数直接返回
    if(!(rejectFn instanceof Function)) {
      return
    }

    if(this.status === STATUS.PENDING) {
      this.onRejectedList.push(() => {
        // 没有错误信息则不执行catch中的函数
        if(this.rejectData !== null) {
          rejectFn(this.rejectData)
        }
      })
    } else if (this.status = STATUS.REJECTED) {
      // 没有错误信息则不执行catch中的函数
      if(this.rejectData !== null) {
        rejectFn(this.rejectData)
      }
    }
  }

  /**
   * resolve方法，
   * value为promise直接返回返回一个以value为resolveData的完成态promise
   * @param {*} value
   */
  static resolve(value) {
    if(value instanceof Promise) {
      return value
    }
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }

  /**
   * reject方法，类似resolve方法
   * @param {*} value
   */
  static reject(value) {
    if(value instanceof Promise) {
      return value
    }
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }

  /**
   * all方法，返回一个新的promise
   * 参数为promise数组
   * 成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
   * @param {*} promiseArray
   */
  static all(promiseArray) {
    if(!(promiseArray instanceof Array)) {
      throw new TypeError("parameter must be array")
    }
    let result = []
    let i = 0
    return new Promise((resolve, reject) => {
      if(promiseArray.length === 0) {
        resolve(result)
      } else {
        promiseArray.forEach((item, index) => {
          if(item instanceof Promise) {
            item.then(res => {
              result[index] = res
              i++
              if(i === promiseArray.length) {
                resolve(result)
              }
            }, err => {
              reject(err)
            })
          }
          // 如果传入的不是promise，则直接作为结果填入结果数组中
          else {
            result[index] = item
            i++
            if(i === promiseArray.length) {
              resolve(result)
            }
          }
        })
      }
    })
  }

  /**
   * race方法，返回一个新的promise
   * 参数为promise数组
   * 返回最先执行完的promise的结果，不论resolve还是reject
   * @param {*} promiseArray
   */
  static race(promiseArray) {
    if(!(promiseArray instanceof Array)) {
      throw new TypeError("parameter must be array")
    }
    // 标识符，有一个promise执行完成设为true，返回结果
    let flag = false
    return new Promise((resolve, reject) => {
      promiseArray.forEach((item) => {
        if(item instanceof Promise) {
          item.then(res => {
            if(!flag) {
              flag = true
              resolve(res)
            }
          }, err => {
            if(!flag) {
              flag = true
              reject(err)
            }
          })
        }
        // 如果传入的不是promise，则直接作为结果
        else {
          if(!flag) {
            flag = true
            resolve(item)
          }
        }
      })
    })
  }
}

module.exports =  Promise
