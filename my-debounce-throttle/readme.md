# 实现 防抖`debounce` 和 节流`throttle`

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
  let flag = true;

  return function (...args) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
        fn(...args)
      }, time)
    }
  }
}
```
