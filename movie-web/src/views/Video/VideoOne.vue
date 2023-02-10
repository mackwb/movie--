<template>
    <div class="total">
        <div id="kuang">
            <div class="all" v-for="item, index in Video" :key="index">
                <div class="aaa">
                    <img :src="item.shareInfo.img" alt="">
                    <img src="../../assets/images/video-btn-play.png" alt="" id="play">
                </div>
                <div class="bbb">
                    <img :src="item.user.avatarurl" id="maoyan">
                    <h4 id="word">{{ item.user.nickName }}</h4>

                    <img src="../../assets/images/video-praise.png" alt="" class="dianzan" id="maoyan"><span>
                        <img src="../../assets/images/alreadyUp.png" alt=""></span>

                    <p id="word1" @click="handleAdd">{{ item.upCount }}</p>
                    <img src="../../assets/images/video-comment.png" alt="" class="liuyan" id="maoyan">
                    <p id="word2">{{ item.converterType }}</p>
                    <img src="../../assets/images/video-share.png" alt="" class="zhuanfa" id="maoyan">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getMoreVideos } from '../../api/video'

export default {

    setup() {
        const Video = ref([])

        // const list = ref([])

        getMoreVideos(8).then((data) => {
            console.log(data);
            Video.value = data.data.feeds
        })

       


        return {
            Video,

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

.total {
    height: 100%;
}

.total .all .aaa {
    position: relative;
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
    right: 159px;
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
</style>