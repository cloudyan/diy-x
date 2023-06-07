export default class PluginError {
  name = 'error-report'

  // 映射方法、自定义事件
  events = {
    'app.onError.before': 'preOnError',
  }

  methods = {
    errReport: 'errReport',
  }

  // 用于 addPlugin
  install(ctx, options) {}

  errReport(ctx, err) {
    this.preOnError(err)
  }

  preOnError(ctx, err) {
    if (!err) return
    if (typeof err !== 'string') {
      err = JSON.stringify(err)
    }
    // request()
  }

  preAppOnShow() {}
}
