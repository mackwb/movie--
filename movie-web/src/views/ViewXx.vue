<template>
    <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div v-if="showview" class="ViewXx" :style="{ backgroundColor: ViewNm.backgroundColor }">
        <div class="top">
            <div class="old" @click="back">卖票猫&nbsp;>&nbsp;{{ ViewNm.nm }}</div>
        </div>
        <div class="V_Xx">
            <!-- 电影大概信息 -->
            <img class="Xx_img" :src="ViewNm.img" alt="">
            <div v_xx>
                <h3 class="movie_nm">{{ ViewNm.nm }}</h3>
                <span class="V_Xxone">{{ ViewNm.enm }}</span><br>
                <span class="V_Xxone">{{ catXx[0] }}/{{ catXx[1] }}
                    <img class="movie_img" src="../assets/images/movie-tag-2DIMAX.png" alt="">
                </span><br>
                <span class="V_Xxone starname">{{ starXx[0] }}/{{ starXx[1] }}/{{ starXx[2] }}</span><br>
            </div>
            <div>
                <span class="V_Xxone">{{ ViewNm.onlineDate }} / {{ ViewNm.dur }}分钟</span>
            </div>
            <!-- 想看 按钮 -->
            <div class="btn">
                <button :class="{ 'want_watch': ViewNm.guideToWish }" @click="wish" plain hairline
                    type="primary"><van-icon class="btn_icon" name="like" />
                    <span>{{ ViewNm.guideToWish ? "已看" : "想看" }}</span></button>
                <button plain hairline type="success"><van-icon class="btn_icon" name="star" />看过</button>
            </div>

            <div class="View_Pf" v-if="ViewNm.scoreLabel != '暂无评分'">

                <div class="Pf_top">

                    <div class="left">
                        <img src="../assets/images/logo-new.png" alt="" />
                        <span>{{ ViewNm.scoreLabel }}</span>
                    </div>

                    <div class="right">
                        <div class="num">
                            <span>
                                <count-to :startVal="StNum" :endVal="EndNum" :decimals="2" :duration="3000"></count-to>
                            </span>
                            <span>人想看</span>
                        </div>
                        <div class="num_over num">
                            <span>
                                <count-to :startVal="StNum" :endVal="EndNum2" :decimals="2" :duration="3000"></count-to>
                            </span>
                            <span>看过&nbsp;&nbsp;></span>
                        </div>
                    </div>

                </div>

                <div class="Pf_left">
                    <div>
                        <span class="score">{{ ViewNm.sc }}</span><br>
                        <div class="people-grade">
                            <span>
                                <count-to class="people-gradeone" :startVal="StNum" :endVal="EndNum3" :decimals="2"
                                    :duration="3000"></count-to>&nbsp;人评</span>
                        </div>

                    </div>
                </div>

                <div class="Pf_right">

                    <div class="stars-percent-bar">
                        <div class="stars">
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                        </div>
                        <div class="bar">
                            <div class="percent" :class="{ active1: !loading }"></div>
                        </div>
                    </div>

                    <div class="stars-percent-bar">
                        <div class="stars">
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                        </div>
                        <div class="bar">
                            <div class="percent" :class="{ active1: !loading }"></div>
                        </div>
                    </div>
                    <div class="stars-percent-bar">
                        <div class="stars">
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                        </div>
                        <div class="bar">
                            <div class="percent" :class="{ active1: !loading }"></div>
                        </div>
                    </div>
                    <div class="stars-percent-bar">
                        <div class="stars">
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                        </div>
                        <div class="bar">
                            <div class="percent" :class="{ active1: !loading }"></div>
                        </div>
                    </div>
                    <div class="stars-percent-bar">
                        <div class="stars">
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/grey-star.png" alt="" />
                            <img src="../assets/images/white-star.png" alt="" />
                        </div>
                        <div class="bar">
                            <div class="percent" :class="{ active1: !loading }"></div>
                        </div>
                    </div>
                </div>

                <div class="View_Pm">
                    <div class="Pm_box">
                        <div class="Pm_a">
                            <span>TOP</span>
                            <span>{{ ViewPf.movieRank }}</span>
                        </div>
                        <div class="Pm_b">
                            <span class="first-word">{{ ViewPf.firstWord }}</span>
                            <span class="second-word">{{ ViewPf.secondWord }}</span>
                        </div>

                    </div>
                </div>

            </div>
            <!-- 没有评分显示的评分页面 -->
            <div class="View_Pf" v-if="ViewNm.scoreLabel == '暂无评分'">
                <div class="Pf_top">
                    <img src="../assets/images/logo-new.png" alt="" />
                    <span>猫眼想看</span>
                </div>
                <div>
                    <div class="num">
                        <span>
                            <count-to :startVal="StNum" :endVal="EndNum4" :decimals="2" :duration="3000"></count-to>
                        </span>
                        <span>人想看</span>
                    </div>

                </div>
            </div>
        </div>
        <!-- 简介 -->
        <div class="View_Jj">
            <div class="Jj_top">
                <span style="color:white">简介</span>
                <button type="button" :class="[{ open: open }, { close: !open }]" @click="open = !open">
                    <span class="Jj_topall">展开</span>
                    <img src="..//assets/images/arrow-right.png" alt="">
                </button>
            </div>
            <div class="Jj_up">
                <p :class="['normal-line', { 'line-clamp': open }]">
                    {{ ViewNm.dra }}
                </p>
            </div>
        </div>

        <!-- 演员列表 -->
        <div class="View_Yy">
            <div class="Yy_top">
                <span>演职人员</span>
                <div>
                    <span class="Yy_topall">全部</span>
                    <img src="../assets/images/arrow-right.png" alt="">
                </div>
            </div>
            <div class="Yy_up">
                <ul>
                    <li v-for="(item, index) in ViewYy" :key="index">
                        <div class="Yy">
                            <img :src="item.avatar">
                            <h4 class="Yy_Nm">{{ item.cnm }}</h4>
                            <p class="Yy_Ys">{{ item.desc }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 视频推荐 -->
        <div class="View_Sp">
            <div class="Sp_top">
                <span>视频推荐</span>
                <div class="View_Spone">
                    <span>全部</span>
                    <img src="../assets/images/arrow-right.png" alt="">
                </div>
            </div>
            <div class="Sp_up">
                <ul>
                    <li v-for="(item, index) in ViewSp" :key="index" @click="showfreed(item.id)">
                        <div class="Sp">
                            <img :src="item.video.imgUrl">
                            <div class="play">
                                <div class="play_p"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 剧照 -->
        <div class="View_Jz">
            <div class="Jz_top">
                <span>剧照</span>
                <div class="View_Jzpone">
                    <span>全部{{ ViewJz.length }}张</span>
                    <img src="../assets/images/arrow-right.png" alt="">
                </div>
            </div>
            <div class="Jz_up">
                <ul>
                    <li v-for="(item, index) in ViewJz" :key="index">
                        <div class="Yy">
                            <img :src="item">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="lodaing" v-else="showview">
        <div class="img">
            <img class="img1" src="../assets/images/maoyan01.png" alt="" />
            <img class="img2" src="../assets/images/maoyan02.png" alt="" />
        </div>
    </div>

</template>

<script>
import { CountTo } from 'vue3-count-to';
import { getMovieDetail } from "../api/movie"
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
    components: {
        CountTo,
    },
    setup() {
        const state = useStore();
        const router = useRouter();
        const route = useRoute();
        let ViewNm = ref(''); //影片信息
        let ViewPf = ref('') //评分信息
        let catXx = ref([])
        let starXx = ref([])
        let ViewYy = ref([])
        let ViewSp = ref(null); //视频推荐
        let ViewJz = ref([]); //剧照
        let ViewPl = ref(null); //评论
        let ViewXgSp = ref(null); //相关视频
        let storeId = ref(state.state.id);
        let StNum = ref(0)
        let EndNum = ref(0)
        let EndNum2 = ref(0)
        let EndNum3 = ref(0)
        let EndNum4 = ref(0)
        let showview = ref(false)

        let open = ref(true); //展开内容

        let loading = ref(true); //加载动画

        let getDteailFun = (id) => {
            console.log(id);
            getMovieDetail({ movieId: id }).then((data) => {
                // console.log(data);
                ViewNm.value = data.movie //电影数据
                ViewNm.value.guideToWish = false
                // console.log(ViewNm.value.wish);
                ViewPf.value = data.reputation //评分
                // console.log(ViewPf.value);
                ViewYy.value = data.celebrities; //演员
                // console.log(ViewYy.value);
                ViewJz.value = data.movie.photos;//剧照
                console.log(ViewJz.value.length);
                ViewSp.value = data.feedVideos == null ? null : data.feedVideos.feeds;//视频
                // console.log(ViewSp.value);
                ViewPl.value = data.comments.hotComments;
                // console.log(ViewPl);
                EndNum.value = ViewNm.value.watched //想看人数
                EndNum2.value = ViewNm.value.wish//已看人数
                EndNum3.value = ViewNm.value.snum
                EndNum4.value = ViewNm.value.wish;

                setTimeout(() => {
                    showview.value = true;
                }, 2000);

                catXx.value = data.movie.cat.split(","); //对电影演员做逗号筛选
                starXx.value = data.movie.star == null ? null : data.movie.star.split(","); //对电影类型做逗号筛选返回
            })
        }
        getDteailFun(storeId.value);

        //跳转预告片详情
        let showfreed = (id) => {
            router.push({
                path: "/homeVideo",
                query: { id: ViewNm.value.id, freedId: id },
            });
        };

        let wish = () => {
            // console.log(1);
            ViewNm.value.guideToWish = !ViewNm.value.guideToWish
            let PD = ViewNm.value.guideToWish
            if (PD) {
                EndNum.value++
            } else {
                EndNum.value--
            }
        }
        /* 返回 */
        const onClickLeft = () => history.back();
        return {
            ViewNm,
            ViewPf,
            ViewYy,
            ViewJz,
            ViewSp,
            ViewXgSp,
            ViewPl,
            catXx,
            starXx,
            wish,
            showfreed,
            StNum,
            EndNum,
            EndNum2,
            EndNum3,
            EndNum4,
            loading,
            open,
            showview,
            /* 返回 */
            onClickLeft
        };



    }


}

