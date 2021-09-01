import { Emitter } from './index'

const emitter = new Emitter()

emitter.on('some-event', function (arg1, arg2, arg3) {
  //
});

emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
