<template>
  <div class="spec-preview">
    <img :src="currentIndexImg.imgUrl"/>
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="currentIndexImg.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle'
  export default {
    name: "Zoom",
    props:['imgList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed:{
      currentIndexImg(){
        return this.imgList[this.currentIndex] || {}
      }
    },
    mounted(){ 
      this.$bus.$on('changeCurrentIndex',this.changeCurrentIndex)
    },
    methods:{
      changeCurrentIndex(index){
        this.currentIndex=index},
      //
      move:throttle(function(event){
        let mouseX = event.offsetX
        let mouseY = event.offsetY
        let mask = this.$refs.mask 
        let maskX= mouseX-mask.offsetWidth/2
        let maskY= mouseY-mask.offsetHeight/2
        let big = this.$refs.big
        if(maskX<0) {
          maskX=0
        }else if(maskX>mask.offsetWidth){
          maskX=mask.offsetWidth
        }
        if(maskY<0){
           maskY=0
        }else if(maskY>mask.offsetHeight){
          maskY=mask.offsetHeight
        }
        
        mask.style.left=maskX+'px'
        mask.style.top=maskY+'px'

        //大图动 根据关系 大图动反方向的两倍
        big.style.left = -2*maskX+'px'
        big.style.top = -2*maskY+'px'
      }, 50)
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>