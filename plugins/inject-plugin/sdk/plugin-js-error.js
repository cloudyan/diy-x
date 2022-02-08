// plugin:
const pluginJsError = {
  install(ctx, config) {
    Object.assign(ctx._config, config)
  },
}

export default pluginJsError
