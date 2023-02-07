<script>
import { getMoreCinemas, getCinemasType } from "../api/cinema.js";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    let cinemalist = ref(null); //影院列表
    let showTab = ref(0);
    let showTab1 = ref(0); //区域
    let showTab2 = ref(0); //区域item
    let showTab3 = ref(0); //品牌
    let showTab4 = ref(0); //服务
    let showTab5 = ref(0); //影厅类型
    let showTab6 = ref(0); //地铁
    let loading = ref(false); //加载动画
    let finished = ref(false);
    let showloading = ref(true);
    let nothing = ref(false);
    let type = ref(null);
    let alltype = ["商区", "地铁站"];
    let date = ref(null); //时间
    let limitnum = ref(10); //限制列表加载长度
    let offset = ref(10); //分页偏移
    let cityId = ref(null); //城市id
    let district = ref(null); //商区
    let areaId = ref(-1); //商圈
    let districtId = ref(-1); //行政区ID
    let districtItem = ref(null); //商区item
    let subway = ref(null); //地铁
    let subwayItem = ref(null);
    let lineId = ref(-1);
    let stationId = ref(-1);
    let brand = ref(null); //品牌
    let brandIds = ref(-1); //品牌id
    let service = ref(null); //服务
    let serviceId = ref(-1);
    let hallType = ref(null); //影厅类型
    let hallTypeId = ref(-1);
    let tab = ref(null);
    let little = ref(null);
    const router = useRouter();
    const route = useRoute();
    //获取影院列表
    // districtId：地区  areaId：商圈  lineId：地铁 stationId：路线   brandIds：品牌   serviceIds：服务 offset: 分页偏移
    let getCinemasFun = () => {
      (cinemalist.value = null), (offset.value = 0);
      // loading=true
      getMoreCinemas({
        day: date.value,
        cityId: cityId.value,
        offset: offset.value,
        limit: limitnum.value,
        districtId: districtId.value,
        areaId: areaId.value,
        brandId: brandIds.value,
        hallType: hallTypeId.value,
        serviceId: serviceId.value,
        lineId: lineId.value,
        stationId: stationId.value,
      }).then((data) => {
        // console.log(data);
        if (data.length == 0 || data.length < 10) {
          finished.value = true;
        }
        if (data.length >= 10) {
          finished.value = false;
        }
        if (data.length == 0) {
          loading.value = true;
          setTimeout(() => {
            nothing.value = true;
          }, 800);
        } else {
          nothing.value = false;
        }
        cinemalist.value = data;
        offset.value = 10;
        setTimeout(() => {
          loading.value = false;
          showloading.value = false;
        }, 800);
      });
    };
    //加载数据
    let getCinemaList = () => {
      loading.value = true;
      getMoreCinemas({
        day: date.value,
        offset: offset.value,
        limit: limitnum.value,
        cityId: cityId.value,
        districtId: districtId.value,
        areaId: areaId.value,
        brandId: brandIds.value,
        hallType: hallTypeId.value,
        serviceId: serviceId.value,
        lineId: lineId.value,
        stationId: stationId.value,
      }).then((data) => {
        // console.log(data);
        cinemalist.value = [...cinemalist.value, ...data];
        // console.log("增加到了",cinemalist.length);
        setTimeout(() => {
          loading.value = false;
        }, 500);
      });
      offset.value += 10;
      if (offset.value >= 60) {
        finished.value = true;
      }
    };
    //获取影院类型数据
    let getCinemaTypeFun = () => {
      getCinemasType({ ci: cityId.value }).then((data) => {
        // console.log(data);
        district.value = data.district.subItems;
        subway.value = data.subway.subItems;
        brand.value = data.brand.subItems;
        service.value = data.service.subItems;
        hallType.value = data.hallType.subItems;
      });
    };
    //加载更多数据
    let onLoad = () => {
      // console.log("触底");
      getCinemaList();
    };
    let select = (value) => {
      type.value = type.value == value ? null : value;
    };
    // 获取年月日
    let getDateFun = () => {
      let time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      date.value = `${y}-${m}-${d}`;
    };
    //商区
    let selectRegion = (id) => {
      let index = district.value.findIndex((item) => item.id == id);
      showTab1.value = index;
      showTab2.value = 0;
      districtItem.value = district.value[index].subItems;

      //获取行政区id
      districtId.value = id;
      if (id == -1) {
        areaId.value = id;
        showTab2.value = 0;
        type.value = null;

        getCinemasFun();
        tab.value.getElementsByTagName("i")[0].innerText = "全城";
      }
    };
    //地铁
    let selectline = (id) => {
      let index = subway.value.findIndex((item) => item.id == id);
      showTab6.value = index;
      showTab2.value = 0;
      lineId.value = id;
      subwayItem.value = subway.value[index].subItems;
      if (id == -1) {
        areaId.value = id;
        showTab2.value = 0;
        type.value = null;

        getCinemasFun();
        tab.value.getElementsByTagName("i")[0].innerText = "全城";
      }
    };
    let checkItem = (id, i, name) => {
      showTab2.value = i;
      //获取区域id
      areaId.value = id;
      lineId.value = -1;
      stationId.value = -1;
      if (id == -1) {
        console.log(district.value[showTab1.value]);
        getCinemasFun();
        tab.value.getElementsByTagName("i")[0].innerText =district.value[showTab1.value].name;
      } else {
        tab.value.getElementsByTagName("i")[0].innerText = name;
        getCinemasFun();
      }
      type.value = null;
    };
    let checklineItem = (id, i, name) => {
      showTab2.value = i;
      //获取区域id
      areaId.value = -1;
      districtId.value = -1;
      stationId.value = id;
      if (id == -1) {
        getCinemasFun();
        tab.value.getElementsByTagName("i")[0].innerText =
          district.value[showTab1.value].name;
      } else {
        tab.value.getElementsByTagName("i")[0].innerText = name;
        getCinemasFun();
      }
      type.value = null;
    };
    //品牌
    let checkBrand = (id, index, name) => {
      showTab3.value = index;
      brandIds.value = id;
      tab.value.getElementsByTagName("i")[1].innerText = name;
      type.value = null;

      getCinemasFun();
    };
    //服务
    let checkService = (id, index, name) => {
      showTab4.value = index;
      serviceId.value = id;
      if (id == -1) {
        tab.value.getElementsByTagName("i")[2].innerText = "特色";
      } else {
        tab.value.getElementsByTagName("i")[2].innerText = `${name},`;
      }

      getCinemasFun();
    };
    //影厅类型
    let checkhallType = (id, index, name) => {
      showTab5.value = index;
      hallTypeId.value = id;
      console.log(id);
      if (id == -1) {
        tab.value.getElementsByTagName("i")[2].innerText = "特色";
        little.value.innerText=''
      } else {
        little.value.innerText = name;
      }

      getCinemasFun();
    };
    //重置
    let reset = () => {
      serviceId.value = -1;
      hallTypeId.value = -1;
      type.value = null;

      getCinemasFun();
    };
    let godetail = (id) => {
      router.push({ path: "/cinemadetail", query: { id, ci: cityId.value } });
    };
    cityId.value = route.query.id == null ? 20 : route.query.id;
    
    getCinemasFun();
    getDateFun();
    getCinemaTypeFun();

    return {
      type,
      cinemalist,
      showTab,
      showTab1,
      showTab2,
      showTab3,
      showTab4,
      showTab5,
      showTab6,
      loading,
      finished,
      showloading,
      nothing,
      alltype,
      date,
      limitnum,
      offset,
      cityId,
      district,
      areaId,
      districtId,
      districtItem,
      subway,
      subwayItem,
      lineId,
      stationId,
      brand,
      brandIds,
      service,
      serviceId,
      hallType,
      hallTypeId,
      tab,
      little,

      select,
      getMoreCinemas,
      getCinemasFun,
      getCinemaList,
      getCinemaTypeFun,
      onLoad,
      getDateFun,
      selectRegion,
      selectline,
      checkItem,
      checklineItem,
      checkBrand,
      checkService,
      checkhallType,
      reset,
      godetail,
    };
  },
};
</script>

