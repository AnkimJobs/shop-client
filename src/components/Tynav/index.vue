<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ active: index === currentIndex }"
                @mouseenter="showSubList(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >

                  <!-- <a href="javascript:" @click="$router.push(`/search?CategoryName= ${c1.categoryName}&category1Id=${c1.categoryId}`)">{{ c1.categoryName }}</a> -->
                  <!-- <router-link :to="`/search?CategoryName= ${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- <a href="">{{ c2.categoryName  }}</a> -->
                        <!-- <router-link :to="`/search?CategoryName= ${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- <a href="">{{ c3.categoryName  }}</a> -->
                          <!-- <router-link :to="`/search?CategoryName= ${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { reqBaseCategoryList } from "@/api";
// import _ from "lodash"
import throttle from "lodash/throttle"; //只引入需要的模块 减小打包文件
//
export default {
  name: "Tynav",
  data() {
    const path = this.$route.path;
    return {
      isShowFirst: path=== '/',
      currentIndex: -2,
    };
  },
  // created(){  //但是这个更进一步升级 在data里面就可以读取
  //   const path = this.$route.path
  //   if (path ==="/"){
  //     this.isShowFirst = true
  //   }},

  mounted() {
    //里面发送异步请求   //在初始显示之后更新数据==>导致界面多更新一次
    // const path = this.$route.path
    // if (path ==="/"){
    //   this.isShowFirst = true
    // }

  },
  computed: {
    // baseCategoryList() {
    //   console.log(this.$store.state.home.baseCategoryList)
    //   return this.$store.state.home.baseCategoryList;
    // },// 有个问题 就是有时候得到的是undefine

    //方法二：

    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    hideFirst() {
      this.currentIndex = -1;
      if (this.$route.path != "/") {
        this.isShowFirst = false;
      }
    },
    showFirst() {
      this.currentIndex = -1;
      this.isShowFirst = true;
    },
    //显示指定下标的分类列表
    // showSubList:_.throttle(function(index){ //此处不可以用箭头函数，因为箭头函数没有自己的this，且不能通过bind来指定特定this
    showSubList: throttle(
      function (index) {
        //此处不可以用箭头函数，因为箭头函数没有自己的this，且不能通过bind来指定特定this
        if (this.currentInde !== -2) this.currentIndex = index;
      },
      200
      // {trailing:false,}//最后一次事件不延迟处理
    ),
    //跳转到搜索页面
    toSearch(event) {
      // 在@时默认会传event，所以当时不用写，此处需要写
      const target = event.target;
      //在dataset中命名会变成小写
      const { categoryname, category1id, category2id, category3id } =
        target.dataset;
      // alert(target.tagName)
      // console.dir(target)

      if (categoryname) {
        const query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        const location = {
          name: "search",
          query, 
          params: this.$route.params
        } 
        this.$router.push(location);
      }
    },
  },
};
</script>
  
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      //指定过渡时的样式
      &.slide-enter-active,&.slide-leave-active{
      transition: all .3s     
      }
      //指定隐藏时的样式
      &.slide-enter,&.slide-enter-to{
        opacity: 0;
        height: 0;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
