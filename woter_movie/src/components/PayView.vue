<template>
    <div class="page-order-buy">
        <div class="bg-header">
            <div class="box-flex order-header">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <div class="flex navbar-title">支付订单</div>
                <div style="width:74px"></div>
            </div>
            <div class="movie-info middle">
                <div class="movie-info-wrapper">
                    <div class="movie-img">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <div class="movie-details">
                        <div class="box-flex">
                            <div class="title">{{ movieInfo.nm }}</div>
                            <div class="flex"></div>
                            <div class="price" v-if="selectedlist">
                                <span>{{ selectedlist.length }}张</span>
                                <span class="price-num">
                                    原价¥{{ selectedlist[0].price }}
                                </span>
                            </div>
                        </div>
                        <div class="date" v-if="currentPlaylist">
                            {{ navTime(currentPlaylist.dt) }} {{ currentPlaylist.tm }} ({{ currentPlaylist.tp }})
                        </div>
                        <div class="local" v-if="cinemaInfo">{{ cinemaInfo.nm }}</div>
                        <div class="seats">{{ currentPlaylist.th }}
                            <div class="seat" v-for="(item, index) in selectedlist" :key="index">
                                {{ item.row }}排{{ item.col }}座</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ticket-changes">
                <div class="ticket-changes-block">
                    <div class="changes">
                        <span class="retreat">
                            <i class="able-img" v-if="false"></i>
                            <i class="disable-img"></i>
                            <i class="changes-t">不支持退票</i>
                        </span>
                        <span class="retreat">
                            <i class="able-img" v-if="false"></i>
                            <i class="disable-img"></i>
                            <i class="changes-t">不支持改签</i>
                        </span>
                    </div>
                    <div class="flex"></div>
                </div>
            </div>
        </div>
        <div class="pay-info mb-outline-b">
            <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
            <!-- <div class="discount-block">
                
                <div class="flex"></div>
                <div class="order_coupon">
                    <span>无可用</span>
                </div>
            </div> -->
            <div class="mb-line-t">
                <div class="flex"></div>
                <div>票价小计</div>
                <div class="red">
                    <span class="icon">¥</span>
                    <span class="paymoney"  v-if="(chosenCoupon==-1)">{{ sum }}</span>
                    <span class="paymoney"  v-if="(chosenCoupon!=-1)">{{ sum-10 }}</span>
                </div>
            </div>
        </div>
        <div class="price-block">
            <div class="total-price">
                <div class="price">
                    <span class="d">¥</span>
                    <span class="num" v-if="(chosenCoupon==-1)">{{ sum }}</span>
                    <span class="num" v-if="(chosenCoupon!=-1)">{{ sum-10 }}</span>
                </div>
            </div>
            <div class="price-btn" @click="pay">确认支付</div>
        </div>

        <div class="load" v-if="isPlay">
            <van-loading type="spinner" size="18px" color="#fff">正在支付中...</van-loading>
        </div>
        <van-overlay :show="show" duration="0">
            <div class="wrapper">
                <div class="block">
                    <span>支付成功</span>
                </div>
            </div>
        </van-overlay>

        <van-popup v-model:show="showList" round position="bottom" style="height: 90%; padding-top: 4px;" editable>
            <van-coupon-list :coupons="coupons"  :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons" @change="onChange" @exchange="onExchange" />

            <!-- <van-coupon-list :coupons="(coupons,twentys)" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons"
                @change="onChange" @exchange="onExchange" /> -->
        </van-popup>

    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Toast } from 'vant';
