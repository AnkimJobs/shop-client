/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也 可以选择处理或不处理
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'


//添加请求拦截器
const service = axios.create({
    // baseURL:'http://39.98.123.211:8510/api',
    baseURL:'/api', //用代理

    timeout:1000,
})

service.interceptors.request.use((config)=>{

    NProgress.start();
    let userTempId = store.state.user.userTempId
    if ( userTempId ){ 
        //此处的名字需要和后端商量好
        config.headers.userTempId=userTempId

    }

    return config

})
//添加响应拦截器
service.interceptors.response.use(
    response =>{
        NProgress.done();
        return response.data

    },
    error=>{
        NProgress.done();
        alert(error.message ||'未知请求错误' )
        // throw error
        return Promise.reject()

    }
)

export default service