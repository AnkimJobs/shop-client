import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Tynav from '@/components/Tynav'
import store from '@/store'



Vue.config.productionTip = false
Vue.component(Tynav.name, Tynav)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
