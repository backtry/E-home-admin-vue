<template>
    <div class="Navbar-box">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#003366"
            text-color="#fff"
            active-text-color="#3399cc"
            :router="true" >
            <el-menu-item index="/home">
                <i class="el-icon-location"></i>
                首页
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>管理员管理</span>
                </template>
                <el-menu-item index="/adminlist" >
                    <i class="el-icon-tickets"></i>
                    管理员列表
                </el-menu-item>
                <el-menu-item index="/adduser">
                    <i class="el-icon-circle-plus"></i>
                    添加管理员
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-star-on"></i>
                    <span>轮播图管理</span>
                </template>
                <el-menu-item index="/swiperlist" >
                    <i class="el-icon-tickets"></i>
                    轮播图列表
                </el-menu-item>
                <el-menu-item index="/addswiper">
                    <i class="el-icon-circle-plus"></i>
                    添加轮播图
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-news"></i>
                    <span>新闻管理</span>
                </template>
                <el-menu-item index="/newslist" >
                    <i class="el-icon-tickets"></i>
                    新闻列表
                </el-menu-item>
                <el-menu-item index="/addnews">
                    <i class="el-icon-circle-plus"></i>
                    添加新闻
                </el-menu-item>
            </el-submenu>
        </el-menu>  
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods:{
        handleOpen(){},
        handleClose(){}
    }
}
</script>
<style lang="scss" scoped>
.Navbar-box{
    float: left;
    .el-menu-vertical-demo{
        height: 100vh;
        overflow: hidden;
        width: 225px;
        border: none;
        a{
            height: 100%
        }
    }
    
}
</style>
