import Mock from 'mockjs'
import floors from './floors.json'
import recommends from './recommends.json'
import likes from './likes.json'
import ranks from './ranks.json'
import brands from './brands.json'
import useraddress from './userAddress.json'
import tradeinfo from './tradeInfo.json'
import tradeNo from './tradeNo.json'
import orderList from './orderList.json'


// 提供楼层接口
Mock.mock('/mock/floors',{code:200,data:floors})

// 提供今日推荐接口
Mock.mock('/mock/recommends',{code:200,data:recommends}) 
Mock.mock('/mock/likes',{code:200,data:likes}) 
Mock.mock('/mock/ranks',{code:200,data:ranks}) 

Mock.mock('/mock/brands',{code:200,data:brands}) 
//提供地址接口
Mock.mock('/mock/useraddress',{code:200,data:useraddress})
Mock.mock('/mock/tradeinfo',{code:200,data:tradeinfo})
Mock.mock('/mock/tradeNo',{code:200,data:tradeNo})
Mock.mock('/mock/orderlist',{code:200,data:orderList})


// console.log('mockServer')