# 生产随机数的各种方法

- 指定一个区间范围，随机生成其中的一个整数
- 实现数组的随机排序？

```js
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// testing
const times = {}
const result = Array(1000)
  .fill(null)
  .map(() => {
    const num = getRandom(0, 9)
    if (!times[num]) {
      times[num] = 1
    } else {
      times[num]++
    }
    return getRandom(0, 9)
  })
// console.log(result)
console.log(times)

// 统计个数
```
