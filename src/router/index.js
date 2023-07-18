import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js"
import store from "@/store";

Vue.use(VueRouter)
//push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  console.log('push', onResolve, onReject)
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}
//replace
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {

  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  // token校验

  let token = store.state.user.token
  console.log(token)
  let hasUserInfo = !!store.state.user.userInfo.nickName //转成bool值
  if (token) {
    console.log('token')
    // if (to.path === '/login' || to.path == '/register') {
    //   // next('/')
    // } else {

      //代表登录了或者之前登录过
      if (hasUserInfo) {
        next()
        console.log("hasUserInfo")
      } else {
        console.log("no hasUserInfo dispatch")
        // 去的不是登录页面，此时代表登录了,用户信息不存在，那我们要根据token发请求获取用户的真正信息
        try {
          await store.dispatch('getUserInfo')
          console.log("no hasUserInfo dispatch")
          next()
        } catch (error) {
          alert('用户的token过期或者未知错误')
          //失效了 所以先清空  也可以直接用退出登录
          store.dispatch('resetUserInfo')
          //去之前想去但是没有去的地方,需要和登录逻辑配合使用
          next('/login?redirect=' + to.path)
        }

      }

    // }
  } else {
    //代表用户没登录或者之前没有登录过
    if (to.path.indexOf('/trade') === 0 || to.path.startsWith('/path') || to.path.startsWith('/center')) {
      //交易相关 订单相关 支付相关 用户中心相关 都要登录才能访问
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
    }
})


export default router