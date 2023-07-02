 import {reqAddOrUpdateCart} from '@/api'

const state={
   
}
const mutations={
   
}
const actions={
    async addOrUpdateCart({commit},{skuId,skuNum}){
        const result= await reqAddOrUpdateCart(skuId,skuNum)
        // console.log(result)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
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