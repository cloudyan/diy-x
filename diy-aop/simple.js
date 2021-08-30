

// 对以下流程切片优化处理
function test(str) {
  console.log('===== before ======')
  console.log(str)
  console.log('===== after ======')
}

test(1)
test(2)
test(3)


// AOP
Function.prototype.before = function (cb) {
  const self = this
  return function() {
    cb.apply(self, arguments)
    return self.apply(self, arguments)
  }
}

Function.prototype.after = function (cb) {
  const self = this
  return function() {
    const result = self.apply(self, arguments)
    cb.apply(self, arguments)
    return result
  }
}

const res = test('AOP').before(function() {
  console.log('===== before ==s====')
}).after(function() {
  console.log('===== after ======')
})()

console.log(res)
