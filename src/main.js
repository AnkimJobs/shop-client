import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Tynav from '@/components/Tynav'
import store from '@/store'
import "swiper/css/swiper.css";  //全局 所有组件都能用上这个样式
import '@/mock/mockServer'




Vue.config.productionTip = false
Vue.component(Tynav.name, Tynav)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
