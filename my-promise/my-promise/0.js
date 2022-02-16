
// [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)

Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})

// 大家先思考一下


// Promise 内部到底是个什么逻辑
// 参考 Promise A+ 规范手写一版 Promise，看看能不能从实现细节中找到蛛丝马迹
