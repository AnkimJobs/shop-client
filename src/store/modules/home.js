import  {reqBaseCategoryList} from '@/api'

const state ={
    baseCategorylist:[],

}
const mutations={
    RECEIVE_BASE_CATGORY_LIST(state, categoryList){
        state.baseCategoryList = categoryList
    }

}
const actions={
    async getBaseCategoryList({commit}){
        const result = await reqBaseCategoryList();
        if (result.code === 200){
            const categoryList = result.data 
            commit( 'RECEIVE_BASE_CATGORY_LIST',categoryList )
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
