<template>
    <div class="Video_play">
        <!-- <h2>视频播放</h2> -->
        <vue3VideoPlay :src="VideoUrl" />
    </div>
</template>

<script>
import { getMovieDetail } from "../api/movie.js";
import { getCommitsData } from "../api/commit.js";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
/*  */
import { reactive } from 'vue';

export default {

    setup() {
        const route = useRoute();
        const router = useRouter();
        let video = ref(null);
        let videolist = ref([]); //视频列表
        let playVideo = ref([]); //当前播放视频
        let playflag = ref(false);
        let iconPlay = ref(false);
        let nextflag = ref(false);
        let tabflag = ref(true);
        let flag = ref(false);
        let videoIndex = ref(0);
        let VideoUrl = ref([])

        let getVideoFun = () => {
            getMovieDetail({ movieId: route.query.id }).then((data) => {
                console.log(data);
                videolist.value = [...data.feedVideos.feeds];//把所有当前视频的小视频合并在一个集合里
                if (route.query.freedId) {
                    let index = videolist.value.findIndex((item) => item.id == route.query.freedId)//查找当前视频的索引值
                    // console.log(index);
                    videoIndex.value = index;
                    playVideo.value = videolist.value[videoIndex.value];
                    VideoUrl.value = playVideo.value.video.url

                    console.log(playVideo.value);
                    console.log(VideoUrl.value);

                }
                // console.log(videolist.value);//所有视频集合
                // console.log(route.query.freedId);//视频列表的视频id
                // console.log(playVideo.value);


            })

        }
        getVideoFun()

        return {
            getVideoFun,
            videolist,
            playVideo,
            videoIndex,
            VideoUrl
        }
    }


}
</script>

<style lang="scss">
.d-player-wrap{
    width: auto !important;
    height: auto !important;

}
</style>