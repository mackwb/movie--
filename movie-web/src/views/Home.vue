<template>
    <div>
        <RouterView />
    </div>

    <div>
        <van-tabbar route>
            <van-tabbar-item replace to="" icon="live" url="/">电影/影院</van-tabbar-item>
            <van-tabbar-item replace to="" icon="tv-o" url="/video">视频</van-tabbar-item>
            <van-tabbar-item replace to="" icon="video">小视频</van-tabbar-item>
            <van-tabbar-item replace to="" icon="user-o" url="/login">我的</van-tabbar-item>
        </van-tabbar>
    </div>




</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>