<template>
  <view class="ranking-container">
      <image class="ranking-bg" :src="getRankingBg"/>
      <text class="ranking-text" :class="{'text-white':ranking<=3}">{{ranking}}</text>
  </view>
</template>

<script>
  export default {
    name:"hot-ranking",
    data() {
      return {
        
      };
    },
    computed:{
      getRankingBg(){
        if(this.ranking<=3){
          return require(`@/static/images/ranking-${this.ranking}.png`)
        }
        return require(`@/static/images/ranking-other.png`)
      }
    },
    props:{
      ranking:{
        type:Number,
        required:true
      }
    }
  }
</script>

<style lang="scss" scoped>
.ranking-container{
  position: relative;
  text-align: center;
  width: 18px;
  height: 20px;
  .ranking-bg{
     width: 18px;
     height: 20px;
  }
  .ranking-text{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%,-55%);
    font-size: 12px;
    color: #333;
  }
  .ranking-text{
    z-index: 999 !important;
  }
  .text-white{
    color: white;
  }
}
</style>
