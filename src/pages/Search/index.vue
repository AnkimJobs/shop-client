<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryName">{{options.categoryName}}
              <i @click="removeCategory">×</i></li>
            <li class="with-x" v-if="options.keyword">{{options.keyword}}
              <i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="options.trademark">{{options.trademark}}
              <i @click="removeTrademark">×</i></li>
              <!-- 此处给的是一个数组 不是单个 要遍历 -->
            <li class="with-x" v-for="(props,index) in options.props" :key="index">{{props}}
              <i @click="removeProps(index)">×</i></li>


          </ul>
        </div>

        <!--selector-->
        <!-- 函数类型props   传动态属性-->
        <!-- vue 自定义回调  绑定事件监听 尽量同名 方便操作 -->
        <SearchSelector 
        :setTrademark="setTrademark"
        @addProps="addProps"/> 
        

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: orderArr[0]==='1'}"  @click="setOrder('1')">
                  <!-- order: '1:desc' -->
                  <a href="javascript:">综合<i class="iconfont" 
                    :class="orderArr[1]==='desc'?'icon-down':'icon-up'"
                    v-if=" orderArr[0]==='1'"></i></a>
                </li>
                <li :class="{active: orderArr[0]==='3'}"  @click="setOrder('3')">
                  <a href="javascript:">销量<i class="iconfont" 
                    :class="orderArr[1]==='desc'?'icon-down':'icon-up'"
                    v-if=" orderArr[0]==='3'"></i></a>
                </li>
                <li :class="{active: orderArr[0]==='4'}"  @click="setOrder('4')">
                  <a href="javascript:">新品<i class="iconfont" 
                    :class="orderArr[1]==='desc'?'icon-down':'icon-up'"
                    v-if=" orderArr[0]==='4'"></i></a>
                </li>
                <li :class="{active: orderArr[0]==='5'}"  @click="setOrder('5')">
                  <a href="javascript:">评价<i class="iconfont" 
                    :class="orderArr[1]==='desc'?'icon-down':'icon-up'"
                    v-if=" orderArr[0]==='5'"></i></a>
                </li>
                <li :class="{active: orderArr[0]==='2'}"  @click="setOrder('2')">
                  <a href="javascript:">价格 <i class="iconfont" 
                    :class="orderArr[1]==='desc'?'icon-down':'icon-up'"
                    v-if=" orderArr[0]==='2'"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods .id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`" > <img :src="goods.defaultImg" /></router-link>
                    <!-- <a href="javascript:" ><img :src="goods.defaultImg" /></a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em> 
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a target="_blank" href="item.html" >{{ goods.title }}</a> 其他的东西留下还是去掉 看实现的功能 -->
                    <router-link :to="`/detail/${goods.id}`">{{ goods.title }}</router-link>
                    <!-- <a  href="javascript:" >{{ goods.title }}</a> -->

                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
          
          <Pagination
            :currentPage="options.pageNo"
            :total="total"
            :pageSize="options.pageSize"
            :showPageNo="5"
            @currentChange="getShopList"
            
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  // import { mapState } from 'vuex';
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    data(){
      return{
        options:{ //将请求数据都存到这个对象中 后期发请求好操作
          category1Id: '', // 一级分类ID
          category2Id: '', // 二级分类ID
          category3Id: '', // 三级分类ID
          categoryName: '', // 分类名称
          keyword: '', // 搜索关键字

          // trademark: '', // 品牌: "ID:品牌名称" "1:苹果"
          props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] ["2:6.0～6.24英寸:屏幕尺寸"]
          order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  "1:desc"

          pageNo: 1, // 页码
          pageSize: 5, //	每页数量}
        }
      }
    },

    //在渲染模版之前调用  数据准备好了以后才初次渲染
    // created(){  
    //   this.updateParams()
    //   //发送搜索请求
    //   this.getShopList()
    // } ,
    //先做一个初始渲染， 后面更新 放在此处多了一次更新
    mounted(){
      // this.$store.dispatch('getProductList',{
      //   "pageNo": 1,
      //   "pageSize": 10,
      // })
    },
   
    computed:{
      // ...mapState({
      //   goodsList: state => state.search.productList.goodsList || []
      // })
   
      ...mapGetters(['goodsList','total']),
      // 得到包含当前分类项标识oderFlag和排序方式orderType的数组
      orderArr() {
        return this.options.order.split(':')}

    },
    watch: {
      /* 
      watch 监视回调默认调用时机：数据有变化才调用
      如何实现初始化就调用第一次
      */
    // $route(to, from) {// 对路由变化作出响应...
    //   //第二次用到了一样的操作 所以对操作进行封装 若里面的功能有多个 应封装为多个
    //   this.updateParams()
    //   this.getShopList()

    // },
    // 该回调将会在侦听开始之后被立即调用
      $route : {
        handler() {
          this.updateParams()
          this.getShopList()},
        immediate: true //  初始话立即执行第一次  计算属性初始化也会执行
        /* 
        与computed的区别：
        1.异步操作
        2，深度监视 deep： true
      
        */
      },
    },
    methods:{
      //改变当前页码
      // currentChange(page){
      //   // this.options.pageNo=page
      //   this.getShopList(page)
      // },
      //设置新的排序方式
      setOrder(orderFlag){
        //要改这个值 就不能用const 用let
        let [flag,type]=this.orderArr
      //   点击的是当前排序项:只需要切换orderType
        if(flag===orderFlag){
          type = type==='desc'?'asc':'desc'
        }else{
			  //点击的不是当前排序项:更新oderFlag为指定的排序项，orderType更新为desc
          flag=orderFlag
          type='desc'

        }
        
      //重新请求获取数据列表

      this.options.order=flag+':'+type
      this.getShopList()


      },
      //删除选中的某个品牌
      removeProps(index){
        this.options.props.splice(index,1)
        this.getShopList()
      },
      //添加一个属性条件
      addProps(prop){
        const {props}= this.options
        if(props.includes(prop)) return
        props.push(prop)
        this.getShopList()

      },
      //删除品牌
      removeTrademark(){
        // this.options.trademark=''
        delete this.options.trademark //不会导致界面更新
        this.$delete(this.options,'trademark')
        this.getShopList() //不需要更新路由 
      },
      //设置品牌条件
      setTrademark(trademark){
        //如果当前品牌已经在条件中，直接结束（不重新发送请求, 不更新值）
        if(this.options.trademark===trademark)
          return
        // this.options.trademark=trademark
        this.$set(this.options,'trademark',trademark)
        this.getShopList()

      },
      //删除关键字条件
      removeKeyword(){
        this.options.keyword=''
        // this.$router.push({
        this.$router.replace({
          name:'search',
          query:this.$route.query
        })
        // this.getShopList()
        this.$bus.$emit('removeKeyword')

      },
      //删除三级列表条件
      removeCategory(){
        this.options.category1Id =''
        this.options.category2Id =''
        this.options.category3Id =''
        this.options.categoryName=''
      
        //  this.$router.push({
        this.$router.replace({
          name:'search',
          params:this.$route.params
        })
        // this.getShopList()


      },
      /* 取出参数数据 */
      updateParams(){
        const {keyword} = this.$route.params
        const {categoryName,category1Id,category2Id,category3Id} = this.$route.query
        
        this.options={
          ...this.options,
          keyword,
          categoryName,
          category1Id,
          category2Id,
          category3Id
        }
      },
      /* 异步获取商品列表 */
      getShopList(page=1){
        //更新options中的pageNo
        this.options.pageNo=page 
        this.$store.dispatch('getProductList',this.options)
      }
    },
    components: {
      SearchSelector
    },
    
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>