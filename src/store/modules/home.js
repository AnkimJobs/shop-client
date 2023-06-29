import  {reqBannerList, reqCategoryList, reqFloors, reqRecommends,reqLikes,reqRanks,reqBrands} from '@/api'

const state ={
    categoryList:[],
    bannerList:[],
    recommends:[],
    floors:[],
    likes:{},
    ranks:{},
    brands:[]


}
const mutations={
    RECEIVE_BASE_CATGORY_LIST(state, categoryList){
        state.categoryList =  categoryList.splice(0,15)
    },
    RECEIVE_BANNER_LIST(state,bannerList){
        state.bannerList = bannerList.splice(0,2)

    },
    RECEIVE_RECOMMEDS(state,recommends){
        state.recommends = recommends
    },
    RECEIVE_FLOORS(state,floors){
        state.floors = floors
    },
    RECEIVE_LIKES(state,likes){
        state.likes = likes
    },
    RECEIVE_RANKS(state,ranks){
        state.ranks = ranks
    },
    RECEIVE_BRANDS(state,brands){
        state.brands = brands
    },




} 
const actions={
    async getCategoryList({commit}){
        const result = await reqCategoryList();
        if (result.code === 200){
            const categoryList = result.data 
            commit( 'RECEIVE_BASE_CATGORY_LIST',categoryList )
        }
    } ,
    async getBannerList({commit}){
        const result = await reqBannerList()
       
        if (result.code=== 200){
            const bannerList = result.data
            commit('RECEIVE_BANNER_LIST',bannerList)
        }

    },
    async getRecommends({commit}){
        const result = await reqRecommends()
        if (result.code=== 200){
            const recommends = result.data
            commit('RECEIVE_RECOMMEDS',recommends)
        }

    },
    async getFloors({commit}){
        const result = await reqFloors()
        if (result.code=== 200){
            const floors = result.data
            commit('RECEIVE_FLOORS',floors)
        }

    },
    async getLikes({commit}){
        const result = await reqLikes()
        console.log('lk',result)
        if (result.code=== 200){
            const likes = result.data
            commit('RECEIVE_LIKES',likes)
        }

    },
    async getRanks({commit}){
        const result = await reqRanks()
        console.log('ra',result)
        if (result.code=== 200){
            const ranks = result.data
            commit('RECEIVE_RANKS',ranks)
        }

    },
    async getBrands({commit}){
        const result = await reqBrands()
        console.log('br',result)
        if (result.code=== 200){
            const brands = result.data
            commit('RECEIVE_BRANDS',brands)
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
