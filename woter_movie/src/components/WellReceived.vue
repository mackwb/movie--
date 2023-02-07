<template>
  <div class="movie">
    <section>
      <div class="swiper-header"></div>
      <div :class="['page-wrap', 'n-hot', 'show', { stop: loading }]">
        <div class="page">
          <!-- 最受好评电影 -->
          <div id="top-rated-wrap">
            <div class="top-rated">
              <p class="title">{{ Mostpraised.title }}</p>
              <div class="top-rated-list">
                <div
                  class="top-rated-item"
                  v-for="item in Mostpraised.movieList"
                  :key="item.movieId"
                >
                  <div class="poster" @click="detail(item.movieId)">
                    <img :src="item.poster" v-lazy="item.poster"  alt="" />
                    <span class="wish-bg"></span>
                    <span class="score" v-if="item.score">
                      观众评分 &nbsp;
                      <span class="rated-score">{{ item.score }}</span>
                    </span>
                    <span class="score" v-if="!item.score"> 暂无评分 </span>
                  </div>
                  <h5 class="name line-ellipsis">{{ item.name }}</h5>
                </div>
              </div>
            </div>
          </div>
          <!-- 热映电影列表 -->
          <div class="list-wrap" v-if="movieList">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              @load="onLoad"
            >
              <div class="item" v-for="(item, index) in movieList" :key="index" @click.stop="detail(item.id)" >
                <a class="main-block clearfix">
                  <div class="avatar" >
                    <div class="default-img-bg">
                      <img :src="item.img" v-lazy="item.img" alt="" />
                    </div>
                  </div>
                  <div class="mb-outline-b content-wrapper">
                    <div class="content">
                      <div class="movie-title box-flex">
                        <div class="title line-ellipsis">{{ item.nm }}</div>
                        <span
                          class="version v2d imax"
                          v-if="item.version"
                        ></span>
                      </div>
                      <div class="detail">
                        <div class="score line-ellipsis" v-if="item.sc != 0">
                          <span class="score-suffix">观众评 </span>
                          <span class="grade">{{ item.sc }}</span>
                        </div>
                        <div class="score line-ellipsis" v-if="item.sc == 0">
                          <span class="score-suffix">暂无评分 </span>
                          <span class="grade"></span>
                        </div>
                        <div class="actor line-ellipsis">
                          主演:{{ item.star }}
                        </div>
                        <div class="show-info line-ellipsis">
                          {{ item.showInfo }}
                        </div>
                      </div>
                    </div>
                    <div class="button-block" @click.stop="moviebuy(item.id)">
                      <div class="btn">
                        <span class="fix">购票</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </van-list>
          </div>
          <div class="lodaing" v-if="showview">
            <div class="img">
              <img class="img1" src="../assets/images/maoyan01.png" alt="" />
              <img class="img2" src="../assets/images/maoyan02.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getMostpraised, getHotmovies, getMoreHotmovies } from "../api/home.js";
import { nextTick, ref } from "vue";
import { useRouter,useRoute } from 'vue-router';
import { useStore } from "vuex";
export default {
  setup() {
    const route=useRoute()
     const state=useStore()
     const router=useRouter()
    //最受好评电影
    let Mostpraised = ref([]);
    //获取最受好评电影数据
    getMostpraised().then((data) => {
      if (data) {
       setTimeout(()=>{
         showview.value = false;
       },800)
      }
      Mostpraised.value = data;
    });

    //加载动画
    let showview = ref(true);

    //加载更多
    let loading = ref(false);
    let finished = ref(false);
    let start = ref(0);
    let movieIds = ref([]);
    let movieList = ref([]);
    let cityId=route.query.id==null?ref(20):ref(route.query.id)
    let getMoreFun = (lists) => {
      if (lists != undefined) {
        getMoreHotmovies({
          movieIds: lists.slice(start.value, start.value + 12).toString(),
        }).then((data) => {

          movieList.value = [...movieList.value, ...data.coming];
          // console.log("触底了",start.value);
          // console.log("增加了", movieList.value.length);

          nextTick(() => {
            start.value += 10;
            if (start.value >= 40) {
              finished.value = true;
            }
          }).finally(()=>{
            nextTick(()=>{
              loading.value=false
            })
          })
        });
      }
    };
    //加载数据
    const onLoad = () => {
      getHotmovies().then((data) => {
      console.log(data)
        movieIds.value = data.movieIds;
        getMoreFun(movieIds.value);
      });
    };
    let detail=(id)=>{
      state.commit("detail",id)
      router.push(
       {
         path :'/moviedetail',
         query:{
          id:cityId.value
         }
       }
      )
    }
    let moviebuy=(id)=>{
    
      router.push({
        path:'./ticketpurchase',
        query:{
          movieId:id,
          cityId:cityId.value

        }
      })
    }

    return {
      Mostpraised,
      showview,
      loading,
      finished,
      start,
      movieIds,
      movieList,
      onLoad,
      detail,
      moviebuy,
      
    };
  },
};
</script>


