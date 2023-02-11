<template>
    <div>
        <van-sticky>
            <van-nav-bar title="羽博影城" />

            <van-tabs sticky>
                <van-tab title="热播视频" to="videoOne"></van-tab>
                <van-tab title="待定。。。" to="videoTwo"></van-tab>
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