const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  // lintOnSave: false, // 关闭ESLint的规则检查
  lintOnSave: 'warning', // 输出提示错误, 但项目继续运行
}