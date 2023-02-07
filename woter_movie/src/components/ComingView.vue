
<script>
import { ref } from "vue";
import {
  getMostExpected,
  getComingList,
  getMoreComing,
} from "../api/coming.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const state = useStore();
    const route = useRoute();
    let expextedlist = ref([]); //近期待映推荐列表
    let cominglists = ref([]); //待映推荐列表
    let movieIds = ref([]); //下拉加载的ID数组
    let showData = ref(true); //动画
    let start = ref(10); //限定长度
    let loading = ref(false); //触底时触发
    let finished = ref(false); // j加载完成
    let cityId = route.query.id == null ? 20 : ref(route.query.id);

    //获取近期最受期待电影数据
    getMostExpected({ ci: cityId.value, limit: 10, offset: 0 }).then((data) => {
      if (data) {
        setTimeout(() => {
          showData.value = false;
        }, 800);
      }
      expextedlist.value = data.coming;
      //  console.log(expextedlist.value);
      let temp =
        JSON.parse(window.localStorage.getItem("wish")) == null
          ? []
          : JSON.parse(window.localStorage.getItem("wish"));
      expextedlist.value.forEach((i) => {
        i.wishst = false;
        temp.forEach((item) => {
          if (item.id == i.id) {
            i.wishst = true;
          }
        });
      });
    });
    // 获取待映电影数据
    getComingList({ ci: cityId.value, limit: 10 }).then((data) => {
      // console.log(data);
      cominglists.value = data.coming;
    });
    // 加载更多
    let getMoreFun = (lists) => {
      if (lists != undefined) {
        getMoreComing({
          ci: 1,
          limit: 10,
          movieIds: lists.slice(start.value, start.value + 10).toString(),
        }).then((data) => {
          cominglists.value = [...cominglists.value, ...data.coming];
          loading.value = false;
          if (start.value >= 100) {
            finished.value = true;
          }
        });
      }
    };
    // 跳转详情页
    let detail = (id) => {
      state.commit("detail", id);
      router.push({
        path: "/moviedetail",
        query: {
          id: route.query.id,
        },
      });
    };
    // 加载数据 触底执行
    const onLoad = () => {
      // console.log('触底');
      //   loading.value=true
      start.value += 10;
      //  console.log(cominglists.value);
      if (start.value <= 100) {
        getComingList({ ci: 1, limit: 10 }).then((data) => {
          // console.log(data);
          movieIds.value = data.movieIds;
          getMoreFun(movieIds.value);
        });
      }
    };
    return {
      expextedlist,
      cominglists,
      showData,
      movieIds,
      start,
      finished,
      loading,
      getMoreFun,
      getMostExpected,
      getComingList,
      onLoad,
      detail,
    };
  },
};
</script>
<template>
  <div class="movie">
    <section>
      <div class="swiper-header"></div>
      <div :class="['page-wrap', 'n-hot', 'show', { stop: loading }]">
        <div class="page">
          <div id="top-rated-wrap" v-if="expextedlist">
            <div class="top-rated">
              <p class="title">近期最受期待</p>
              <div class="top-rated-list" ref="lists">
                <div
                  class="top-rated-item"
                  v-for="item in expextedlist"
                  :key="item.id"
                >
                  <div class="poster" @click="detail(item.id)">
                    <img :src="item.img" v-lazy="item.img" alt="" />
                    <span class="wish-bg"></span>
                    <span class="wish">
                      <span class="wish-num">{{ item.wish }}</span
                      >人想看
                    </span>
                    <div :class="['toggle-wish', { love: item.wishst }]">
                      <span></span>
                    </div>
                  </div>
                  <h5 class="name line-ellipsis">{{ item.nm }}</h5>
                  <p class="date" v-if="item.comingTitle">
                    {{ item.comingTitle.split(" ")[0] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="coming-list" v-if="cominglists">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              @load="onLoad"
              :immediate-check="false"
            >
              <div
                class="coming-item"
                v-for="item in cominglists"
                :key="item.id"
              >
                <p class="group-date" v-if="item.comingTitle">
                  {{ item.comingTitle }}
                </p>
                <div class="item" @click="detail(item.id)">
                  <div class="main-block clearfix">
                    <div class="avatar">
                      <div class="default-img-bg">
                        <img :src="item.img" v-lazy="item.img" alt="" />
                      </div>
                    </div>
                    <div class="mb-outline-b content-wrapper">
                      <div class="content">
                        <div class="movie-title box-flex">
                          <div class="title line-ellipsis">{{ item.nm }}</div>
                          <span
                            class="version v3d"
                            v-if="item.version == 'v3d'"
                            style="width: 17px"
                          ></span>
                          <span class="pre-show" v-if="item.preShow"></span>
                        </div>
                        <div class="detail">
                          <div class="wantsee line-ellipsis">
                            <span class="person">{{ item.wish }}</span>
                            <span class="p-suffix">人想看</span>
                          </div>
                          <div class="actor line-ellipsis">
                            主演:{{ item.star }}
                          </div>
                          <div class="actor line-ellipsis">
                            {{ item.rt }}上映
                          </div>
                        </div>
                      </div>
                      <div class="button-block">
                        <div class="btn" v-if="item.showStateButton">
                          <span class="fix">{{
                            item.showStateButton.content
                          }}</span>
                        </div>
                        <div
                          class="btn"
                          v-if="!item.showStateButton"
                          style="
                            background-color: #faaf00;
                            box-shadow: 0 0.04rem 0.04rem 0 rgb(250 175 0 / 15%);
                          "
                        >
                          <span class="fix">想看</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
            </van-list>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

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

              .wish {
                position: absolute;
                left: 4px;
                bottom: 4px;
                color: #faaf00;
                font-size: 11px;
                font-weight: 600;

                .wish-num {
                  color: #faaf00;
                  font-size: 11px;
                  font-weight: 600;
                }
              }
              .toggle-wish {
                width: 28px;
                height: 28px;
                background: rgba(61, 63, 71, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom-right-radius: 10px;
                position: absolute;
                top: 0;
                left: 0;

                & > span {
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background-image: url("../assets/images/notWish.png");
                  background-size: 100%;
                  background-repeat: no-repeat;
                }
              }
              .love {
                & > span {
                  background-image: url("../assets/images/hasWish.png");
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
            .date {
              margin: 0;
              font-size: 12px;
              color: #999;
            }
          }

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      .coming-list {
        background-color: #fff;

        .group-date {
          padding: 12px 15px 0;
          margin: 0;
          font-size: 14px;
          color: #333;
        }

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
                height: 96px;
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

                  .v3d {
                    width: 43px;
                    height: 14px;
                    background-image: url("../assets/images/v3d.png");
                  }
                  .pre-show {
                    width: 23px;
                    background-image: url("../assets/images/pre-show.png");
                  }
                }

                .detail {
                  box-sizing: border-box;
                  line-height: 1;
                  overflow: hidden;

                  .wantsee {
                    .person {
                      font-size: 15px;
                      font-weight: 700;
                      color: #faaf00;
                    }
                    .p-suffix {
                      font-size: 13px;
                      margin-left: -2px;
                      display: inline-block;
                      color: #666;
                    }
                  }

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
                  //   background-color: #f03d37;
                  //   box-shadow: 0 0.04rem 0.04rem 0 rgb(240 61 55 / 15%);
                  background-color: rgb(60, 159, 230);
                  box-shadow: rgb(60 159 230 / 15%) 0px 0.04rem 0.04rem 0px;
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