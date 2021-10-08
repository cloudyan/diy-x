
export default {
  before,
  after,
}

function before(fn, advice) {
  return function() {
    advice.apply(this, arguments);
    return fn.apply(this, arguments);
  }
}
function after(fn, advice) {
  return function() {
    const result = fn.apply(this, arguments);
    return advice.apply(this, result);
  }
}

// example
function test(name) {
  console.log('hello', name);
}
const t1 = before(test, (...rest) => {
  console.log('before', ...rest);
})

t1('张三')

