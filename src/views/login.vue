<template>
    <div class="login-p-box">
        <div class="login-container">
            <span class="title">党建E家后台管理系统</span>
            <el-form ref="form" :model="formData" label-width="80px" label-color="#f1f1f1">
                <el-form-item label="用户名"  class="input-box">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" class="input-box">
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item>
                <el-button type="primary" @click="this.login" class="login-btn" >登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            formData:{
                username:'dyyao',
                password:'dyyao'
            }
        }
    },
    methods:{
        login(){
            this.$axios.post('/admin/adminUser/login',this.formData).then(res=>{
                console.log(res)
                this.$router.push({path:'/home'})
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.login-p-box{
    height: 100vh;
    
    // background-color: #003366;
    .login-container{
        margin: 0 auto;
        background-color: #003366;
        width: 500px;
        height: 400px;
        text-align: center;
        margin-top: 220px;
        box-sizing: border-box;
        padding-right: 30px;
        padding-top: 45px;
        border-radius: 6px;
        .title{
            font-size: 40px;
            color: #f1f1f1;
        }
        .input-box{
            margin-top: 40px;
            color: #f1f1f1;
        }
        .login-btn{
            margin-top: 10px;
            width: 128px;
            margin-left: 35px;
        }
        /deep/{
             .el-form-item__label{
                 color: #f1f1f1
             }
        }
    }
}
</style>
