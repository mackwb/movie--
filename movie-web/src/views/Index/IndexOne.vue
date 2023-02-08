<template>
    <div class="box">
        <!-- <h2>第一页</h2> -->
        <p class="title">{{ movie.title }}</p>
        <div class="mv_box">

            <div class="mv_nm" v-for="item, index in movie.movieList" :key="index">
                <img class="mv_img" :src="item.poster" alt="" />
                <h5 class="name">{{ item.name }}</h5>
            </div>
        </div>
        <div>
            <van-list class="list" v-model:loading="loading" :finished="finished" @load="onLoad">
                <div class="mv_nm2" v-for="item, index in movie.movieList" :key="index">
                    <img class="mv_img" :src="item.poster" alt="" />
                    <div>
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.score }}</p>
                    </div>
                    <van-button type="danger">危险按钮</van-button>
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
            movie2: []
        }
    },
    methods: {
        handName() {
            // console.log(111);
        }
    },
    created() {
        getMostpraised().then((data) => {
            this.movie = data
            console.log(this.movie);
        }),
        getMoreHotmovies().then((data) => {
            this.movie2 = data
            console.log(this.movie2);
        })
    },


}
</script>

<style lang="scss" scoped>
.box {

    position: relative;
    // height: 5000px;
}

.list {
    overflow: hidden;
    // height: 3000px;
    background-color: orange;
}

.mv_nm {
    width: 64px;
    height: 90px;
}

.mv_nm2 {
    // width: 100%;
    // display: flex;
    // overflow: hidden;
    margin-top: 25px;
}

.mv_nm2 .mv_img {

    float: left;
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