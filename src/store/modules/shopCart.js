 import {reqAddOrUpdateCart,reqShopCartList,reqCheckCart,reqDeleteCart} from '@/api'


const state={
    shopCartList:{}
   
}
const mutations={
    RECEIVE_SHOPCART_LIST(state, shopCartList){
        state.shopCartList=shopCartList
    }
   
}
const actions={
    async addOrUpdateCart({commit},{skuId,skuNum}){
        const result = await reqAddOrUpdateCart(skuId,skuNum)
        // console.log(result)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async getShopCartList({commit}){
        const result = await reqShopCartList()
        console.log(result)
        if (result.code===200){
            commit("RECEIVE_SHOPCART_LIST",result.data)
        }
    },


    async getCheckCart({commit},{skuId,isChecked}){
        const result = await reqCheckCart(skuId,isChecked)
        if(result.code===200){
            return'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async getCheckCartAll({commit,state,dispatch,getters},isChecked){
        // console.log(isChecked)
        let promises=[]
        // state.shopCartList[0].cartInfoList.forEach(element => {
        getters.cartInfoList.forEach(element => {
            if(element.isChecked ===isChecked) return
            let promise= dispatch('getCheckCart',{skuId:element.skuId,isChecked})
            promises.push(promise)
        })
        return Promise.all(promises)
    },
    async deleteCart({commit},skuId){
        const result= await reqDeleteCart(skuId)
        console.log(result)

        if (result.code ===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async deleteCartChecked({commit,state,getters,dispatch}){
        let promises=[]
        getters.cartInfoList.forEach(item =>{
            console.log(item.isChecked)
            if(item.isChecked){
                console.log('first')
                const promise= dispatch('deleteCart',item.skuId)
                promises.push(promise)
            }
        })
        return Promise.all(promises)

    }

}
const getters={

    shopCartList(state){
        return state.shopCartList[0] || {}
    },
    cartInfoList(state){
        if (state.shopCartList[0]){
            return state.shopCartList[0].cartInfoList 
        }else {
            return []}
    }
    
   

}

export default {
    state,
    mutations,
    actions,
    getters
}