</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}

.van-nav-bar {
    opacity: 0;
    position: absolute;
}

.ViewXx {
    height: 1000px;
    overflow-y: scroll;
    padding-left: 4%;
}

.top .old {
    width: 100%;
    // overflow: hidden;
    padding: 4% 0 4% 0;
    box-sizing: border-box;
    // display: flex;
    align-items: center;
    color: #ccc;
    // margin-bottom: 15px;
}

.V_Xx {
    color: #fff;
    // height: 50px;
    // width: 100%;
}

.V_Xxone {
    font-size: 13px;
    color: hsla(0, 0%, 100%, 0.5);
    line-height: 20px;
}

/* 名字间距 */
.starname {
    line-height: 30px;
}

.Xx_img {
    float: left;
    // display: flex;
    width: 30%;
    /* height: 138px; */
    margin-right: 15px;
}

.movie_img {
    border-radius: 2px;
    margin-left: 4px;
    vertical-align: text-bottom;
    // display: flex;
    align-items: center;
    height: 14px;
}

.movie_nm {
    font-size: 22px;
    margin-bottom: 4%;
}

.btn button {
    // padding: 15px;
    border: none;

    // justify-content: center;
    // align-items: center;
    background: hsla(0, 0%, 100%, 0.35);
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    font-size: 14px;
    width: 29%;
    height: 34px;
    line-height: 14px;
    color: #fff;
}

