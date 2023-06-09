import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js"

Vue.use(VueRouter)
//push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  console.log('push',onResolve, onReject)
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
VueRouter.prototype.replace= function replace(location, onResolve, onReject) {
  
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

export default new VueRouter({
    mode :'history',
    routes ,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})