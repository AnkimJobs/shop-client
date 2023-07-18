//管理用户模块相关数据的vuex子模块
import { getUserTempId, setToken, getToken, remocveToken } from '@/utils/userabout'
import { reqSendCode, reqRegister, reqLogin, reqUserInfo ,reqLogout} from '@/api'

const state = {
    //getUserTempId 获取临时标识id
    userTempId: getUserTempId(),
    code: '',
    //先从localStorage当中获取token
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    RECEIVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    RESET_USERINFO(state) {
        //这个里面包含用户信息和info
        state.userInfo = {},
            state.token = ''

    }
}
const actions = {
    //获取验证码
    async getSendCode({ commit }, phone) {
        //获取验证码的这个接口，把验证码返回到data中，但是正常情况，后台把验证码发到用户的手机上
        const result = await reqSendCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            console.log(result)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //完成注册
    async toRegister({ commit }, paras) {
        const result = await reqRegister(paras)
        console.log(result)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }


    },
    async login({ commit }, info) {
        const result = await reqLogin(info)
        console.log('login', result)
        if (result.code === 200) {
            commit('RECEIVE_TOKEN', result.data.token)
            setToken(result.data.token)
            //这里要传返回值，之前没有发请求更改后台数据的没有写返回值，是因为后续没有其他的操作 
            //登录不但要存储token数据，而且要根据登录成功还是失败决定下一步往哪跳
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        console.log('getUserInfo', result)
        if (result.code === 200) {
            commit('RECEIVE_USERINFO', result.data)
            return 'ok'
        }
        // else {
        //     return Promise.reject(new Error('failed'))
        // }
    },
    async resetUserInfo({ commit }) {
        remocveToken()  //清空localStorage中的token
        commit('RESET_USERINFO') //清空state中的
    },
    async getLogout({commit}){
        const result = await reqLogout()
        if (result.code===200){
            remocveToken()  //清空localStorage中的token
            commit('RESET_USERINFO') //清空state中的
            return 'ok'
        }
        else{
            return Promise.reject(new Error('failed'))
        }

    }


}

const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}