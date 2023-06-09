const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  lintOnSave: false, // 关闭ESLint的规则检查
  // lintOnSave: 'warning', // 输出提示错误, 但项目继续运行
  devServer: {
    proxy: {
      '/api': { // 只对请求路由以/api开头的请求进行代理转发
        target: 'http://39.98.123.211:8510', // 转发的目标url
        changeOrigin: true // 支持跨域
         // pathRewrite: {‘^/api’: ‘’}
      }
    }
  },
}

