
function pollingRequest(promiseAjax, interval) {
  const cacheQueue = []
  let polling = true
  let timerId;
  let times = 1
  function abortRequest() {
    cacheQueue.forEach(item => {
      if (typeof item.abort === 'function') {
        item.abort()
      }
    })
  }
  function creatRequest(resolve, reject) {
    const requestId = promiseAjax().then(
      res => {
        if (polling) {
          polling = false
          resolve(res)
        }
        clearInterval(timerId)
        abortRequest()
      },
      err => {
        console.log(err)
      }
    )
    cacheQueue.push(requestId)
  }
  return new Promise((resolve, reject) => {
    creatRequest(resolve, reject)
    timerId = setInterval(() => {
      times++
      polling && creatRequest(resolve, reject)
      console.log(times)
    }, interval)
  })
}

function randomRange(under, over) {
  switch(arguments.length) {
    case 1: return parseInt(Math.random()*under+1);
    case 2: return parseInt(Math.random()*(over-under+1) + under);
    default: return 0;
  }
}

function mockFetch() {
  const delay = randomRange(1, 9);
  console.log('send request')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({data: 'success'})
    }, delay*1000)
  })
}

pollingRequest(mockFetch, 1000).then(
  res => {
    console.log(res)
  },
  err => {

  }
)

