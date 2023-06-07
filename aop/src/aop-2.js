/* eslint-disable prefer-rest-params,no-multi-assign */

// source: https://github.com/notejs/aop
function aspect(type) {
  return function (target, methodName, advice) {
    const exist = target[methodName]
    let dispatcher

    if (!exist || exist.target !== target) {
      dispatcher = target[methodName] = function () {
        // before methods
        const beforeArr = dispatcher.before
        let args = arguments
        for (let l = beforeArr.length; l--; ) {
          args = beforeArr[l].advice.apply(this, args) || args
        }
        // target method
        let rs = dispatcher.method.apply(this, args)
        // after methods
        const afterArr = dispatcher.after
        for (let i = 0, ii = afterArr.length; i < ii; i++) {
          rs = afterArr[i].advice.call(this, rs, args) || rs
        }
        // return object
        return rs
      }

      dispatcher.before = []
      dispatcher.after = []

      if (exist) {
        dispatcher.method = exist
      }
      dispatcher.target = target
    }

    const aspectArr = (dispatcher || exist)[type]
    const obj = {
      advice,
      _index: aspectArr.length,
      remove() {
        aspectArr.splice(this._index, 1)
      },
    }
    aspectArr.push(obj)

    return obj
  }
}

const aop = {
  before: aspect('before'),
  after: aspect('after'),
}

export default aop
