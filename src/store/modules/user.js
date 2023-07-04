//管理用户模块相关数据的vuex子模块
import {getUserTempId} from '@/utils/userabout'
import {reqSendCode} from '@/api'

const state={
    //getUserTempId 获取临时标识id
    userTempId:getUserTempId()
}
const mutations={
    
}
const actions={
    //获取验证码
    getSendCode({commit},phone){
        let result = reqSendCode(phone)
        console.log(result)

      
    }
}
const getters={

}
export default {
    state,
    mutations,
    actions,
    getters
}