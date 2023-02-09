<template>
    <div class="ViewXx">
        <div class="top">
            <div class="old" @click="back">卖票猫&nbsp;>&nbsp;{{ ViewNm.nm }}</div>
        </div>
        <div class="V_Xx">
            <img class="Xx_img" :src="ViewNm.img" alt="">
            <div v_xx>
                <h3>{{ ViewNm.nm }}</h3>
                <span>{{ ViewNm.enm }}</span><br>
                <span>{{ catXx[0] }}/{{ catXx[1] }}
                    <img class="movie_img" src="../assets/images/movie-tag-2DIMAX.png" alt="">
                </span><br>
                <span>{{ starXx[0] }}/{{ starXx[1] }}/{{ starXx[2] }}</span><br>
            </div>
            <div>
                <span>{{ ViewNm.onlineDate }} / {{ ViewNm.dur }}分钟</span>
            </div>
            <div class="btn">
                
            </div>
        </div>

    </div>
</template>

<script>
import { getMovieDetail } from "../api/movie"
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
    setup() {
        const state = useStore();
        const router = useRouter();
        const route = useRoute();
        let ViewNm = ref(''); //影片信息
        let catXx = ref([])
        let starXx = ref([])

        let storeId = ref(state.state.id);

        let getDteailFun = (id) => {
            console.log(id);
            getMovieDetail({ movieId: id }).then((data) => {
                console.log(data);
                ViewNm.value = data.movie
                catXx.value = data.movie.cat.split(",");
                starXx.value = data.movie.star == null ? null : data.movie.star.split(",");
            })
        }
        getDteailFun(storeId.value)

        return {
            ViewNm,
            catXx,
            starXx
        };


    }


}
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}

.ViewXx {
    height: 1000px;
    overflow-y: scroll;
    background-color: aqua;
}

.top .old {
    width: 100%;
    // overflow: hidden;
    background-color: #664d29;
    padding: 21px 16px;
    box-sizing: border-box;
    // display: flex;
    align-items: center;
    color: #ccc;
    // margin-bottom: 15px;
}

.V_Xx {
    background-color: orchid;
    // height: 50px;
    // width: 100%;
}

.Xx_img {
    float: left;
    // display: flex;
    width: 100px;
    height: 138px;
}

.movie_img {
    border-radius: 2px;
    margin-left: 4px;
    vertical-align: text-bottom;
    // display: flex;
    align-items: center;
    height: 14px;

}
</style>