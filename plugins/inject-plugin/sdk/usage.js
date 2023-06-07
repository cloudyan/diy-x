import PluginCore from './core'
import PluginJsError from './plugin-js-error'
import PluginResError from './plugin-res-error'

// usage:
const core = new PluginCore({
  type: '',
})
core
  .use(PluginJsError, { js_err_report: true })
  .use(PluginResError, { js_res_report: false })

console.log(core)
