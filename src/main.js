import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import "swiper/css/swiper.css";  //全局 所有组件都能用上这个样式
import '@/mock/mockServer'
import MyPagination from '@/components/MyPagination'
import '@/plugins/element' //加载element UI相关的配置
import './plugins/validata'

// 不用vuex的方法
import * as API from '@/api'

import VueLazyload from 'vue-lazyload'
// 以上为官网引入 还需要准备一张本地的图片
// import loading from '@/assets/images/loading.gif'
// Vue.use(VueLazyload, {
//   loading,
// })


const loadimage = require('./assets/loading.gif')
const errorimage = require('./assets/error.gif')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
})



Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
// 创建或指定事件总线对象，保存到Vue原型对象上
// Vue.prototype.$bus = new Vue()
Vue.component(MyPagination.name, MyPagination)
new Vue({
  beforeCreate() {//越早拿到this越好
    //创建或指定事件总线对象，保存到Vue原型对象上
    Vue.prototype.$bus = this
    // 不用vuex的方法时，可以把接口请求函数全部装在对象当中 挂在Vue原型身上
    Vue.prototype.$API = API
  },

  render: h => h(App),
  router,
  store,
}).$mount('#app')
