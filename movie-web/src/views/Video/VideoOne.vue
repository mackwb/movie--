<template>
    <div class="total" v-if="showview">
        <div id="kuang">
            <div class="all" v-for="item, index in Video" :key="index" @click="goPlay(item.id)">
                <div class="aaa">
                    <!-- <img :src="item.video.imgUrl" alt=""> -->
                    <div class="video-item" v-for="item in videoList" :key="item.id"></div>
                    <video :src="item.video.url"></video>
                    <div id="play" class="play" @click="goPlay(item.id)"></div>
                </div>
                <div class="bbb">
                    <img :src="item.user.avatarurl" id="maoyan">
                    <h4 id="word">{{ item.user.nickName }}</h4>
                    <img src="../../assets/images/video-praise.png" alt="" class="dianzan" id="maoyan"><!-- <img src="../../../src/alreadyUp.png" alt="" id="whitehand"> -->
                    <p id="word1" @click="handleAdd">{{ item.upCount }}</p>
                    <img src="../../assets/images/video-comment.png" alt="" class="liuyan" id="maoyan">
                    <p id="word2">{{ item.converterType }}</p>
                    <img src="../../assets/images/video-share.png" alt="" class="zhuanfa" id="maoyan">
                </div>
            </div>
        </div>
    </div>
    <div class="lodaing" v-else="showview">
        <div class="img">
            <img class="img1" src="../../assets/images/maoyan01.png" alt="" />
            <img class="img2" src="../../assets/images/maoyan02.png" alt="" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getMoreVideos } from '../../../../woter_movie/src/api/video'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {

    setup() {

        // const onLoad = () => {
        //     getMoreVideos(1331498).then((data) => {
        //         console.log(data);
        //         Video.value = data.data.feeds[0].images;
        //         console.log(data.data.feeds[0].images);
        //     })

        // }

        const router = useRouter()
        const store = useStore()
        const Video = ref([])
        // const list = ref([])
        const videoList = ref([])
        const navDate = ref([]) 
        let navId = ref(4)
        let showview = ref(false)


        getMoreVideos(81).then((data) => {
            console.log(data);
            // Video.value = data.data.feeds[0].shareInfo.img
            //  Video.value = data.data.feeds[0].user.avatarurl
            // Video.value = data.data.feeds[0].commentCount
            // Video.value = data.data.feeds[0].converterType
            Video.value = data.data.feeds
            videoList.value = data.data.feeds
            console.log(videoList.value);

            setTimeout(() => {
                    showview.value = true;
                }, 2000);


            // console.log(data.data.feeds[0].images,data.data.feeds[1].title);
            // list.value = data.data.feeds
            //console.log(Video.value)
            let commitData = JSON.parse(window.localStorage.getItem('commitlist'))
            if (commitData != null) {
                videoList.value.forEach(item => {
                    item.commentCount = 0
                    commitData.forEach(k => {
                        if (item.id == k.id) {
                            item.commentCount = k.commiInfo.length
                        }
                    })
                })
            }
        })
        /* let navId = navData == null ? ref(4) : ref(navData.id) */

        

        let goPlay = (id) => {
            console.log(id);
            store.commit('setVideoId', id)
            router.push({
                path: "",
                query: {
                    id: id
                }
            })
        }

        return {
            Video,
            videoList,
            goPlay,
            showview
        
        };
    },


}
</script>

<style lang="scss" scoped>
.total .all .aaa #play {
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 1;
    top: 89px;
    left: 170px;
}

.total .all .aaa video {
    width: 375px;
}

.total {
    height: 100%;
}

.total .all .aaa {
    position: relative;
    width: 375px;
    
}

.total .all .aaa img {
    width: 375px;
    height: 220px;
}

.all .bbb {
    width: 375px;
    height: 46px;
    background-color: #fff;
    display: flex;

}

#maoyan {
    width: 20px;
    height: 20px;
    margin-top: 12px;
    margin-left: 8px;

}

#whitehand {
    
    right: 159px;
}

#kuang {
    height: 667px;
    overflow: auto;
}

.total .all .bbb #word {
    margin-left: 5px;
    margin-top: 12px;
    margin-right: 75px;
}

.total .all .bbb span img {
    width: 20px;
    height: 20px;
    margin-top: 12px;
    position: absolute;
    left: 159px;
}

.total .all .bbb #word1 {
    margin-left: 5px;
    margin-top: 14px;
    margin-right: 18px;
}

.total .all .bbb #word2 {
    margin-left: 5px;
    margin-top: 14px;
    margin-right: 18px;
}

.lodaing {
    width: 100%;
    height: 85vh;
    position: fixed;
    bottom: 50px;
    left: 0;
    background-color: #fff;
    z-index: 99;

    .img {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 45px;
        height: 45px;

        img {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 3;
        }

        .img2 {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            -webkit-animation: rotation 15s linear infinite;
            animation: rotation 15s linear infinite;
        }
    }
}

@keyframes rotation {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

</style>