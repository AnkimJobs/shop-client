// 表单验证插件的配置文件
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文message  

Vue.use(VeeValidate)

// 提示文本本地化
// 更改某些验证规则的提示信息



VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`  // 修改内置规则的message
  },
  attributes: { // 给校验的field属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password:'密码',
    password2:'确认密码',
    isChecked:'阅读协议'
  }
})
VeeValidate.Validator.extend('agree', {
    validate: value => {
      return value
    },
    getMessage: field => field + '必须同意'
  })