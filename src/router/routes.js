import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import router from '.'

export default [
    {
        path:'/addcartsuccess',
        component:AddCartSuccess
    },
    {
        path:'/detail/:skuId',
        component:Detail
    },
    {
        path :'/',
        component: Home
    },
    {
        name : 'search',
        path :'/search/:keyword?',
        component: Search,
        // props: true 
        props:(route)=>({keyword3:route.params.keyword, 
                        keyword4:route.query.keyword2})
        
    },
    {
        path :'/register',
        component: Register,
        meta: {
            isHideFooter: true,
        }
    },
    {
        path :'/login',
        component: Login,
        meta: {
            isHideFooter: true,
        }
    },
]