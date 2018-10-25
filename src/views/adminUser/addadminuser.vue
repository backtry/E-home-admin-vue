<template>
    <div class="adduser-p-box">
        <span class="title">添加管理员</span>
        <el-form label-width="80px" class="formData-p-box">
            <el-form-item label="用户头像">
                <UploadAvatar v-model="formData.avatar" class="avatar-img"></UploadAvatar>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="formData.username" class="width-250"></el-input>
            </el-form-item>   
            <el-form-item label="密码">
                <el-input v-model="formData.password" class="width-250"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formData.nicknama" class="width-250"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formData.sex" placeholder="请选择性别">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="formData.desc"  class="width-250"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formData.phone" class="width-250"></el-input>
            </el-form-item>
            <el-button type="primary" @click="Adduadminuser"  class="addadminuser-btn">
                添加管理员
            </el-button>
        </el-form>
    </div>
</template>
<script>
import UploadAvatar from '@/components/upload-avatar.vue'
export default {
    components:{
        UploadAvatar
    },
    data(){
        return{
            formData:{
                username:'',
                nicknama:'',
                avatar:'',
                password:'',
                desc:'',
                job:0,
                phone:'',
                sex:''
            }
        }
    },
    methods:{
        Adduadminuser(){
            this.$axios.post('/admin/adminUser',this.formData).then(res=>{
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.formData = {
                        username:'',
                        nicknama:'',
                        avatar:'',
                        password:'',
                        desc:'',
                        job:0,
                        phone:'',
                        sex:''
                    }
                }                
            })
        }
    },
    created(){
        
    }
}
</script>
<style lang="scss" scoped>
.adduser-p-box{
    
    .width-250{
        width: 350px;
    }
    .title{
        padding-left: 20px;
        display: block;
        font-size: 30px;
        font-weight: 400;
        height: 50px;
        line-height: 50px;
        border: 1px solid #ddd;
        box-shadow: 2px 2px 4px #666;
    }
    .formData-p-box{
        padding-top: 20px;
    }
    .avatar-img{
        border: 1px dashed  #999;
        border-radius: 6px;
    }
    .addadminuser-btn{
        width: 250px;
        margin-left: 20px;
    }
}
</style>
