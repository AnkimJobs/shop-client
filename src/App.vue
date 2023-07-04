<template>
  <div id="app">
  
    <Header/>
    <router-view></router-view>
    <Footer v-show='!$route.meta.isHideFooter' />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import { getCategoryList } from './api'  //用于写完后测试API
         

export default {
  name: 'App',
  mounted(){
    // getCategoryList().then((result)=>{
    //   console.log('result',result)
    // }) 
    this.$store.dispatch('getCategoryList') 
    // this.$store.dispatch('getBannerList') //放着此处 用历史回退不回重新更新
  },
  components:{
    Header,
    Footer, 
  },
 
}        
 
</script>

<style>

</style>
