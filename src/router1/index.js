import Vue from "vue"
import VueRouter from "vue-router"
import routes from './routes'


// Vue.use('VueRouter')  找了很久的错误都没有找到 可能是字符串出了问题 还有就是要扎实
Vue.use(VueRouter)  //还有就是会有提示
export default new  VueRouter ({
    mode: 'history',
    routes,

})