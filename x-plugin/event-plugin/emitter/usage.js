import { Emitter } from './index'

const emitter = new Emitter()

// 按顺序
emitter.on('some-event', function (arg1, arg2, arg3) {
  //
});

emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');


// 例如小程序
emitter.on('app.onError.before', (err) => {
  console.log(err)
})

// AOP 改写小程序 options
App(rewrite(options))

function rewrite(options) {
  Object.keys(options).forEach(key => {
    const oldFn = options[key];
    const t = 'app'; // app/page
    const k = key;
    emitter.emit(`${t}.${k}.before`, opts, this);
    const result = oldFn.call(this, opts);
    emitter.emit(`${t}.${k}.after`, opts, this);
    return result;
  })
  return options
}
