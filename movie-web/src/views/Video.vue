<template>
    <div>
        <van-sticky>
            <van-nav-bar title="1买票喽" />

            <van-tabs sticky>
                <van-tab title="视频1" to="one"></van-tab>
                <van-tab title="视频2" to="two"></van-tab>
                <van-tab title="标签 3" to="three"></van-tab>
                <van-tab title="标签 4" to="four"></van-tab>
            </van-tabs>
            <van-divider />
        </van-sticky>

        <RouterView />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>