export default {
    props: ["currentfilm", "playlist", "selectedlist", "currentPlay", "cinemaInfo"],
    emit: ["back"],
    setup(props, { emit }) {
        console.log(props.playlist);
        const router = useRouter()
        console.log(router);
        let showPay = ref(false)
        let movieInfo = ref(props.currentfilm)//电影信息
        let cinema = ref(props.cinemaInfo)//影院信息
        let seatlist = ref(props.selectedlist)//座位信息
        let currentPlaylist = ref(props.currentPlay)//当前影院购票信息
        let orderlist = ref([])//订单信息
        let payTime = ref(null)//支付时间
        let totalPrice = ref(null)
        let isPlay = ref(false)
        let show = ref(false)
        let loadingTime = ref(null)
        let orderId = ref(null)

        // 
        const coupon = {
            available: 1,
            condition: '无门槛\n优惠10元',
            reason: '',
            value: 1000,
            name: '10元优惠券',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '10',
            unitDesc: '元',
        };

        const twenty = {
            available: 1,
            condition: '无门槛\n优惠20元',
            reason: '',
            value: 2000,
            name: '20元优惠券',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '20',
            unitDesc: '元',
        };

        const coupons = ref([coupon]);
        const twentys = ref([twenty]);
        const showList = ref(false);
        const chosenCoupon = ref(-1);

        const onChange = (index) => {
            showList.value = false;
            chosenCoupon.value = index;
        };
        const onExchange = (code) => {
            if (window.localStorage.getItem("prizenum")) {
                let numlist = JSON.parse(window.localStorage.getItem("prizenum"))
                let prize = JSON.parse(window.localStorage.getItem("prizelists"));
                numlist.forEach((item, index) => {
                    // console.log(index, "asda");
                    console.log(prize[index].name);
                    if (code == item) {
                        if (prize[index].name == "10元优惠券") {
                            coupons.value.push(coupon);
                        } else if (prize[index].name == "20元优惠卷") {
                            // twentys.value.push(twenty);
                            coupons.value.push(coupon);
                            coupons.value.push(coupon);
                        } else {
                            coupons.value.push(coupon);
                        }
                        Toast.success('兑换成功');
                    } else {

                        Toast.fail('兑换码不存在');

                    }
                });
                // console.log(numlist);
            }
            console.log(code);

        };
        // 

        let back = () => {
            emit('back', showPay.value);
        }
        let pay = () => {
            isPlay.value = true
            let dd = new Date()
            orderId.value = dd.getTime()
            loadingTime.value = setTimeout(() => {
                isPlay.value = false
                show.value = true
                orderlist.value.push(
                    {
                        id: orderId.value,
                        cinema: cinema.value.nm,
                        movieImg: movieInfo.value.img,
                        movieNm: movieInfo.value.nm,
                        seat: seatlist.value,
                        paytime: payTime.value,
                        hall: currentPlaylist.value.th,
                        allprice: totalPrice.value,
                        isfinish: false,
                    }
                )
                if (orderlist.value.length) {
                    window.localStorage.setItem("orderlist", JSON.stringify(orderlist.value))
                }
            }, 2000);
            setTimeout(() => {

                window.localStorage.setItem("btabId", 3)
                router.push("/orderlist")
            }, 3000);

        }
        //获取当前时间
        let getDateFun = () => {
            let time = new Date();
            let y = time.getFullYear()
            let m = time.getMonth() + 1 < 10 ? '0' + time.getMonth() + 1 : time.getMonth() + 1
            let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
            let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
            let f = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()

            payTime.value = `${y}年${m}月${d}日 ${h}:${f}`
        }
        let navTime = (value) => {
            let dates = value;
            let datesar = dates.split("-");
            let date = new Date();
            let datewl = new Date(datesar[0], String(datesar[1] - 1), datesar[2]);
            let datewls = datewl.getDay();

            let datesl = date.getDate();
            if (datesar[2] == datesl) {
                return "今天 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datesar[2] == Number(datesl) + 1) {
                return "明天 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datesar[2] == Number(datesl) + 2) {
                return "后天 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datewls == 1) {
                return "星期一 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datewls == 2) {
                return "星期二 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datewls == 3) {
                return "星期三 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datewls == 4) {
                return "星期四 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datewls == 5) {
                return "星期五 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datewls == 6) {
                return "星期六 " + datesar[1] + "月" + datesar[2] + "日";
            } else if (datewls == 0) {
                return "星期日 " + datesar[1] + "月" + datesar[2] + "日";
            }
        }

        let sum = computed(() => {
            return seatlist.value.reduce((total, item) => {
                totalPrice.value = total += item.price
                return totalPrice.value
            }, 0)
        })

        let temp = JSON.parse(window.localStorage.getItem("orderlist"))
        orderlist.value = temp == null ? [] : temp

        // movieInfo.value =currentfilm.value
        // cinema.value = cinemaInfo.value
        // seatlist.value = selectedlist.value
        // currentPlaylist.value =currentPlay.value
        getDateFun()
        return {
            // twenty,
            twentys,
            showPay,
            movieInfo,//电影信息
            cinema,//影院信息
            seatlist,//座位信息
            currentPlaylist,//当前影院购票信息
            orderlist,//订单信息
            payTime,//支付时间
            totalPrice,
            isPlay,
            show,
            loadingTime,
            orderId,
            sum,
            navTime,
            pay,
            back,

            coupons,
            showList,
            onChange,
            onExchange,
            chosenCoupon,
            disabledCoupons: [coupon],
        };
    }



}
</script>

