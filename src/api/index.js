import ajax from "./ajax"

// 三级分类列表
// /api/product/getBaseCategoryList  GET
export function reqBaseCategoryList(){
    return ajax.get('product/getBaseCategoryList ')
    // return ajax ({
    //     url:/product/getBaseCategoryList ,
    //     method: 'get'
    // })
}
