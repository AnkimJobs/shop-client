import { reqDetail } from "@/api"

const state={
    detailInfo:{}
}
const mutations={
    RECEIVE_DETAIL(state,detailInfo){
        state.detailInfo=detailInfo
    }
}
const actions={
    async getDetailInfo({commit},skuId){
        const result= await reqDetail(skuId)
        if(result.code===200){
            commit('RECEIVE_DETAIL',result.data)
        }
    }
}
const getters={
    categoryView(state){
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo ||{}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList||[]
    }

    

}

export default {
    state,
    mutations,
    actions,
    getters
}