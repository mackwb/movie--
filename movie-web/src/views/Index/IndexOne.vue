<template>
    <div class="box">
        <!-- <h2>第一页</h2> -->
        <p class="title">{{ movie.title }}</p>
        <div class="mv_box">

            <div class="mv_nm" v-for="item in movie.movieList" :key="item.movieId">
                <img class="mv_img" :src="item.poster" alt="" />
                <h5 class="name">{{ item.name }}</h5>
            </div>
        </div>
        <div>

        </div>



    </div>
</template>

<script>
import { getMostpraised, getHotmovies } from '../../../../woter_movie/src/api/home'
export default {
    data() {
        return {
            movie: []
        }
    },
    methods: {
        handName() {
            console.log(111);
        }
    },
    created() {
        getMostpraised().then((data) => {
            this.movie = data
            console.log(this.movie);
        })
        // this.$store.dispatch('mes/huoQu').then((data) => {
        //     this.movie = data
        //     console.log(this.movie);
        //     this.$store.commit('mes/updateToken',data)
        //     console.log(this.$store.state.mes.message);
        // })
    }

}
</script>

<style lang="scss" scoped>
.box {
    flex: 1;
    position: relative;
}

html div {
    height: 2000px;
}

.mv_nm {
    width: 64px;
    height: 90px;
}

.mv_box {
    display: flex;
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