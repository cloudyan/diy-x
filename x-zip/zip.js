/* eslint-disable guard-for-in */
// 将外部依赖打成 zip 包

const download = require('download')
const { SourceCode } = require('eslint')
const { ready } = require('jquery')
const pkg = require('./package.json')

const { kylinApp } = pkg
const { plugins } = kylinApp

// console.log(plugins)

function getResource(plugins) {
  for(let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i]
    if (plugin && plugin[0]) {
      if (plugin[0] === 'resource') return plugin[1].map
    }
  }
}

const sources = getResource(plugins)

// console.log(sources)

function getSourceInfo(sources) {
  const res = []
  for (const key in sources) {
    res.push(sources[key].js)
  }
  return res;
}

const resArr = getSourceInfo(sources)

console.log(resArr)

Promise.all(resArr.map(url => {
  const dir = url.replace(/^https?:\/\//, '').split('/')
  dir.pop()
  return download(url, `./dist/${dir.join('/')}`)
}));

// (async () => {
//   // await download('http://unicorn.com/foo.jpg', 'dist');

//   // fs.writeFileSync('dist/foo.jpg', await download('http://unicorn.com/foo.jpg'));

//   // for (let i = resArr.length-1; i>=0; i--) {
//   //   download(resArr[i]).pipe(fs.createWriteStream(`dist/${i}`));
//   // }

//   // download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));

//   await
// })();
