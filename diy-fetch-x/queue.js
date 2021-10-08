// https://github.com/zhengjunxin/wx-queue-request

// 使用队列实现控制并发数量
// 默认并发 10
// 目前小程序貌似没有并发限制，如果发现请求相关问题的话，使用此方案处理
const checkConcurrency = (concurrency = 1) => {
  if (concurrency === null) {
    concurrency = 1;
  } else if (concurrency === 0) {
    throw new Error('Concurrency must not be zero');
  }
  return concurrency;
};

const onlyOnce = fn => (...args) => {
  /* eslint eqeqeq: 0 */
  if (fn == null) {
    throw new Error('Callback was already called');
  }
  const callFn = fn;
  fn = null;
  return callFn(...args);
};

function queue(callback, concurrency) {
  checkConcurrency(concurrency);

  // 待处理的队列
  let workers = [];
  // 正在处理的队列
  const workerList = [];

  return {
    concurrency,
    push(task, cb) {
      workers.push({
        task,
        cb,
      });
      setTimeout(() => {
        this.process();
      }, 0);
    },
    process() {
      while (this.concurrency > workerList.length && workers.length) {
        const worker = workers.shift();
        workerList.push(worker);
        callback(
          worker.task,
          onlyOnce((...args) => {
            this.pull(worker);
            if (typeof worker.callback === 'function') {
              worker.callback(...args);
            }
            this.process();
          })
        );
      }
    },
    pull(worker) {
      const index = workerList.indexOf(worker);
      if (index !== -1) {
        workerList.splice(index, 1);
      }
    },
  };
}

function queueWorker(fn, concurrency = 10) {
  if (typeof fn !== 'function') {
    throw Error('fn must be function');
  }
  const work = queue((task, callback) => task(callback), concurrency);

  return obj => {
    work.push(callback => {
      const originComplete = obj.complete;
      obj.complete = (...args) => {
        callback();
        if (typeof originComplete === 'function') {
          originComplete(...args);
        }
      };
      fn(obj);
    });
  };
}

// function queueRequest(concurrency) {
//   const request = wx.request

//   Object.defineProperty(wx, 'request', {
//     get() {
//       return queueWorker(request, concurrency)
//     }
//   })
// }

// exports.queueWorker = queueWorker;
// exports.queueRequest = queueRequest;
export default queueWorker;
