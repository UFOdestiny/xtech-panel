const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: "dist",
  devServer: {
    hot: true,
    open: true,
    host: 'localhost',
    port: 8081,
  }
})
