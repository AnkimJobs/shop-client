<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in imgList" :key="img.id">
        <img :src="img.imgUrl"
        :class="{active:currentIndex===index}"
        @click="changeIndex(index)"
        >
      </div>
    </div>
    
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data() {
      return {
        currentIndex:0 //index 默认从0开始
      }
    },
    props:['imgList'],
    computed:{
      currentImg(){
        return  imgList[currentIndex]||{}
      }
    },

    watch: {
      imgList(newValue,oldValue) {
      
        this.$nextTick(() => {
        
          new Swiper(this.$refs.swiper, {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView: 3,
            slidesPerGroup: 3

          });
        });
    },
  },
    // mounted(){ 
    //   new Swiper(this.$refs.swiper, {
        
    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     slidesPerView: 3,
    //     slidesPerGroup: 3

        
    //   });},
  
    methods:{
      changeIndex(index){
        this.currentIndex=index 
        //改变的是Zoom中的图片 ==>兄弟组件通信 全局事件总线
        this.$bus.$emit('changeCurrentIndex',index )

      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
 
        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>