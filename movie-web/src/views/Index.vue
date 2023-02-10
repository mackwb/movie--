<template>
    <div>
        <van-sticky>
                <van-nav-bar title="1买票喽" />
            <van-tabs sticky>
                <van-tab title="标签 1" to="one"></van-tab>
                <van-tab title="标签 2" to="two"></van-tab>
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

<style lang="scss">
.van-nav-bar__content{
    background-color: #e54847;
}
</style>