<template>
  <div class="movie">
    <section>
      <div :class="['page-wrap', 'cinema', { stop: loading }]">
        <div class="tab-block">
          <div class="tab-content">
            <div class="page">
              <div class="nav-wrap filter-nav-wrap">
                <div class="tab" ref="tab">
                  <div
                    :class="['item', { chosenTitle: type == 1 }]"
                    @click="select(1)"
                  >
                    <i>全城</i>
                    <span class="drop"></span>
                  </div>
                  <div
                    :class="['item', { chosenTitle: type == 2 }]"
                    @click="select(2)"
                  >
                    <i>品牌</i>
                    <span class="drop"></span>
                  </div>
                  <div
                    :class="['item', { chosenTitle: type == 3 }]"
                    @click="select(3)"
                  >
                    <i>特色</i><i ref="little"></i>
                    <span class="drop"></span>
                  </div>
                </div>
                <div class="close-tab">
                  <div class="tab-content">
                    <div class="page region" v-if="type == 1">
                      <div class="region-tab">
                        <ul class="tablist">
                          <li
                            :class="['item', { chosen: showTab == index }]"
                            @click="showTab = index"
                            v-for="(item, index) in alltype"
                            :key="index"
                          >
                            {{ item }}
                          </li>
                        </ul>
                      </div>
                      <div class="region-list">
                        <div class="region-sidenav">
                          <div class="district" v-if="showTab == 0">
                            <div
                              :class="[
                                'district-li',
                                'item',
                                { chosen: showTab1 == index },
                              ]"
                              @click="selectRegion(item.id)"
                              v-for="(item, index) in district"
                              :key="index"
                            >
                              {{ item.name }}({{ item.count }})
                            </div>
                          </div>
                          <div class="subway" v-if="showTab == 1">
                            <div
                              :class="[
                                'district-li',
                                'item',
                                { chosen: showTab6 == index },
                              ]"
                              @click="selectline(item.id)"
                              v-for="(item, index) in subway"
                              :key="index"
                            >
                              {{ item.name }}({{ item.count }})
                            </div>
                          </div>
                        </div>
                        <div class="region-list-item">
                          <div class="filter-list" v-if="showTab == 0">
                            <div
                              :class="['item', { chosen: showTab2 == index }]"
                              v-for="(item, index) in districtItem"
                              :key="index"
                              @click="checkItem(item.id, index, item.name)"
                            >
                              <span class="item-name">{{ item.name }}</span>
                              <span class="item-count">{{ item.count }}</span>
                            </div>
                          </div>
                          <div class="filter-list" v-if="showTab == 1">
                            <div
                              :class="['item', { chosen: showTab2 == index }]"
                              v-for="(item, index) in subwayItem"
                              :key="index"
                              @click="checklineItem(item.id, index, item.name)"
                            >
                              <span class="item-name">{{ item.name }}</span>
                              <span class="item-count">{{ item.count }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="page brand" v-if="type == 2">
                      <div class="brand-content">
                        <div
                          :class="[
                            'item',
                            'brand-list',
                            { chosen: showTab3 == index },
                          ]"
                          @click="checkBrand(item.id, index, item.name)"
                          v-for="(item, index) in brand"
                          :key="index"
                        >
                          <div class="brand-name">{{ item.name }}</div>
                          <div class="brand-count">{{ item.count }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="page special" v-if="type == 3">
                      <div id="special-content">
                        <div class="item-title">特色功能</div>
                        <div class="item-list">
                          <div
                            :class="['item', { chosen: showTab4 == index }]"
                            @click="checkService(item.id, index, item.name)"
                            v-for="(item, index) in service"
                            :key="index"
                          >
                            {{ item.name }}
                          </div>
                        </div>
                        <div class="item-title">特殊厅</div>
                        <div class="item-list">
                          <div
                            :class="['item', { chosen: showTab5 == index }]"
                            @click="checkhallType(item.id, index, item.name)"
                            v-for="(item, index) in hallType"
                            :key="index"
                          >
                            {{ item.name }}
                          </div>
                        </div>
                      </div>
                      <div id="special-btn">
                        <span class="btn" id="cancel-btn" @click="reset"
                          >重置</span
                        >
                        <span class="btn" id="confirm-btn" @click="type = null"
                          >确定</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blacker" v-if="type" @click="type = null"></div>
              <div class="cinema-list" v-if="!nothing">
                <!-- <van-loading size="24px" v-if="showloading">正在加载...</van-loading> -->
                <div class="lodaing" v-if="showloading">
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
                <div class="list-wrap" v-if="!showloading">
                  <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    @load="onLoad"
                  >
                    <div
                      class="item"
                      v-for="(item, index) in cinemalist"
                      :key="index"
                      @click="godetail(item.cinemaId)"
                    >
                      <div class="title-block">
                        <div class="title line-ellipsis">
                          <span>{{ item.title }}</span>
                          <span class="price-block">
                            <div class="price">{{ item.price.n }}</div>
                            <span class="q">{{ item.price.q }}</span>
                          </span>
                        </div>
                        <div class="location-block box-flex">
                          <div class="flex line-ellipsis">
                            {{ item.location }}
                          </div>
                        </div>
                        <div
                          class="label-block"
                          v-if="item.services.length != 0"
                        >
                          <div
                            :class="k.code"
                            v-for="(k, i) in item.services"
                            :key="i"
                          >
                            {{ k.text }}
                          </div>
                        </div>
                        <div
                          class="discount-block"
                          v-if="item.discount.length != 0"
                        >
                          <div>
                            <div class="discount-label normal card">
                              <img src="../assets/images/card.png" alt="" />
                            </div>
                            <div
                              class="discount-label-text"
                              v-for="(s, l) in item.discount"
                              :key="l"
                            >
                              {{ s.text }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </van-list>
                </div>
              </div>
              <div class="nothing" v-if="nothing">
                <img src="../assets/images/nothing.png" alt="" />
              </div>
            </div>
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

    .tab-block {
      .tab-content {
        .page {
          width: 100%;
          flex: auto;

          .nav-wrap {
            position: fixed;
            top: 95px;
            width: 100%;
            height: 40px;
            z-index: 10;
            background-color: #fff;
            z-index: 110;

            .tab {
              display: flex;
              margin: 0 auto;
              padding: 0;
              width: 90%;
              text-align: center;
              background-image: url("../assets/images/repeat-x-bottom-outline.png");
              background-position: 0 bottom;
              background-repeat: repeat-x;
              background-size: 1px 1px;

              .item {
                flex: 1;
                text-align: center;
                line-height: 40px;
                position: relative;
                white-space: nowrap;
                overflow: hidden;
                font-size: 13px;
                text-overflow: ellipsis;

                .drop {
                  display: inline-block;
                  position: absolute;
                  top: 18px;
                  width: 0;
                  height: 0;
                  margin-left: 4px;
                  border: 4px solid transparent;
                  border-top-color: #b0b0b0;
                }
              }
              .chosenTitle {
                color: #e54847;
                .drop {
                  border-bottom-color: #f03d37;
                  border-top-color: transparent;
                  top: 14px;
                }
              }
            }
            .close-tab {
              position: relative;
              width: 100%;
              background: #fff;
              z-index: 100;
              overflow: scroll;

              .tab-content {
                .page {
                  background-color: #fff;
                  overflow: auto;
                  z-index: 999;

                  .region-tab {
                    height: 44px;

                    .tablist {
                      display: flex;
                      width: 90%;

                      .item {
                        position: relative;
                        display: inline-block;
                        padding: 0 10px;
                        width: 50%;
                        height: 100%;
                        line-height: 44px;
                        text-align: center;
                      }
                      .chosen {
                        color: #f03d37;

                        &::after {
                          content: "";
                          position: absolute;
                          display: block;
                          bottom: 0;
                          left: 0;
                          width: 90%;
                          border-top: 2px solid #f03d37;
                        }
                      }
                    }
                  }
                  .region-list {
                    background: #f5f5f5;
                    height: 400px;

                    .region-sidenav {
                      width: 35%;
                      height: 100%;
                      float: left;
                      overflow: scroll;

                      .subway,
                      .district {
                        min-height: 100%;
                        background: #fff;

                        .district-li {
                          height: 44px;
                          padding-left: 10px;
                          line-height: 44px;
                          font-size: 14px;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          overflow: hidden;
                        }
                        .chosen {
                          color: #f03d37;
                          background-color: #f5f5f5;
                        }
                      }
                      &::-webkit-scrollbar {
                        display: none;
                      }
                    }
                    .region-list-item {
                      width: 65%;
                      height: 100%;
                      float: right;
                      overflow: scroll;

                      .filter-list {
                        background-color: #f5f5f5;

                        .item {
                          position: relative;
                          height: 45px;
                          line-height: 45px;
                          padding: 0 0 0 25px;

                          .item-name {
                            display: inline-block;
                            width: 80%;
                            font-size: 14px;
                            color: #333;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                          }
                          .item-count {
                            float: right;
                            width: 20px;
                            margin-right: 10px;
                            color: #8f9296;
                            font-size: 12px;
                            text-align: right;
                          }
                        }
                        .chosen {
                          color: #f03d37;

                          .item-name {
                            color: #f03d37;
                          }
                          .item-count {
                            color: #f03d37;
                          }
                          ::before {
                            content: "";
                            display: block;
                            position: absolute;
                            left: 8px;
                            top: 19px;
                            width: 11.5px;
                            height: 8px;
                            background-image: url("../assets/images/chosen.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                          }
                        }
                      }
                      &::-webkit-scrollbar {
                        display: none;
                      }
                    }
                  }
                }
              }
            }
          }
          .brand {
            min-height: 150px;
            max-height: 352px;

            .brand-content {
              .brand-list {
                position: relative;
                line-height: 44px;
                height: 44px;
                padding: 0 15px 0 26px;
                border-bottom: 1px solid #e5e5e5;
                color: #333;

                .brand-name {
                  display: inline-block;
                  width: 49%;
                }
                .brand-count {
                  display: inline-block;
                  width: 49%;
                  text-align: right;
                  color: #8f9296;
                  font-size: 12px;
                }
              }
              .chosen {
                color: #f03d37;
                .brand-name {
                  color: #f03d37;
                }
                .brand-count {
                  color: #f03d37;
                }
                ::after {
                  content: "";
                  display: block;
                  position: absolute;
                  left: 8px;
                  top: 19px;
                  width: 11.5px;
                  height: 8px;
                  background-image: url("../assets/images/chosen.png");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
            &::-webkit-scrollbar {
              display: none;
            }
          }
          .special {
            min-height: 208px;
            overflow: hidden;

            #special-content {
              min-height: 150px;
              max-height: 270px;
              overflow: scroll;

              .item-title {
                margin-left: 12px;
                margin-top: 11px;
                font-size: 15px;
              }
              .item-list {
                margin: 0 12px 12px 12px;

                .item {
                  float: left;
                  width: 21.3%;
                  height: 30px;
                  padding: 3px 0;
                  margin-right: 3%;
                  margin-top: 10px;
                  line-height: 30px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  text-align: center;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  font-size: 9.8px;
                }
                .chosen {
                  background: #fcf0f0;
                  color: #f03d37;
                  border: 1px solid #f03d37;
                }
                &::after {
                  display: block;
                  clear: both;
                  content: "";
                }
              }
              &::-webkit-scrollbar {
                display: none;
              }
            }
            #special-btn {
              height: 60px;
              width: 100%;
              border-top: 1px solid #e5e5e5;
              margin-top: 10px;
              background: #fafafa;
              .btn {
                display: inline-block;
                height: 34px;
                width: 21.3%;
                margin: 13px 11px;
                border: 1px solid #e5e5e5;
                border-radius: 6px;
                text-align: center;
                line-height: 34px;
                font-size: 14px;
              }
              #confirm-btn {
                float: right;
                background: #f03d37;
                border: 1px solid #f03d37;
                color: #fff;
              }
            }
          }
          .blacker {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 109;
          }
          .cinema-list {
            margin-top: 40px;

            .item {
              padding: 13px 15px 13px 0;
              // margin-left: 15px;
              background-color: #fff;
              position: relative;
              overflow: hidden;

              .title-block {
                display: block;
                line-height: 1.5;

                .title {
                  height: 23px;
                  line-height: 23px;
                  font-size: 16px;
                  color: #000;

                  .price-block {
                    padding-left: 3px;
                    padding-top: 9px;
                    line-height: 1.5;

                    .price {
                      display: inline-block;
                      font-size: 18px;
                      color: #f03d37;
                    }
                    .q {
                      font-size: 12px;
                      margin-left: 3px;
                      color: #f03d37;
                    }
                  }
                }
                .location-block {
                  margin-top: 6px;
                  font-size: 13px;
                  color: #666;
                  line-height: 1.5;

                  .flex {
                    display: block;
                    flex: 1;
                  }
                }
                .label-block {
                  height: 17px;
                  line-height: 17px;
                  margin-top: 4px;
                  margin-bottom: 4px;
                  overflow: hidden;
                  font-size: 0;
                  flex-shrink: 0;

                  & > div {
                    position: relative;
                    display: inline-block;
                    padding: 0 3px;
                    height: 15px;
                    line-height: 15px;
                    border-radius: 2px;
                    font-size: 12px;
                    margin-left: 5px;
                  }
                  & > div:first-child {
                    margin-left: 0;
                  }
                }
                .discount-block {
                  color: #999;
                  margin-bottom: 4px;

                  .discount-label {
                    display: inline-flex;
                    width: 15px;
                    height: 14px;
                    position: relative;
                    top: 3px;

                    & > img {
                      width: 100%;
                    }
                  }
                  .discount-label-text {
                    display: inline-block;
                    margin-left: 2px;
                    font-size: 12px;
                  }
                }
              }
            }
          }
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .stop {
    overflow: hidden;
  }
  ::v-deep .van-loading {
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // padding-top: 10px;
    position: fixed;
    // top:137px;
    left: 0;
    right: 0;
    bottom: 50px;
    z-index: 10;
    background-color: #f4f4f4;
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
.nothing {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 150px;
    height: 150px;
  }
}
// ::v-deep .van-loading{
//   height: 45px;
//   line-height: 45px;
//   position: fixed;
//   left: 0;
//   right: 0;
//   bottom: 45px;
//   background-color: #f5f5f5;
// }
</style>