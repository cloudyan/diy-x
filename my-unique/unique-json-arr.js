
// JSON 对象数组去重(只做第一层级)
// 1. 遍历
// 2. 转为 JSON 字符串(需要先按 key 排序)
// 3. 判断是否已缓存，是则直接跳过，否则就 push 到新数组里

function uniqueJsonArr(arr) {
  const cache = {}

  const result = []
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i]
    current = sortObj(current) // 补充排序操作
    const jsonStr = JSON.stringify(current)
    if (cache[jsonStr]) continue
    cache[jsonStr] = true
    result.push(arr[i])
  }
  return result
}


// testing
const jsonArr = [
  { name: 'red', age: 25 },
  { age: 25, name: 'red' },
  { name: 'green', age: 27 },
  { name: 'green', age: 27 },
  { name: 'blue', age: 28 },
  { name: 'blue', age: 28, phone: '123' },
]
console.log(uniqueJsonArr(jsonArr))


// 对象按 key 排序
function sortObj(obj) {
  const keys = Object.keys(obj).sort()
  const result = {}

  while (keys.length) {
    const key = keys.pop()
    result[key] = obj[key]
  }
  return result
}
