<template>
  <div class="pagination">
    <button :disabled="myCurrentPage===1"  :class="{disabled: myCurrentPage===1}" @click="setCurrentPage( myCurrentPage-1)">上一页</button>
    <button v-if="startEnd.start>1" @click="setCurrentPage(1)">1</button>
    <button class="disabled" v-if="startEnd.start>2">...</button>

    <!-- 多执行了从1到start-1的遍历 和 v-if的判断 -->
      <!-- <button  v-for="item in startEnd.end" :key="item" v-if="item>=startEnd.start" 
    :class="{active:item===myCurrentPage}" @click="setCurrentPage(item)" :disabled="item===myCurrentPage"> {{item}}</button> -->
    
    <button  v-for="item in startEndArr" :key="item"
    :class="{active:item===myCurrentPage}" @click="setCurrentPage(item)" :disabled="item===myCurrentPage"> {{item}}</button>
    

    <button class="disabled" v-if="startEnd.end<(totalPages-1)">...</button>
    <button v-if="startEnd.end<totalPages"  @click="setCurrentPage(totalPages)" >{{totalPages}}</button>
    <button :disabled="myCurrentPage===totalPages"   :class="{disabled: myCurrentPage===totalPages}"  @click="setCurrentPage(myCurrentPage+1)" >下一页</button>
    <button class="disabled">共{{total}}条</button>


   
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:{
      currentPage:{
        type:Number,
        default: 1
      },
      total:{
        type:Number,
        default:0
      },
      pageSize:{
        type:Number,
        default:10
      },
      showPageNo:{
        type:Number,
        default:5,
        //要求传入的值是奇数
        validator: function (value) {
        return value%2===1 
        }
      }

    } ,
    data() {//data里面可以读props数据
      return {
        myCurrentPage:this.currentPage//初始值由父组件来指定
      }
    },
    computed:{
      //包含start到end的数组
      startEndArr(){
        const arr =[]
        for (let index =this.startEnd.start; index <= this.startEnd.end; index++) {
          arr.push(index)
          
        }
        return arr
      },
      // 总页数
      totalPages(){
        //1.  取出依赖数据
        const {total,pageSize}=this
        return  Math.ceil(total/pageSize)
      },
      // start/end:连续页码的开始页码与结束页码 要返回两个数据object
      startEnd(){
        let start,end
        //依赖数据
        const {myCurrentPage,showPageNo,totalPages}= this

        // 计算start
        /* 举个具体的例子 帮助理解
        myCurrentPage,showPageNo,totalPages
            4           5          8       ==>  23 4 56 
            3           5          8       ==>  12 3 45  start 临界
            2           5          8       ==>  1 2 345  
            6           5          8       ==>  45 6 78  end 临界
            8           5          8       ==>  4567 8  

            1           5          4       ==>  1 234
            
        start = 4 -Math.floor (5/2)
        end = 4 + Math.floor(5/2)
         */ 

        start = myCurrentPage - Math.floor(showPageNo/2)
        if (start<1){  
          start = 1  //此时end的值会随着start的重新赋值发生变化 
        }  
        // 计算end
        // end =myCurrentPage + Math.floor(showPageNo/2)
        end = start + showPageNo - 1  
        if (end>totalPages){
          end = totalPages //此时start 的值会随着end的重新赋值发生变化 
          start = totalPages - showPageNo + 1  
          if (start<1){  
          start = 1   //showPageNo > totalPages
          } 
        }  
        return {start,end}

      }
    },
    watch:{
      // 子组件监视父组件传入的数据变化
      currentPage(value){
        this.myCurrentPage = value
      }

    },
    methods: {
      setCurrentPage(page){
        //如果页面没有发生变化，直接结束
        if( this.myCurrentPage === page ) return
        // 设置新的当前页码
        this.myCurrentPage = page 
        //分发自定义事件通知父组件
        this.$emit('currentChange',page)



      }
    },

    
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      // &[disabled] {
      //   color: #c0c4cc;
      //   cursor: not-allowed;
      // }
      &.disabled{
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;  //鼠标放上去是禁用的效果
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
