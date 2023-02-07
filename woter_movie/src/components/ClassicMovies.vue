<script>
import { ref } from "vue";
import { getMoreClassic } from "../api/classic.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    // sortId=1&showType=3&limit=10&offset=0
    const router = useRouter();
    const route = useRoute();
    const state = useStore();
    let classiclist = ref(null);
    let loading = ref(false);
    let finished = ref(false);
    let showData = ref(true);
    let limit = ref(10);
    let cityId = route.query.id == null ? 20 : ref(route.query.id);

    //获取经典电影数据
    getMoreClassic({
      sortId: 1,
      showType: 3,
      limit: limit.value,
      offset: 0,
    }).then((data) => {
      if (data) {
        setTimeout(() => {
          showData.value = false;
        }, 800);
      }
      classiclist.value = data;
    });
    // 电影详情
    let detail = (id) => {
      console.log(id);
      state.commit("detail", id);
      router.push({
        path: "/moviedetail",
        query: {
          cityId: cityId.value,
        },
      });
    };
    // 加载更多
    const onLoad = () => {
      // console.log("触底");
      limit.value += 10;
      getMoreClassic({
        sortId: 1,
        showType: 3,
        limit: limit.value,
        offset: 0,
      }).then((data) => {
        loading.value = true;
        if (data) {
          setTimeout(() => {
            loading.value = false;
            classiclist.value = data;
          }, 800);
          if (limit.value >= 50) {
            finished.value = true;
          }
        }
      });
    };
    return {
      limit,
      loading,
      finished,
      showData,
      classiclist,
      onLoad,
      getMoreClassic,
      detail,
    };
  },
};
</script>

<template>
  <div class="classic-movie">
    <section>
      <div :class="['page-wrap', 'classic', 'active', { stop: loading }]">
        <div class="tab-block">
          <div class="tab-content">
            <div class="page classic">
              <div class="list-wrap">
                <div class="classic-movies">
                  <div class="classic-movies-list" v-if="classiclist">
                    <van-list
                      v-model:loading="loading"
                      :finished="finished"
                      :immediate-check="false"
                      @load="onLoad"
                    >
                      <div
                        class="classic-movie"
                        v-for="item in classiclist"
                        :key="item.movieId"
                      >
                        <div class="avatar">
                          <img
                            :src="item.poster"
                            v-lazy="item.poster"
                            alt=""
                            @click="detail(item.movieId)"
                          />
                        </div>
                        <div class="movie-info">
                          <div class="title line-ellipsis">
                            {{ item.movieInfo.title }}
                          </div>
                          <div class="english-title line-ellipsis">
                            {{ item.movieInfo.englishTitle }}
                          </div>
                          <div class="actors line-ellipsis">
                            {{ item.movieInfo.actors }}
                          </div>
                          <div class="show-info line-ellipsis">
                            {{ item.movieInfo.showInfo }}
                          </div>
                        </div>
                        <div class="movie-score">
                          <div class="no-score" v-if="!item.score">
                            暂无评分
                          </div>
                          <div class="score line-ellipsis" v-else>
                            <span class="grade">{{ item.score }}</span>
                            <span>分</span>
                          </div>
                        </div>
                      </div>
                    </van-list>
                  </div>
                </div>
                 <div class="lodaing" v-if="showData">
                        <div class="img">
                          <img
                            class="img1"
                            src="../assets/images/maoyan01.png"
                            alt=""
                          />
                          <img
                            class="img2"
                            src="../assets/images/maoyan02.png"
                            alt=""
                          />
                        </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<style lang="less" scoped>
.classic-movie {
  overflow: hidden;
  flex: 1;
  position: relative;

  .page-wrap {
    display: block;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    position: absolute;

    .page {
      width: 100%;
      flex: auto;
      display: block;

      .list-wrap {
        background-color: #f5f5f5;

        .classic-movies {
          background-color: #fff;
          padding-top: 14.5px;

          .classic-movies-list {
            .classic-movie {
              position: relative;
              margin: 0 0 20px 20px;
              display: flex;
              align-items: flex-start;

              .avatar {
                display: inline-block;

                & > img {
                  width: 66px;
                  height: 94px;
                }
              }
              .movie-info {
                height: 100%;
                margin-left: 10px;
                display: inline-block;
                font-size: 13px;
                line-height: 18px;
                color: #666;
                flex: 1;
                overflow: hidden;

                & > div {
                  margin-bottom: 4px;
                }
                .title {
                  height: 24px;
                  font-size: 17px;
                  line-height: 24px;
                  color: #333;
                  font-weight: 700;
                }
                .actors,
                .show-info,
                .english-title {
                  height: 18px;
                  line-height: 18px;
                }
              }
              .movie-score {
                width: 60px;
                height: 17px;
                font-size: 12px;
                color: #999;
                line-height: 17px;
                display: inline-block;
                text-align: center;

                .score {
                  .grade {
                    color: #faaf00;
                    font-size: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .stop {
      overflow: hidden;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
@keyframes animation1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
      animation: animation1 1s linear 0s infinite;
    }
  }
}
::v-deep .van-loading {
  height: 45px;
  line-height: 45px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 45px;
  background-color: #f5f5f5;
}
</style>