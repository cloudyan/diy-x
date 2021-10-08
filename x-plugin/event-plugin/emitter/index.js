// https://github.com/scottcorgan/tiny-emitter

// Keep this empty so it's easier to inherit from
// (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)

// subscribers
// subscribe()
// unsubscribe()：取消订阅。从 subscribers 数组中删除订阅者；
// publish()

// usage example
// import Emitter from '@xmini/shard-utils';
// const emitter = new Emitter();
//
// emitter.on('some-event', function(arg1, arg2, arg3) {
//    //
// });
//
// emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');

export class Emitter {
  on(name, callback, context) {
    const self = this;
    if (Array.isArray(name)) {
      for (let i = 0, l = name.length; i < l; i++) {
        self.on(name[i], callback, context);
      }
    } else {
      const e = this._events || (this._events = {});
      (e[name] || (e[name] = [])).push({
        fn: callback,
        context,
      });
    }

    return this;
  }

  once(name, callback, context) {
    const self = this;
    function on() {
      self.off(name, on);
      callback.apply(context, arguments);
    }

    on._ = callback;
    return this.on(name, on, context);
  }

  // name, value, context
  emit(name) {
    const data = [].slice.call(arguments, 1);
    const evtArr = ((this._events || (this._events = {}))[name] || []).slice();
    let i = 0;
    const len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].context, data);
    }

    return this;
  }

  off(name, callback) {
    const self = this;
    const e = this._events || (this._events = {});
    // all
    if (!arguments.length) {
      self._events = Object.create(null);
      return self;
    }
    // array of events
    if (Array.isArray(name)) {
      for (let i = 0, l = name.length; i < l; i++) {
        self.off(e[i], callback);
      }
      return self;
    }
    // specific event
    const cbs = e[name];
    if (!cbs) return self;
    if (!callback) {
      e[name] = null; // delete e[name];
      return self;
    }
    // specific handler
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === callback || cb._ === callback) {
        cbs.splice(i, 1);
        break;
      }
    }
    return self;
  }
}

// off(name, callback) {
//   const e = this.e || (this.e = {});
//   const evts = e[name];
//   const liveEvents = [];

//   if (evts && callback) {
//     for (let i = 0, len = evts.length; i < len; i++) {
//       if (evts[i].fn !== callback && evts[i].fn._ !== callback) {
//         liveEvents.push(evts[i]);
//       }
//     }
//   }

// 对这个问题有疑问，会导致内存泄漏？
//   // Remove event from queue to prevent memory leak
//   // Suggested by https://github.com/lazd
//   // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

//   liveEvents.length ? (e[name] = liveEvents) : delete e[name];

//   return this;
// }
