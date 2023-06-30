import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import "swiper/css/swiper.css";  //全局 所有组件都能用上这个样式
import '@/mock/mockServer'




Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
// 创建或指定事件总线对象，保存到Vue原型对象上
  // Vue.prototype.$bus = new Vue()
new Vue({
  beforeCreate(){//越早拿到this越好
    //创建或指定事件总线对象，保存到Vue原型对象上
    Vue.prototype.$bus = this
  },

  render: h => h(App),
  router,
  store,
}).$mount('#app')
