// // 所有路由匹配的数组
// import Home from '@/pages/Home'

// import Search from '@/pages/Search'

import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
import store from '@/store'
const Home =()=>import('@/pages/Home')
const Search =()=>import('../pages/Search')
/* 
import from 这样的写法 
一 是同步引入，从上往下依次执行引入 它不能动态引入
二 是把所有的组件全部引入完成才执行下面的代码，webpack打包的时候会吧所有的引入组件集体打包，打包成一个大文件
        -->效率变慢 
*/

/* 
 import函数可以让路由组件单独打包 还支持动态引入
 写法很简单，路由组件在注册的时候可以是一个组件也可以是一个函数
 写成函数，当路由被访问的时候，对应的函数就会调用，然后对应的import函数才会执行，动态引入并打包成单独的文件
 
 */

//  浏览器在运行的时候  加载 解析 渲染

export default [
    {
        path: '/center',
        component: Center,
        redirect: '/center/myorder',
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            // {
            //     path:'',
            //     redirect:'myorder'
            // },
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            if(from.path==='/pay'){
                next()
            }else{
                next('/')
            }
          }
        
    },
    {
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            if(from.path==='/trade'){
                next()
            }else{
                next('/')
            }
          }
    },
    {
        path: '/trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            if(from.path==='/shopcart'){
                next()
            }else{
                next('/')
            }
          }
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        beforeEnter: (to, from, next) => {
            let skuNum = to.query.skuNum
            let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
            if(skuNum&&skuInfo){
                next()
            }else{
                // 这种方式可以中断跳转 但一般来说不常用 体验感不好
                // next(false) 
                alert('必须带够参数')
                next('/')
            }
        }
    },
    {
        path: '/detail/:skuId',
        component: Detail
    },
    {
        path: '/',
        component: Home
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        // props: true 
        props: (route) => ({
            keyword3: route.params.keyword,
            keyword4: route.query.keyword2
        })

    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true,
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true,
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            let token = store.state.user.token
            if (token) {
                next('/')
            }else{
                next()
            }
        }
    },
]