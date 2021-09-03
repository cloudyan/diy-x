// plugin:
export default const pluginJsError = {
  install(ctx, config) {
    Object.assign(ctx._config, config)
  }
}
