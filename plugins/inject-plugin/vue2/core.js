
// 类 vue 的插件机制
export class PluginVue {
  constructor(config = {}) {
    this.config = { ...config };
  }

  use(plugin, config = {}) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) return this;

    const opts = { ...this.config, ...config };
    if (typeof plugin.install === 'function') {
      plugin.install.call(plugin, this, opts);
    } else if (typeof plugin === 'function') {
      plugin.call(null, this, opts);
    }
    installedPlugins.push(plugin);
    return this;
  }
}
