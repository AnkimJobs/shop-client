<template>
  <div>Home
    <Tynav />
    <list-container></list-container>
    <today-recommend></today-recommend>
    <like></like>
    <rank></rank>
    <floor/>
    <floor/>
    <brand></brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Like from '@/pages/Home/Like'
import Rank from '@/pages/Home/Rank'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import TodayRecommend from '@/pages/Home/TodayRecommend'
export default {
  name: 'Home',
  components:{
    ListContainer,
    Like,
    Rank,
    Floor,
    Brand,
    TodayRecommend
    
    
  }
}
</script>

<style lang="less" scoped>

</style>
