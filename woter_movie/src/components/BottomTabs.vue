<template>
    <div>
        <footer class="bottom-nav-bar">
            <ul class="foot-list">
                <li v-for="(item,index) in tabList" :key="index">
                    <div @click="setLink(item.link)">
                    <span  class="nav-icons">
                        <img v-show="btabId!=index" :src="item.img1" alt="">
                        <img v-show="btabId==index" :src="item.img2" alt="">
                        </span>
                    <span :class="['nav-text',{'current':btabId==index}]">{{item.name}}</span>
                     </div>
                </li>
            </ul>
        </footer>  
    </div>
</template>

<script>
import { ref } from 'vue';
import {useRouter} from 'vue-router'
export default {
    props:["index"],//添加属性
    setup(props) {
       let router = useRouter();

       let btabId = ref(props.index)
       let tabList = ref([
            {
                        img1:require("../assets/images/电影select.png"),
                        img2:require("../assets/images/电影.png"),
                        name:'电影/影院',
                        link:'/home'
                    },
                    {
                        img1:require("../assets/images/01.png"),
                        img2:require("../assets/images/selected-video.png"),
                        name:'视频',
                        link:'/videos'
                    },
                    {
                        img1:require("../assets/images/02.png"),
                        img2:require("../assets/images/selected-shortvideo.png"),
                        name:'小视频',
                        link:'/shortvideo'
                    },
                    {
                        img1:require("../assets/images/hd.png"),
                        img2:require("../assets/images/hd01.png"),
                        name:'活动',
                        link:'/activitylist'
                    },
                    {
                        img1:require("../assets/images/3.1我的.png"),
                        img2:require("../assets/images/3.1我的select.png"),
                        name:'我的',
                        link:'/my'
                    },
       ])

       let setLink = (link) =>{
            router.push(link)
       }

         return {
            btabId,
            tabList,
            setLink
        };
    },
}
</script>

<style lang="less" scoped>
.bottom-nav-bar{
    height: 48.8px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    .foot-list {
        width: 100%;
        background: #fff;
        border-top: 0.01rem solid #d8d8d8;
        display: flex;
        justify-content: space-around;
        padding-bottom: env(safe-area-inset-bottom);
    
        &>li {
            float: left;
            width: 75px;
            height: 48px;
            line-height: 48px;
            box-sizing: border-box;
            color: #f03d37;
            position: relative;
            text-align: center;
            flex: 1;
    
                .nav-icons {
                    display: block;
                    width: 25px;
                    height: 25px;
                    margin: auto;
                    background-repeat: no-repeat;
                    background-size: 0.5rem;
                    
                    &>img{
                        width: 25px;
                        height: 25px;
                        display: inline-block;
                    }
                    &>svg {
                        width: 25px;
                        height: 25px;
                    }
                }
    
                .nav-text {
                    height: 12px;
                    line-height: 12px;
                    position: absolute;
                    top: 31px;
                    left: 0;
                    right: 0;
                    font-size: 12px;
                    color: #696969;
                }
    
                .current {
                    color: #f03d37;
                }
            }
    }
}
</style>