<template>
    <div class="clearfix">
        <Navbar></Navbar>
        <div style="height:100vh;overflow: auto; clearfix">
            <HeaderC></HeaderC>
            <div class="layout-box">
                <transition name="fade-transform" mode="out-in" >
                    <router-view class="layout-content" v-if="Show" ></router-view>
                </transition>
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
    },
    data(){
        return{
            Show:true
        }
    }
}
</script>
<style lang="scss" scoped>
.layout-box{
    padding: 30px;
    background-color: #f1f1f1;
    .layout-content{
        background-color: #fff;
        border: 1px solid #ddd;
        overflow: hidden;
        min-height: 820px;
        border-radius: 6px;
        box-shadow: 10px 10px 20px #222;
    }
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .8s;
  transition-timing-function: linear;
}
.fade-transform-enter {
  opacity: 0;
  transform: 
    translateX(500px)
    translateY(-500px)
    rotateZ(360deg)
    scale(0.01,0.01)
}
.fade-transform-leave-to {
  opacity: 0;
  transform: 
    translateX(500px) 
    translateY(-500px)
    rotateZ(360deg)
    scale(0.01,0.01)
}
</style>
