<template>
    <div class="Video_play">
        <!-- <h2>视频播放</h2> -->
        <div class="Play">

            <van-sticky>
                <div class="Play_top">
                    <div>
                        <vue3VideoPlay :src="VideoUrl" />
                    </div>
                </div>

                <div class="Play_up">
                    <div class="Play_Xx_Nav">
                        <div class="Xx_Nav" @click="tabflag = !tabflag">
                            <div :class="['tab-name', { 'tab-active': tabflag }]">
                                简介
                                <div class="nav-active" v-if="tabflag"></div>
                            </div>
                        </div>
                        <div class="Xx_Nav" @click="tabflag = !tabflag">
                            <div :class="['tab-name', { 'tab-active': !tabflag }]">
                                评论
                                <div class="nav-active" v-if="!tabflag"></div>
                                <div class="comment-total">{{ playVideo.commentCount }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-sticky>

            <div class="">
                
                <div class="View_title"><p>{{ playVideo.title }}</p></div>
                <div class="View_date"><span><p>{{ time(playVideo.onlineTime) }}</p></span></div>
                <div class="Gn_box">
                    <div class="Gn_item" @click="thumbsUp(playVideo.id)">
                        <img class="movie-img" v-if="!Pd" src="../assets/images/middle-1.png" alt="" />
                        <img class="movie-img" v-if="Pd" src="../assets/images/alreadyUp.png" alt="" />
                        <div>{{ playVideo.upCount }}</div>
                    </div>
                    <div class="Gn_item">
                        <img class="movie-img" src="../assets/images/middle-3.png" alt="" />
                        <div>435</div>
                    </div>
                    <div class="Gn_item">
                        <img class="movie-img" src="../assets/images/middle-4.png" alt="" />
                        <div>1014</div>
                    </div>
                </div>

                <div class="All_move">
                    <div>{{ View_Nm }}全部视频</div>
                    <section>
                        <ul>
                            <li v-for="item in videolist" :key="item.id" @click="update(item.id)">
                                <div><img :src="item.video.imgUrl" class="movie-img"></div>
                            
                                <!-- <span class="label">预告片</span> -->
                                <!-- <span class="txt" v-if="item.id == playVideo.id">播放中</span> -->
                                <div>
                                    {{ item.title }}
                                </div>
                            </li>

                        </ul>
                    </section>
                </div>


            </div>

        </div>


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
        let View_Nm = ref([])
        let playflag = ref(false);
        let iconPlay = ref(false);
        let nextflag = ref(false);
        let Pd = ref(false)
        let tabflag = ref(true);
        let flag = ref(false);
        let videoIndex = ref(0);
        let VideoUrl = ref([])


        let getVideoFun = () => {
            getMovieDetail({ movieId: route.query.id }).then((data) => {
                // console.log(data);
                videolist.value = [...data.feedVideos.feeds];//把所有当前视频的小视频合并在一个集合里
                if (route.query.freedId) {
                    let index = videolist.value.findIndex((item) => item.id == route.query.freedId)//查找当前视频的索引值
                    // console.log(index);
                    videoIndex.value = index;
                    playVideo.value = videolist.value[videoIndex.value];
                    View_Nm.value = playVideo.value.shareInfo.content
                    VideoUrl.value = playVideo.value.video.url

                    console.log(View_Nm.value);
                    // console.log(playVideo.value);
                    // console.log(VideoUrl.value);
                    // console.log(tabflag.value);
                    // console.log(playVideo.value.onlineTime);

                }
                console.log(videolist.value);//所有视频集合
                // console.log(route.query.freedId);//视频列表的视频id
                // console.log(playVideo.value);
            })

        }
        // 过滤时间
        let time = (value) => {
            // console.log(value);
            var time = new Date(value);
            var y = time.getFullYear();
            var m =
                time.getMonth() + 1 < 10
                    ? "0" + (time.getMonth() + 1)
                    : time.getMonth() + 1;
            var d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();

            return `${y}-${m}-${d}`;
        }
        //点赞
        let thumbsUp = (id) => {
            Pd.value = !Pd.value
            // console.log(Pd.value);
            // console.log(id);
            let index = videolist.value.findIndex((item) => item.id == id);
            if (Pd.value) {
                videolist.value[index].upCount = videolist.value[index].upCount + 1;
            } else {
                videolist.value[index].upCount = videolist.value[index].upCount - 1;
            }
        };

        //
        let update = (id) =>{
            console.log(id);
            console.log(videolist.value);
            let index = videolist.value.findIndex((item) => item.id == id)
            playVideo.value = videolist.value[index]
            VideoUrl.value = playVideo.value.video.url
            console.log(VideoUrl.value);
            // console.log( videolist.value[index]);
            // let index = videolist.value[id]

            console.log(index);
        }
        getVideoFun()
        return {
            getVideoFun,
            videolist,
            playVideo,
            videoIndex,
            VideoUrl,
            tabflag,
            time,
            thumbsUp,
            Pd,
            View_Nm,
            update

        }
    }


}
</script>

<style lang="scss">
.Video_play {
    height: 100%;
}

/* .Play {
    // height: 2000px;
} */

.d-player-wrap {
    width: auto !important;
    height: auto !important;
}

.Play_Xx_Nav {
    width: 100%;
    background-color:#fff;
    height: 38.5px;
    display: flex;
    border-color: #fff;
    .Xx_Nav {
        flex: 1;
        height: 38.5px;
        font-weight: 700;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #000;
        letter-spacing: 0;
        text-align: center;
        display: flex;
        justify-items: center;
        flex-direction: column;

        .tab-name {
            height: 38.5px;
            line-height: 38.5px;
            position: relative;

            .nav-active {
                width: 19px;
                height: 1.9px;
                background: #f03d37;
                border-radius: 1px;
                position: absolute;
                top: 36px;
                left: 50%;
                transform: translateX(-50%);
            }

            .comment-total {
                position: absolute;
                left: 50%;
                top: -10px;
                font-weight: 400;
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #f03d37;
                letter-spacing: 0;
                text-align: center;
                transform: translateX(20px);
            }
        }

        tab-active {
            font-weight: 700;
            font-family: PingFangSC-Medium;
            color: #333;
            font-size: 16px;
        }
    }
}

.Gn_item {
    flex: 1;
    width: 28px;
    height: 47px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-weight: 700;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #666;

    .movie-img {
        width: 26px;
        height: 26px;
        margin-bottom: 5px;
        background: #fff;

        div {
            height: 18px;
            line-height: 18px;
        }
    }
}

.movie-img {
    width: 124px;
    height: 70px;
    border-radius: 3px;
}
.View_title p{
    height: 40px;
    line-height: 26px;
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: 520;
}
.View_date span p{
    height: 30px;
    line-height: 26px;
    font-size: 16px;
    color: #aaa
}
.Gn_box{
    display: flex;
    
}
.Gn_box .Gn_item{
    flex: 1;
}
.All_move{
    width: 100%;
}
.All_move>div{
    height: 30px;
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    margin: 20px 0 15px 10px;
}
.All_move ul li{
    display: flex;
    width: 335px;
    border-bottom: 1px solid #ccc;
    margin-left: 10px;
    margin-right: 40px;
    margin-bottom:5px;
}
.All_move ul li img{
    width: 120px;
    
}
.All_move ul li div:nth-child(1){
    width: 120px;
    margin-right:10px;
}
.All_move ul li div:nth-child(2){
    width: 220px;
    line-height:22px;
    font-size:14px;
    font-weight:500;
}
.All_move ul li.hover>div:nth-child(2){
    color:red;
}
</style>