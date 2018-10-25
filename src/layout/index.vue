<template>
    <div class="clearfix">
        <Navbar></Navbar>
        <div style="height:100vh;overflow: auto; clearfix">
            <HeaderC></HeaderC>
            <div class="layout-box">
                <router-view class="layout-content"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderC from '../components/HeaderC.vue'
import Navbar from '../components/Navbar.vue'
export default {
    components:{
        HeaderC,
        Navbar
    }
}
</script>
<style lang="scss" scoped>
.layout-box{
    padding: 30px;
    background-color: #f1f1f1;
    .layout-content{
        background-color: #fff;
        border: 1px solid #333;
        min-height: 820px;
        border-radius: 6px;
        box-shadow: 10px 10px 20px #222;
    }
}
</style>
