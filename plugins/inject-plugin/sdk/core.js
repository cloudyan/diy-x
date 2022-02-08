
const defaultConfig = {
  name: 'XPlugin',
}

const isFn = fn => typeof fn === 'function'

class PluginCore {
  constructor(config) {
    this._config = {}
    this._plugins = {}

    this.init(config)
  }

  init(config) {
    this._config = { ...defaultConfig, ...config }
  }

  use(plugin, config = {}) {
    const pluginKey = plugin.name
    if (!pluginKey) {
      throw new Error('plugin.name 必须存在')
    }
    if (this._plugins[pluginKey]) return this

    if (isFn(plugin.install)) {
      plugin.install(this, config)
    } else if (isFn(plugin)) {
      plugin(this, config)
    }
    this._plugins[pluginKey] = plugin
    return this
  }
}
