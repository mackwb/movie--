<script>
// import { useStore } from 'vuex'
// import { computed } from 'vue'
export default {
  setup() {
    // const store = useStore()
    // let setId =()=>{
    //    store.dispatch("getMovieData",1331230).then(data=>{
    //         console.log("获取axios数据==>",data);
    //     })
    //   console.log(store);
    // }

    // return {
    //   setId,
    //   count: computed(() => store.state.movieId),
    // }
  },
}
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
@import url("../src/assets/css/base.css");
</style>