<style lang="less" scoped>
.page-order-buy {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: #f5f5f5;

    .bg-header {
        background-image: linear-gradient(135deg, #88b3ca, #7195a8);
        padding-top: env(safe-area-inset-top);

        .order-header {
            display: flex;
            height: 26px;
            width: 100%;
            padding-top: 8px;

            .back {
                width: 74px;
                padding-left: 15px;
                box-sizing: border-box;

                .icon-back {
                    display: inline-block;
                    width: 22.5px;
                    height: 22.5px;
                    vertical-align: middle;
                    position: relative;

                    &::before {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 5.5px;
                        left: 4px;
                        width: 13px;
                        height: 13px;
                        border-bottom: 2px solid #fff;
                        border-left: 2px solid #fff;
                        transform: rotate(45deg);
                    }
                }
            }

            .navbar-title {
                text-align: center;
                line-height: 26px;
                font-family: PingFangSC-Medium, Hiragino Sans GB, sans-serif;
                font-size: 15px;
                color: #fff;
                flex: 1;
            }
        }

        .movie-info {
            display: inline-flex;
            line-height: 1;
            color: #fff;
            font-size: 13px;
            width: 100%;

            .movie-info-wrapper {
                display: inline-flex;
                padding: 12.5px;
                width: 100%;

                .movie-img {
                    width: 19.2vw;
                    height: 26.4vw;

                    &>img {
                        width: 19.2vw;
                        height: 26.4vw;
                        max-width: 79px;
                        max-height: 109px;
                        border: 0 solid hsla(0, 0%, 100%, .1);
                        border-radius: 2px;
                    }
                }

                .movie-details {
                    width: 100%;
                    margin-left: 10px;
                    position: relative;

                    .box-flex {
                        display: flex;

                        .title {
                            width: 41.2vw;
                            max-width: 162px;
                            font-family: PingFangSC-Medium, Hiragino Sans GB, sans-serif;
                            font-size: 18px;
                            line-height: 25px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .flex {
                            flex: 1;
                        }

                        .price {
                            height: 25px;
                            line-height: 25px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;

                            .price-num {
                                margin-left: 3px;
                            }
                        }
                    }

                    .date {
                        line-height: 18px;
                        margin-top: 10px;
                        font-weight: 700;
                    }

                    .local {
                        line-height: 18px;
                        margin-top: 5px;
                    }

                    .seats {
                        line-height: 18px;
                        margin-top: 5px;
                        font-size: 13px;
                        overflow-wrap: break-word;

                        .seat {
                            display: inline-block;
                            margin: 0 4px;
                        }
                    }
                }
            }
        }

        .ticket-changes {
            width: 100%;
            height: 65.5px;

            .ticket-changes-block {
                display: flex;
                position: relative;
                height: 65.5px;
                padding: 0 15px;
                background: rgba(0, 0, 0, .12);
                border-top-left-radius: 12px;
                border-top-right-radius: 12px;
                font-size: 13px;

                .changes {
                    display: inline-block;
                    line-height: 42.5px;
                    color: hsla(0, 0%, 100%, .8);

                    .retreat {
                        display: inline-block;
                        margin-right: 10px;

                        .able-img {
                            display: inline-block;
                            width: 13px;
                            height: 13px;
                            background-image: url("../assets/images/icon_able.png");
                            background-position: 50%;
                            background-size: cover;
                            vertical-align: middle;
                            margin-right: 4px;
                        }

                        .disable-img {
                            display: inline-block;
                            width: 13px;
                            height: 13px;
                            background-image: url("../assets/images/icon_disable.png");
                            background-position: 50%;
                            background-size: cover;
                            vertical-align: middle;
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
    }

    .pay-info {
        background-color: #fff;
        padding: 0 15px;
        transform: translateY(-25px);
        margin-bottom: -25px;

        .discount-block {
            display: flex;

            &>div {
                line-height: 45px;
                font-size: 14px;
                color: #333;
            }

            .flex {
                flex: 1;
            }

            .order_coupon {
                &>span {
                    color: rgb(153, 153, 153);
                    font-size: 13px;
                }
            }
        }

        .mb-line-t {
            display: flex;

            &>div {
                line-height: 45px;
                font-size: 14px;
                color: #333;
            }

            .flex {
                flex: 1;
            }

            .red {
                margin-left: 5px;
                font-family: PingFangSC-Medium;
                color: #ef4238;
                font-size: 18px;

                .icon {
                    font-size: 13px;
                }
            }
        }
    }

    .price-block {
        height: 70px;
        display: flex;
        padding: 10px 15px;
        background-color: #fff;
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 10;
        box-sizing: border-box;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: center;

        .total-price {
            flex: 1;

            .price {
                padding: 12px 0 6px;
                line-height: 0;
                font-size: 21px;
                font-family: PingFangSC-Medium, Hiragino Sans GB, sans-serif;
                color: #ef4238;

                .d {
                    font-size: 14px;
                }

            }
        }

        .price-btn {
            flex: 1.1;
            line-height: 45px;
            width: 100%;
            background-color: #ff9e05;
            border-radius: 4px;
            text-align: center;
            color: #fff;
            font-size: 16px;
        }
    }
}

.load {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    font-size: 14px;
    background-color: #000;
    opacity: 0.7;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    color: #fff;
    opacity: 0.7;
    border-radius: 12px;
}

::v-deep .van-overlay {
    background-color: transparent;
}
</style>