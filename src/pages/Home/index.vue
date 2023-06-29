<template>
  <div>
    <Tynav />
    <list-container></list-container>
    <today-recommend ></today-recommend>
    <like></like>
    <rank></rank>
    <Floor v-for="item in floors" :key="item.id" :floor="item"/>
   
    <brand></brand>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import ListContainer from '@/pages/Home/ListContainer'
import Like from '@/pages/Home/Like'
import Rank from '@/pages/Home/Rank'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import TodayRecommend from '@/pages/Home/TodayRecommend'

export default {
  name: 'Home',
  mounted() {
    this.$store.dispatch('getRecommends')
    this.$store.dispatch('getFloors')
    this.$store.dispatch('getLikes')
    this.$store.dispatch('getRanks')
    this.$store.dispatch('getBrands')


  },
  computed:{
    ...mapState({
      // recommends: state => state.home.recommends,
      floors: state => state.home.floors,
  
    })
    

  } ,
  components:{
    ListContainer,
    Like,
    Rank,
    Floor,
    Brand,
    TodayRecommend
  },
  
}
</script>

<style lang="less" scoped>

</style>
