<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-if="cartInfoList.length">
        <ul class="cart-list" v-for="info in cartInfoList" :key="info.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="info.isChecked" @click="updateChecked(info)">
          </li>
          <li class="cart-list-con2">
            <img :src="info.imgUrl">
            <div class="item-msg">{{ info.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ info.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <!-- <a href="javascript:void(0)" class="mins" @click="changeSkuNum(info,-1,'minus')">-</a>
            <input autocomplete="off" type="text" :value="info.skuNum" minnum="1" class="itxt" @change="changeSkuNum(info,$event.target.value*1,'change')">
            <a href="javascript:void(0)" class="plus"  @click="changeSkuNum(info,1,'add')">+</a> -->

            <a href="javascript:void(0)" class="mins" @click="changeSkuNum(info,-1,true)">-</a>
            <input autocomplete="off" type="text" :value="info.skuNum" minnum="1" class="itxt" @change="changeSkuNum(info,$event.target.value*1,false)">
            <a href="javascript:void(0)" class="plus"  @click="changeSkuNum(info,1,true)">+</a>
            
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{info.cartPrice*info.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(info)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

       
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked"  >
        <!-- <input class="chooseAll" type="checkbox" :checked="isAllChecked&&checkedNum" @change="updateCheckedAll" > -->
        


        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span> 件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{summoney}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'

  export default {
    name: 'ShopCart',
    computed:{
      ...mapGetters(['cartInfoList']),
    //   cartInfoList(state){
    //     return state.shopCartList.cartInfoList || []
    // }
      checkedNum(){
        return this.cartInfoList.reduce((prev,item)=>{
          if(item.isChecked===1){
            prev = prev+item.skuNum
          }
          return prev
        },0)
        
      },
      summoney(){
        return this.cartInfoList.reduce((prev,item)=>{
        if(item.isChecked===1){
          prev = prev + item.cartPrice*item.skuNum
        }
        return prev
      },0)
     },
    
      isAllChecked:{
        get(){
          return this.cartInfoList.every((item)=>{
          return item.isChecked
        })
      },
        async set(val){
          try {
            const result = await this.$store.dispatch('getCheckCartAll',val?1:0)
            // console.log(result)
            this.getShopCartList()
            
          } catch (error) {
            alert(error.message)
            
          }
         
        }
 
       
      }

    },
  
    mounted(){
      this.getShopCartList()
    },
    methods:{
      //删除选中商品
      async deleteAll(info){
        if (window.confirm(`确定删除吗?`)){
          try {
              const result = await this.$store.dispatch('deleteCartChecked')
              console.log('删除选框成功',result)
              alert('删除选框成功')
              this. getShopCartList()
              
            } catch (error) {
              alert(error.message)
            }} 
      },
      //删除单个商品
      async deleteOne(info){
        try {
          await this.$store.dispatch("deleteCart",info.skuId)
          alert('删除成功')
          this. getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      },
      //更新全部商品选中状态
      // updateCheckedAll(){
      //   // this.$store.dispatch('getCheckCartAll','1')
      // },
      //更新单个商品选中
      async updateChecked(info){
        let {isChecked,skuId} = info 
        // isChecked=isChecked?'0':'1'
        try {
          await this.$store.dispatch('getCheckCart',{skuId:skuId,isChecked:isChecked?'0':'1'})
          // alert('选框更改成功')
          this. getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      },
      //改变商品数量
      // changeSkuNum(item,disNum,type){
        // const {skuId,skuNum} =item
        // console.log(skuId,skuNum)
        // switch(type){
        //   case 'add':
        //     disNum=1
        //     break
        //   case 'minus':
        //     // if(skuNum+disNum>0){
        //     //   disNum=-1
        //     // }else{
        //     //   disNum=1-skuNum
        //     // }
        //     disNum = skuNum+disNum>0?-1:1-skuNum
        //     break
        //   case 'change':
        //     // if (disNum>0){
        //     //   disNum = disNum - skuNum
        //     // }
        //     // else{
        //     //   disNum=1-skuNum
        //     // }
        //     // }
        //     disNum =disNum>0?disNum - skuNum:1-skuNum
        //   }
      changeSkuNum:throttle(function(item,disNum,flag){
        const {skuId,skuNum} =item
        if(!flag && disNum>0){ 
          disNum=disNum-skuNum
        }
        if(disNum<0 && skuNum + disNum<=0){
          disNum = 1-skuNum
        }
        this.updateShopCartList(skuId,disNum)
        // this.$store.dispatch('addOrUpdateCart',{skuId:skuId,skuNum:disNum})
      },500),
      getShopCartList(){
        this.$store.dispatch('getShopCartList')
      },
      async updateShopCartList(skuId,skuNum){
        try {
          await this.$store.dispatch('addOrUpdateCart',{skuId,skuNum})
          // alert('更改成功')
          
            this. getShopCartList()
          
        } catch (error) {
          alert(error.message)
          
        }
        
      },
      
      }
      
    }
  
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35.5%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 9.5%;

          }

          .cart-list-con5 {
            width: 16%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 11%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>