<template>
    <div>
        <van-sticky>
                <van-nav-bar title="羽博影城" />
            <van-tabs sticky>
                <van-tab title="热映" to="one"></van-tab>
                <van-tab title="敬请期待" to="two"></van-tab>
                <van-tab title="敬请期待" to="three"></van-tab>
                <van-tab title="敬请期待" to="four"></van-tab>
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