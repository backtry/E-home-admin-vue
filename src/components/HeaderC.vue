<template>
    <div class="harder-p-box">
        <div class="breadcrumb-box"></div>
        <span class="title">党建E家后台管理系统</span>
        <div class="user-box">
            <img :src="this.$store.state.userData.avatar" class="user-avatar-box">
            <el-dropdown >
            <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-box">
                <el-dropdown-item @click="ToHome">
                    <router-link to="/home" style="color:#555;">回首页</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <div  @click="handleLogout">退出登录</div>
                </el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods:{
        handleLogout(){
            this.$axios.post('/admin/adminUser/logout').then(res=>{
                console.log(res)
                if(res.code==200){
                    this.$store.commit('GET_USERDATA',{})
                    this.$message.success(res.msg)
                    this.$router.push('/')
                }
            })
        },
        ToHome(){
            this.$router.push('/home')
        }
    }
}
</script>
<style lang="scss" scoped>
.harder-p-box{
    // float: left;
    background-color: #fff;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
        display: block;
        color: #999;
        font-size: 20px;
    }
    .user-box{
        margin-right: 50px;
        .user-avatar-box{
            width: 50px;
            height: 50px;
        }
    }
}
</style>
