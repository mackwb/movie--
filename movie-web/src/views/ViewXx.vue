<template>
    <div class="ViewXx">
        <div class="top">
            <div class="old" @click="back">卖票猫&nbsp;>&nbsp;{{ ViewNm.nm }}</div>
        </div>
        <div class="V_Xx">
            <!-- 电影大概信息 -->
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
            <!-- 想看 按钮 -->
            <div class="btn">
                <button :class="{ 'want_watch': ViewNm.guideToWish }" @click="wish" plain hairline
                    type="primary"><span>{{ ViewNm.guideToWish ? "已看" : "想看" }}</span></button>
                <button plain hairline type="success">细边框按钮</button>
            </div>

            <div class="View_Pf">
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
                        <div class="num_over">
                            <span>
                                <count-to :startVal="StNum" :endVal="EndNum2" :decimals="2" :duration="3000"></count-to>
                            </span>
                            <span>已看</span>
                        </div>
                    </div>
                </div>
                <div class="Pf_left">

                </div>

                <div class="Pf_right">
                    <div class="right">
                        <div class="stars_bar bar1">
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

                        <div class="stars_bar">
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
                        <div class="stars_bar">
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
                        <div class="stars_bar">
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
                        <div class="stars_bar">
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
                </div>

            </div>
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
        let catXx = ref([])
        let starXx = ref([])
        let storeId = ref(state.state.id);
        let StNum = ref(0)
        let EndNum = ref(0)
        let EndNum2 = ref(0)

        let getDteailFun = (id) => {
            console.log(id);
            getMovieDetail({ movieId: id }).then((data) => {
                console.log(data);
                ViewNm.value = data.movie
                ViewNm.value.guideToWish = false
                // console.log(ViewNm.value.guideToWish);
                console.log(ViewNm.value.wish);

                EndNum.value = ViewNm.value.watched //想看人数
                EndNum2.value = ViewNm.value.wish//已看人数

                catXx.value = data.movie.cat.split(","); //对电影演员做逗号筛选
                starXx.value = data.movie.star == null ? null : data.movie.star.split(","); //对电影类型做逗号筛选返回
            })
        }
        getDteailFun(storeId.value);

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

        return {
            ViewNm,
            catXx,
            starXx,
            wish,
            StNum,
            EndNum,
            EndNum2
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
    background-color: rgb(87, 39, 35);
    padding: 21px 16px;
    box-sizing: border-box;
    // display: flex;
    align-items: center;
    color: #ccc;
    // margin-bottom: 15px;
}

.V_Xx {
    background-color: rgb(87, 39, 35);
    color: #fff;
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

.btn button {
    // padding: 15px;
    border: none;

    // justify-content: center;
    // align-items: center;
    background: hsla(0, 0%, 100%, 0.35);
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    font-size: 14px;
    width: 40%;
    height: 30px;
    line-height: 14px;
    color: #fff;
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
    padding: 9px 10px 10px 0;
    box-sizing: border-box;
}

.stars_bar {
    display: flex;
    align-items: center;
    margin-bottom: 3px;

}

.stars {
    // display: flex;
    justify-content: flex-end;
    align-items: center;
    // width: 35px;
}

.stars_bar .bar {
    width: 71px;
    height: 4px;
    background-color: hsla(0, 58%, 53%, 0.06);
    border-radius: 1px;
    margin-left: 4px;
}

.stars_bar .bar .percent {
    height: 100%;
    width: 0;
    background: hsla(0, 0%, 100%, 0.3);
    border-radius: 1px;
    transition: width 1.5s;
}

.bar1 .bar .percent .active1 {
    animation: animation2 1s linear forwards;
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