/* 看过图标 */
.btn_icon {
    padding-right: 3%;
}

.btn button:nth-of-type(1) {
    margin-right: 3%;
}

.want_watch {
    background-color: hsla(0, 0%, 100%, 0.2);
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 15%);
    opacity: 0.3;
    font-size: 14px;
}


.View_Pf {
    background-color: rgba(0, 0, 0, 0.18);
    border-radius: 8px;
    margin-top: 15px;
    margin-right: 18px;
    padding: 9px 10px 10px 0;
    box-sizing: border-box;
}

.View_Pf .Pf_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFangSC-Regular;
    padding-left: 10px;
    margin-bottom: 10px;

    .left {
        font-size: 12px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: 400;

        &>img {
            width: 15.6px;
            height: 15.6px;
            margin-right: 4px;
        }

        &>span {
            font-size: 12px;
            color: #fff;
        }

    }

    .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 12px;
        margin-right: 0px;

        .num {
            color: #fff;
            opacity: 0.6;
            font-size: 12px;
            transform: scale(0.9);
        }

        .watch {
            margin-left: 13px;
        }

        .img {
            &>img {
                width: 5px;
                height: 9px;
                margin-left: 4px;
            }
        }
    }
}

.score {
    font-weight: 600;
    font-family: MaoYanHeiTi-H-H;
    font-size: 26px;
    color: #ffb400;
    line-height: 26px;
    letter-spacing: 0;
    text-align: center;
    margin-bottom: 4px;
    margin-left: 45%;


}

