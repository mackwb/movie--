<template>
    <div>
        <van-sticky>
            <van-nav-bar title="买票喽" />

            <van-tabs v-model:active="active" sticky>
                <van-tab title="标签 1" to="one"></van-tab>
                <van-tab title="标签 2" to="two"></van-tab>
                <van-tab title="标签 3" to="three"></van-tab>
                <van-tab title="标签 4" to="four"></van-tab>
            </van-tabs>
            <van-divider />
        </van-sticky>

        <RouterView />
    </div>

    <div>
        <van-tabbar route>
            <van-tabbar-item replace to="" icon="live">电影/影院</van-tabbar-item>
            <van-tabbar-item replace to="" icon="tv-o">视频</van-tabbar-item>
            <van-tabbar-item replace to="" icon="video">小视频</van-tabbar-item>
            <van-tabbar-item replace to="" icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>




</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>