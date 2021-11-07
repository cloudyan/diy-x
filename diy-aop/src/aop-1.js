
export default {
  before,
  after,
}

function before(fn, advice) {
  /* eslint-disable prefer-rest-params */
  return function() {
    advice.apply(this, arguments);
    return fn.apply(this, arguments);
  }
  /* eslint-enable prefer-rest-params */
}
function after(fn, advice) {
  /* eslint-disable prefer-rest-params */
  return function() {
    const result = fn.apply(this, arguments);
    return advice.apply(this, result);
  }
  /* eslint-enable prefer-rest-params */
}

// example
function test(name) {
  console.log('hello', name);
}
const t1 = before(test, (...rest) => {
  console.log('before', ...rest);
})

t1('张三')

