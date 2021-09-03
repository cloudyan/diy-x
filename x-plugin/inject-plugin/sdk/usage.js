import PluginCore from './core'
import PluginJsError from './plugin-js-error'
import PluginResError from './plugin-res-error'

// usage:
const core = new PluginCore({
  type: '',
})
core.use(pluginJsError, {js_err_report: true})
    .use(pluginResError, {js_res_report: false})

console.log(core)
