Function.prototype.myCall = function (context, ...args) {
  const fn = Symbol()
  try {
    context[fn] = this
    return context[fn](...args)
  } catch (e) {
    // Turn primitive types into complex ones 1 -> Number, thanks to Mark Meyer for this.
    context = new context.constructor(context)
    context[fn] = this
  }
  return context[fn](...args)
}

Function.prototype.myApply = function (context, args) {
  return this.call(context, ...args)
}

Function.prototype.myBind = function (context, ...args) {
  return (...args2) => this.call(context, ...args, ...args2)
}
