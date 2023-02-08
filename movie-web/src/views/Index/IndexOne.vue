<template>
    <div class="box">
        <!-- <h2>第一页</h2> -->
        <p class="title">{{}}</p>
        <div class="mv_box">

            <div class="mv_nm" v-for="item, index in Movie" :key="index">
                <img class="mv_img" :src="item.img" alt="" />
                <h5 class="name">{{ item.nm }}</h5>
            </div>
        </div>
        <div>
            <van-list class="list" @load="onLoad">
                <div class="mv_nm2" v-for="item, index in Movie" :key="index">
                    <img class="mv_img" :src="item.img" alt="" />
                    <div class="mv_nm3">
                        <h4>{{ item.nm }}</h4>
                        <p v-if="item.sc != 0">观众评价:{{ item.sc }}</p>
                        <p v-if="item.sc == 0">暂无评分</p>
                        <p>主演:{{ item.star }}</p>
                        <p>今天{{ item.showst }}家影院放映了{{ item.wish }}场</p>
                    </div>
                    <van-button type="danger">购票</van-button>
                </div>
            </van-list>
        </div>





    </div>
</template>

<script>
import { ref } from 'vue';

import { getMostpraised, getHotmovies, getMoreHotmovies } from '../../../../woter_movie/src/api/home'
export default {
    data() {
        return {
            movie: [],
        }
    },

    setup() {
        const list = ref([]);
        const Movie = ref([])
        const loading = ref(true);
        const finished = ref(false);
        const refreshing = ref(true);

        const onLoad = () => {
            getHotmovies().then((data) => {
                console.log(data);
                Movie.value = data.movieList;
                console.log(Movie.value)
                // getMoreFun(movieIds.value);
            });
        };

        // const onRefresh = () => {
        // //     // 清空列表数据
        //     finished.value = false;

        // //     // 重新加载数据
        // //     // 将 loading 设置为 true，表示处于加载状态
        //     loading.value = true;
        //     // onLoad();
        // };

        return {
            list,
            onLoad,
            Movie,
            loading,
            finished,
            // onRefresh,
            refreshing,
        };
    },


}
</script>

<style lang="scss" scoped>
.box {

    position: relative;
    height: 3940px;
}

.list {
    overflow: hidden;
    height: 3730px;
    background-color: bisque;
    margin-top: 40px;
}

.mv_nm {
    width: 64px;
    height: 90px;
}

.mv_nm2 {
    background-color: greenyellow;
    margin-top: 5px;
}

.mv_nm3 {
    background-color: aqua;
}


.mv_nm2 .mv_img {


    width: 100px;
    height: 140px;
}



.mv_box {
    display: flex;
    justify-content: space-between;
}

.title {
    font-size: 14px;
    color: #333;
    margin: 0 0 12px;
}

.mv_img {
    width: 100%;
    height: 100%;
}

.name {
    width: 64px;
    height: 19.5px;
    line-height: 19.5px;
    font-size: 13px;
    color: #222;
    margin: 0 0 3px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>