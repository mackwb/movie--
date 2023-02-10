<template>
    <div>
        <van-sticky>
            <van-nav-bar title="2买票喽" />

            <van-tabs sticky>
                <van-tab title="视频1" to="videoOne"></van-tab>
                <van-tab title="视频2" to="videoTwo"></van-tab>
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