.people-grade {
    font-weight: 400;
    opacity: 0.6;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    display: flex;
    word-break: keep-all;
    color: hsla(0, 0%, 100%, 0.4);
    letter-spacing: 0;
    text-align: center;
    line-height: 10px;
    zoom: 0.5;

    &>span {
        font-weight: 400;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        word-break: keep-all;
        color: hsla(0, 0%, 100%, 0.4);
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
        padding-left: 20px;
    }
}

.stars-percent-bar {
    display: flex;
    align-items: center;
    margin-bottom: 3px;

    .stars {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 35px;

        &>img {
            width: 5px;
            height: 5px;
            margin-left: 0.3px;
            opacity: 0.4;
        }
    }

    .bar {
        width: 71px;
        height: 4px;
        background-color: hsla(0, 58%, 53%, 0.06);
        border-radius: 1px;
        margin-left: 4px;

        .percent {
            height: 100%;
            width: 0;
            background: hsla(0, 0%, 100%, 0.3);
            border-radius: 1px;
            transition: width 1.5s;
        }
    }

    &:nth-child(1) {
        .bar {
            .percent {
                &.active1 {
                    animation: animation2 1s linear forwards;
                }
            }
        }
    }

    &:nth-child(2) {
        .bar {
            .percent {
                &.active1 {
                    animation: animation3 1s linear forwards;
                }
            }
        }
    }

    &:nth-child(3) {
        .bar {
            .percent {
                &.active1 {
                    animation: animation4 1s linear forwards;
                }
            }
        }
    }

    &:nth-child(4) {
        .bar {
            .percent {
                &.active1 {
                    animation: animation5 1s linear forwards;
                }
            }
        }
    }

    &:nth-child(5) {
        .bar {
            .percent {
                &.active1 {
                    animation: animation6 1s linear forwards;
                }
            }
        }
    }
}

.bar1 .bar .percent .active1 {
    animation: animation2 1s linear forwards;
}

.View_Pm {
    margin-right: 5px;
    // width: 135px;
    /*  background-color: chartreuse; */
    display: flex;
    justify-content: flex-end;
    align-self: center;
    padding-left: 20px;
    margin-bottom: 20px;
}

.View_Pm .Pm_box {
    width: 300px;
    height: 44px;
    box-sizing: border-box;
    background-image: linear-gradient(270deg,
            rgba(0, 0, 0, 0.04),
            rgba(226, 177, 117, 0.11));
    border-radius: 6px;
    padding: 4px;
    position: relative;
    font-size: 10px;
    color: #fff4bd;
}

.Pf_left {
    // display: flex;
    float: left;
    height: 40px;
    width: 100px;
    /* background-color: hsla(0, 0%, 100%, 0.2); */
}

.Pf_left div :nth-child(n+2) {
    display: flex;
    font-size: 2px;
}

.Pf_right {
    float: left;
    height: 40px;
    /* background-color: rgb(129, 128, 124); */
}

