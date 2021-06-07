# Promise

Promise A+ 规范

- 官方英文地址：https://promisesaplus.com/
- 中文翻译可参考 http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/

- Promise 的含义
- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.prototype.finally()
- Promise.all()
- Promise.race()
- Promise.allSettled()
- Promise.any()
- Promise.resolve()
- Promise.reject()
- Promise.try()

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果

## 模拟实现

```js
class MyPromise {
  constructor() {

  }

  then() {}
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
```

关于 macrotask 和 microtask 两个概念

- macro-task: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering
- micro-task: process.nextTick, Promises（这里指浏览器实现的原生 Promise）, Object.observe, MutationObserver

详见 [stackoverflow](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context) 解答

```js
const promise = new Promise((resolve, reject) => {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

sleep(1000).then(res => {
  console.log(res, 'hello')
})
```

Promise 新建后就会立即执行

```js
let promise = new Promise((resolve, reject) => {
  let i = 1;
  resolve(i); // 调用.then()中的方法
  i++;
  reject(i);  // 调用.catch()中的方法，不能与.then()一起执行
})

promise
  .then(num => {
    console.log('then1:', num)
    return 'r1'
  })
  .then(num => {
    console.log('then2:', num)
    return 'r2'
  })
  .catch(num => {
    console.log('catch:', num)
  })
  .finally(res => {  // 不论执行.then还是.catch，finally都会执行
    console.log('finally', res)
  })
  // .then(res => {
  //   console.log(111)
  //   return 222
  // })
```

- finally 后面还可以写 then 调用吗
- then catch finally 中回调函数的参数都从哪里来
- 执行时序什么样，如果中途出错呢
- 什么情况是 `Promise 会吃掉错误`

关于执行顺序

```js
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

new Promise((resolve) => {
  console.log(3);
  resolve(Date.now());
}).then(() => {
  console.log(4);
});

console.log(5);

setTimeout(() => {
  new Promise((resolve) => {
    console.log(6);
    resolve(Date.now());
  }).then(() => {
    console.log(7);
  });
}, 0);
```

不是微任务会在宏任务之前进行，而是每次执行完一个宏任务后，js进程都会检查微任务队列中是否存在微任务，若存在微任务则将所有的微任务都执行完毕后，才开始下一个的宏任务。

每个单独的事件循环机制是这样：

[宏任务->微任务->requestAnimation->UI操作]

这一套循环执行完毕后，再去获取下一个宏任务，再按照上面的顺序执行。关于js的事件循环机制，你可以看下这篇文章： [前端中的事件循环eventloop机制](https://www.xiabingbao.com/post/javascript/js-eventloop.html)

参考：

- https://www.zhihu.com/question/36273908?sort=created
