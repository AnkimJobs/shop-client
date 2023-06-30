import { reqSearch } from "@/api"


const state ={
    productList:{}
    

}
const mutations ={
    RECEIVE_PRODUCT_LIST(state,productList){
        state.productList=productList
    }

}
const actions={
    async getProductList({commit},searchParams){
        //因为不想删除search组件中的options中的属性
        searchParams = {...searchParams}
        // 解决: 在提交请求前（在异步action中）, 将searchParams中""参数和空数组的参数数据删除
        //对象的遍历
        Object.keys(searchParams).forEach(key => {
            if(searchParams[key]===''||(Array.isArray(searchParams[key])&&searchParams[key].length===0)){
                delete searchParams[key]
            }
        });
        
        const result = await reqSearch(searchParams)
        if (result.code ===200 ){
            commit('RECEIVE_PRODUCT_LIST',result.data)
        }
    }

}
const getters={
    /* 商品分类列表 */
    goodsList(state){
        return state.productList.goodsList || []
    },
    trademarkList(state){
        return state.productList.trademarkList || []
    },
    attrsList(state){
        return state.productList.attrsList ||[]
    }

}


export default {
    state,
    mutations,
    actions,
    getters
}