<style lang="less" scoped>
.movie {
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
      display: block;
      flex: auto;

      .top-rated {
        padding: 12px 15px;
        background-color: #fff;
        margin-bottom: 10px;

        .title {
          font-size: 14px;
          color: #333;
          margin: 0 0 12px;
        }

        .top-rated-list {
          overflow-x: scroll;
          white-space: nowrap;
          font-size: 0;

          .top-rated-item {
            display: inline-block;
            width: 85px;
            overflow: hidden;
            margin-right: 10px;

            .poster {
              width: 85px;
              height: 115px;
              position: relative;
              margin-bottom: 6px;
              background-color: #e1e1e1;
              background-size: 100% 100%;

              .wish-bg {
                display: inline-block;
                width: 100%;
                height: 35px;
                position: absolute;
                bottom: 0;
                background-image: linear-gradient(
                  -180deg,
                  rgba(77, 77, 77, 0),
                  #000
                );
              }

              .score {
                position: absolute;
                left: 4px;
                bottom: 4px;
                color: #faaf00;
                font-size: 11px;
                font-weight: 600;

                .rated-score {
                  color: #faaf00;
                  font-size: 11px;
                  font-weight: 600;
                }
              }
            }

            .name {
              height: 19.5px;
              line-height: 19.5px;
              font-size: 13px;
              color: #222;
              margin: 0 0 3px;
              font-weight: bold;
            }
          }

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      .list-wrap {
        // height: 100%;
        background-color: #f5f5f5;
        // overflow-y: scroll;

        .item {
          display: block;
          padding-left: 15px;
          background-color: #fff;

          .main-block {
            width: 100%;
            position: relative;

            .avatar {
              width: 64px;
              height: 95px;
              margin-top: 12px;
              position: relative;
              float: left;

              &::before {
                content: "";
                display: block;
                position: absolute;
                width: 46px;
                height: 46px;
                background-repeat: no-repeat;
                background-size: contain;
              }
              .default-img-bg {
                width: 64px;
                height: 90px;

                & > img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .content-wrapper {
              height: 90px;
              max-height: 90px;
              margin-left: 74px;
              position: relative;
              padding: 12px 14px 12px 0;

              .content {
                padding-right: 5px;
                margin-right: 48px;

                .movie-title {
                  height: 24px;
                  margin-bottom: 7px;
                  max-height: 24px;
                  line-height: 24px;

                  .title {
                    font-size: 17px;
                    font-weight: 700;
                    color: #333;
                    padding-right: 5px;
                    flex-shrink: 1;
                  }

                  .v2d {
                    width: 43px;
                    height: 14px;
                    background-image: url(../assets/images/v2dimax.png);
                  }
                }

                .detail {
                  box-sizing: border-box;
                  line-height: 1;
                  overflow: hidden;

                  .score {
                    .grade {
                      font-size: 15px;
                      font-weight: 700;
                      color: #faaf00;
                    }
                  }

                  .show-info,
                  .actor {
                    margin-top: 6px;
                    line-height: 15px;
                  }
                }
              }

              .button-block {
                font-size: 13px;
                position: absolute;
                right: 15px;
                top: 0;
                bottom: 0;
                height: 27px;
                margin: auto;

                .btn {
                  width: 54px;
                  height: 28px;
                  background-color: #f03d37;
                  box-shadow: 0 2px 2px 0 rgb(240 61 55 / 15%);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  box-sizing: border-box;
                  cursor: pointer;
                  border-radius: 14px;

                  .fix {
                    color: #fff;
                    white-space: nowrap;
                    font-size: 13px;
                    font-weight: 500;
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
  .stop {
    overflow: hidden;
  }

  .n-hot {
    background-color: #f5f5f5;
  }

  .show {
    display: block;
    height: 100%;
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