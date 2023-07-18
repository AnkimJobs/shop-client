import { reqTrade,reqAddress , reqSubOrder } from "@/api"

const state={
    tradeInfo:{},
    userAddress:[],
    // orderId:''
}
const mutations={
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    },
    RECEIVE_USERADDRESS(state,userAddress){
        state.userAddress=userAddress
    },
    // RECEIVE_TRADENO(state,orderId){
    //     state.orderId=orderId
    // }
}
const actions={
    async getAddress({commit}){
        const result = await reqAddress()
        console.log('Address',result)
        if(result.code===200){
            commit('RECEIVE_USERADDRESS',result.data)
        }
    },

    async getTradeInfo({commit}){
        const result = await reqTrade()
        console.log('trade',result)
        if(result.code===200){
            commit('RECEIVE_TRADEINFO',result.data)
        }
    },
    // async getSumOrder({commit},tradeNo,tradeInfo){
    //     const result = await reqSubOrder(tradeNo,tradeInfo)
    //     console.log('getSumOrder',result)
    //     if (result.code ===200){
    //         commit('RECEIVE_TRADENO',result.data)

    //     }
    // }
    
}
const getters={
    detailArrayList(state){
        return state.tradeInfo.detailArrayList||[]
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}