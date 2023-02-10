<template>
    <div class="box">
        <!-- <h2>第一页</h2> -->
        <p class="title">最受好评电影</p>
        <div class="mv_all">
            <div class="mv_box">
                <div class="mv_nm" v-for="item, index in Movie" :key="index">
                    <img class="mv_img" :src="item.img" alt="" @click="detail(item.id)" />
                    <h5 class="name">{{ item.nm }}</h5>
                </div>
            </div>
        </div>
        <div>
            <van-list class="list" @load="onLoad">
                <div class="mv_nm2" v-for="item, index in Movie" :key="index">
                    <img class="mv_img" :src="item.img" alt="" @click="detail(item.id)" />
                    <van-button type="danger" class="btn">购票</van-button>
                    <div class="mv_nm3">
                        <h4>{{ item.nm }}</h4>
                        <p v-if="item.sc != 0">观众评价:<span>{{ item.sc }}</span></p>
                        <p v-if="item.sc == 0">暂无评分</p>
                        <p>主演:{{ item.star }}</p>
                        <p>今天{{ item.showst }}家影院放映了{{ item.wish }}场</p>
                    </div>
                </div>
            </van-list>
        </div>





    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMostpraised, getHotmovies, getMoreHotmovies } from '../../api/home'
import { useStore } from "vuex";

export default {
    // data() {
    //     return {
    //         movie: [],
    //     }
    // },

    setup() {
        const route = useRoute() //路由
        const state = useStore()
        const router = useRouter()
        const list = ref([]);
        const Movie = ref([])
        // let cityId = route.query.id == null ? ref(20) : ref(route.query.id)
        let cityId = ref(20)

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
        let detail = (id) => {
            // console.log(route);
            // console.log(id);
            state.commit("detail", id)
            router.push(
                {
                    path: '/viewXx',
                    query: {
                        id: cityId.value
                    }
                }
            )

        }


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
            detail,
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
* {
    margin: 0;
    padding: 0;
}

.box {

    position: relative;
    // height: 100%;
    // width: 100%;

}

.mv_all {
    // width: 375px;
    // height: 120px;
    overflow-x: scroll;
}

.mv_all::-webkit-scrollbar {
    display: none;
}

.list {
    overflow: hidden;
    // height: 3730px;

}

.mv_nm {
    width: 64px;
    height: 110px;
    overflow: hidden;
    display: block;
    float: left;
}

.mv_nm img {
    width: 64px;
    height: 90px;
    margin: 0 3px;
}

.mv_nm h5 {
    font-weight: normal;
    font-size: 10px;
    text-indent: 6px;
}

.mv_nm2 {
    margin-bottom: 20px;
    width: 90px;
    height: 140px;
    position: relative;
}

.mv_nm2 .mv_img {
    width: 100%;
    height: 100%;
    margin-right: 5px;
}

.mv_nm3 {

    // width: 260px;
    flex: 1;
    // height: 130px;
    position: absolute;
    left: 94px;
    top: 0;
    border-bottom: 1px solid #ccc;
    padding-top: 5px;
    padding-bottom: 15px;

}

.mv_nm3 p {
    height: 24px;
    line-height: 18px;
    color: gray;
    font-size: 12px;
}

.mv_nm3 p span {
    color: #fb0;
    line-height: 22px;
    font-weight: bold;
}

.mv_nm3 p:nth-child(3) {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mv_nm3 h4 {
    height: 26px;
    line-height: 26px;
    margin-bottom: 20px;
    margin-top: 10px;
}


.btn {
    height: 30px;
    width: 60px;
    border-radius: 15px;
    position: absolute;
    top: 55px;
    left: 300px;
    line-height: 20px;
}

.mv_box {
    justify-content: space-between;
    overflow: hidden;
    height: 110px;
    width: 640px;
}

.title {
    font-size: 14px;
    color: #333;
    margin-top: -16px;
    height: 30px;
    line-height: 30px;
    text-indent: 2em;
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