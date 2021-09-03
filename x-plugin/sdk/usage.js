import PluginCore from './core';

// plugin:
const pluginJsError = function(ctx, config) {
  install(ctx, config) {
    Object.assign(ctx._config, config)
  }
}
const pluginResError = {
  install(ctx, config) {
    Object.assign(ctx._config, config)
  }
}

// usage:
const core = new PluginCore({
  type: '',
})
core.use(pluginJsError, {js_err_report: true})
    .use(pluginResError, {js_res_report: false})

console.log(core);
