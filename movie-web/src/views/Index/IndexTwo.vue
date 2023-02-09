<template>
    <div class="box">
        <p class="title">aa{{}}</p>
        <div class="mv_box">

            <div class="mv_nm" v-for="item, index in Movie" :key="index">
                <img class="mv_img" :src="item.img" alt="" />
                <h5 class="name">{{ item.nm }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { getComingList , getMostExpected } from '../../api/coming.js'
export default {
    setup() {
        const hotWaitView = ref([])
        const waitView = ref([])
        getMostExpected().then((data) => {
            // console.log(data);
            hotWaitView.value = data.coming;
            console.log(hotWaitView);
        });
        getComingList().then((data) => {
            // console.log(data);
            waitView.value = data.coming;
            console.log(waitView);
        });

    }
}
</script>

<style lang="scss" scoped>

</style>