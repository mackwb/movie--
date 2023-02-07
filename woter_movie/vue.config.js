const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
         proxy: {
          '/maoyan': {
              target: 'https://apis.netstart.cn',
              changeOrigin: true
          }
    }
  }
})
