# 实现 防抖`debounce` 和 节流`throttle`

节流和防抖的区别

都是 N 秒内多次执行稀释成一次，节流 throttle 保留第一次，防抖 debounce 保留最后一次。

- 节流(throttle)：保留第一次。高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率
- 防抖(debounce)：保留最后一次。触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

区别：

- 防抖动是将多次执行变为最后一次执行
- 节流是将多次执行变成每隔一段时间执行。

## 防抖`debounce`

连续触发在最后一次执行方法，场景：输入框匹配

```js
const debounce = (fn, time = 1000) => {
  let timeLock = null

  return function (...args) {
    clearTimeout(timeLock)
    timeLock = setTimeout(() => {
      fn(...args)
    }, time)
  }
}
```

## 节流`throttle`

在一定时间内只触发一次，场景：长列表滚动节流

```js
const throttle = (fn, time = 1000) => {
  let flag = true

  return function (...args) {
    if (flag) {
      flag = false
      setTimeout(() => {
        flag = true
        fn(...args)
      }, time)
    }
  }
}
```