.View_Jj {
    position: relative;
    padding: 15px 10px 10px 0;
    font-size: 16px;

    .Jj_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .Jj_top button {
        font-size: 10px;
        border: none;
        background-color: transparent;
        outline: none;
    }

    .Jj_topall {
        color: #fff;
        opacity: 0.4;
        padding-right: 10px;
    }

    .Jj_top button img {
        width: 5px;
        height: 8px;
        margin-right: 6px;
        display: inline-block;
    }


    .open img {
        transform: rotate(90deg);
    }

    .close img {
        transform: rotate(-90deg);
    }

    .Jj_up {
        font-size: 15px;
        line-height: 26px;
        overflow: hidden;
        color: #fff;

        .normal-line {
            word-wrap: break-word;
            word-break: break-all;
        }

        .line-clamp {

            display: -webkit-box;
            -webkit-line-clamp: 3; //显示行数
            -webkit-box-orient: vertical; //
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}

.View_Yy {
    margin-top: 10px;
    padding-right: 10px;

    .Yy_top {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        div {
            opacity: 0.6;
            font-size: 12px;
            color: #fff;

            img {
                width: 5px;
                height: 8px;
                margin-right: 6px;
                display: inline-block;
            }

            .Yy_topall {
                padding-right: 10px;
            }
        }
    }
}

.Yy_up {
    margin-top: 10px;

    ul::-webkit-scrollbar {
        display: none;
    }

    ul {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-x: scroll;

        li {

            .Yy {
                margin-right: 10px;

                img {
                    width: 80px;
                    height: 112px;
                    display: block;
                    background: none;
                }

                .Yy_Nm {
                    height: 18px;
                    line-height: 18px;
                    color: #fff;
                    font-size: 12px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;
                    text-align: center;
                }

                .Yy_Ys {
                    height: 18px;
                    line-height: 18px;
                    color: #fff;
                    font-size: 12px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 100%;
                    text-align: center;
                    opacity: 0.4;
                }
            }
        }
    }
}

.View_Jz {
    margin-top: 18px;


    .Jz_top {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        .View_Jzpone {
            margin-right: 15px;
        }

        div {
            opacity: 0.6;
            font-size: 12px;
            color: #fff;

            img {
                width: 5px;
                height: 8px;
                margin-left: 6px;
                display: inline-block;
            }
        }
    }

    .Jz_up {
        margin-top: 11px;

        ul {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            overflow-x: scroll;

            li {
                flex-shrink: 0;
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                margin-left: 8px;

                .Yy {
                    width: 140px;
                    height: 93px;
                    display: inline-block;
                    background: #f5f5f5 url("../assets/images/maouanloading.png") no-repeat 50%;
                    background-size: 50%;

                    img {
                        width: 140px;
                        height: 93px;
                    }
                }
            }

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
}

.View_Sp {
    margin-top: 18px;

    .Sp_top {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        div {
            opacity: 0.6;
            font-size: 12px;
            color: #fff;

            img {
                width: 5px;
                height: 8px;
                margin-left: 6px;
                display: inline-block;
            }
        }

        .View_Spone {
            padding-right: 15px;
        }

    }

    .Sp_up {
        margin-top: 11px;

        ul {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            overflow-x: scroll;

            li {
                flex-shrink: 0;
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                margin-left: 8px;

                .Sp {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;

                    img {
                        width: 140px;
                        height: 93px;
                        border-radius: 8px;
                        background: rgba(0, 0, 0, 0.7);
                    }

                    .play {
                        position: absolute;
                        top: 30.5px;
                        left: 54px;
                        box-sizing: border-box;
                        width: 32px;
                        height: 32px;
                        background: hsla(0, 0%, 100%, 0.9);
                        box-shadow: 0 0 0.04rem 0 rgb(0 0 0 / 30%);
                        border-radius: 16px;

                        .play_p {
                            position: absolute;
                            width: 0;
                            height: 0;
                            border-color: transparent transparent transparent #222;
                            border-style: solid;
                            border-width: 6px 9px;
                            top: 10px;
                            left: 13px;
                        }
                    }
                }
            }
        }
    }

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



@keyframes animation2 {
    from {
        width: 0;
    }

    to {
        width: 92.2%;
    }
}

@keyframes animation3 {
    from {
        width: 0;
    }

    to {
        width: 6%;
    }
}

@keyframes animation4 {
    from {
        width: 0;
    }

    to {
        width: 1.9%;
    }
}

@keyframes animation5 {
    from {
        width: 0;
    }

    to {
        width: 0.2%;
    }
}

@keyframes animation6 {
    from {
        width: 0;
    }

    to {
        width: 0.9%;
    }
}
</style>