import { result } from "lodash"
import ajax from "./ajax"
import mockAjax from './mockAjax'


// 三级分类列表
// /api/product/getBaseCategoryList  GET
export function reqCategoryList(){
    return ajax.get('/product/getBaseCategoryList ')
    // return ajax ({
    //     url:/product/getBaseCategoryList ,
    //     method: 'get'
    // })
}
// 获取首页广告轮播列表
///api/cms/banner get 
 export const reqBannerList = ()=> ajax('/cms/banner')
//  {return ajax.get('cms/banner')}//get可以省略


/* 
mock接口函数
*/

export const reqRecommends= ()=>mockAjax('/recommends')
export const reqFloors= ()=>mockAjax('/floors')
export const reqLikes= ()=>mockAjax('/likes')
export const reqRanks= ()=>mockAjax('/ranks') 
export const reqBrands= ()=>mockAjax('/brands')

// 快速测试 就在当前模块调用一下
/* reqFloors().then(result => {
    console.log('result--',result)
}) */