import  {reqBaseCategoryList} from '@/api'

const state ={
    baseCategorylist:[],

}
const mutations={
    RECEIVE_BASE_CATGORY_LIST(state, baseCategoryList){
        state.baseCategoryList =  baseCategoryList.splice(0,15)
    }

} 
const actions={
    async getBaseCategoryList({commit}){
        const result = await reqBaseCategoryList();
        if (result.code === 200){
            const baseCategoryList = result.data 
            commit( 'RECEIVE_BASE_CATGORY_LIST',baseCategoryList )
        }
    } 
    
}
const getters={
}
export default {
    state,
    actions,
    mutations,
    getters
}
