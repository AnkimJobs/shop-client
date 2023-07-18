
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

//搜索商品
// /api/list  POST
export const reqSearch = (searchParams)=>ajax.post('/list',searchParams)

//商品详情 
// /api/item/{ skuId }  GET
export const reqDetail = (skuId)=>{
   return ajax({
        url:`/item/${skuId}`,
        method:'get'
   })
}
//添加到购物车(对已有物品进行数量改动)
// /api/cart/addToCart/{ skuId }/{ skuNum }
// POST
export const reqAddOrUpdateCart = (skuId,skuNum )=>{
    return ajax({
         url:`/cart/addToCart/${ skuId }/${ skuNum }`,
         method:'post'
    })
 }

 // 获取购物车列表
//  /api/cart/cartList
// GET
export const reqShopCartList=()=>{
    return ajax({
        url:'cart/cartList',
        method:'get'
    })
}
//切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
// GET
export const reqCheckCart=(skuId,isChecked)=>{
    return ajax({
        url:`/cart/checkCart/${skuId}/${isChecked}` ,
        method:'get'
    })
}
// 删除购物车商品
// /api/cart/deleteCart/{skuId}
// DELETE
export const reqDeleteCart=(skuId)=>{
    return ajax({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })

}
// 注册用户
// /api/user/passport/register
// POST
export const reqRegister=(registerParams)=>ajax({
    url:'/user/passport/register',
    method:'post',
    data:registerParams
}) 


//登录
///api/user/passport/login
//POST
export const reqLogin=(loginParams)=>ajax.post('/user/passport/login',loginParams)
//

//发送手机验证码
// /api/user/passport/sendCode/${phone}
//get
export const reqSendCode=(phone)=>ajax.get(`/user/passport/sendCode/${phone}`)

//根据token获取用户信息
// /api/user/passport/auth/getUserInfo
export const reqUserInfo=()=>ajax.get('/user/passport/auth/getUserInfo')

//退出登录
// /api/user/passport/logout  GET
export const reqLogout = ()=>ajax.get('/user/passport/logout')

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
// export const reqAddress = ()=>ajax({
//     url:'/user/userAddress/auth/findUserAddressList',
//     method:'get'
// })

// 获取交易页面信息
// /api/order/auth/trade GET
// export const reqTrade = ()=>ajax({
//     method:'get',
//     url:'/order/auth/trade'
// })
//

//12. 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
// POST
// export const reqSubOrder =(tradeNo,tradeInfo)=>ajax({
//     method:'post',
//     url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
//     data:tradeInfo
// })

//订单支付信息
// /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo=(orderId)=>ajax.get(`/payment/weixin/createNative/${orderId}`)

//查询订单支付状态
// /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayState=(orderId)=>ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)

//获取我的订单数据分页列表
// /api/order/auth/{page}/{limit} GET
// export const reqOrderList=(page,limit)=>ajax({
//     method:'get',
//     url:`/order/auth/${page}/${limit}`
// })

 /* 
mock接口函数
*/

export const reqRecommends= ()=>mockAjax('/recommends')
export const reqFloors= ()=>mockAjax('/floors')
export const reqLikes= ()=>mockAjax('/likes')
export const reqRanks= ()=>mockAjax('/ranks') 
export const reqBrands= ()=>mockAjax('/brands')
export const reqAddress = ()=>mockAjax('/useraddress')
export const reqTrade =()=>mockAjax('/tradeinfo')
export const reqSubOrder =(tradeNo,tradeInfo)=>mockAjax('/tradeNo')
export const reqOderList = (page,limit)=>mockAjax('/orderlist')
// 快速测试 就在当前模块调用一下
/* reqFloors().then(result => {
    console.log('result--',result)
}) */