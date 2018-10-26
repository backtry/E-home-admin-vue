<template>
    <div class="adminuser-list-box">
        <el-table 
        :data="adminlistData"
        style="width: 100%">
            <el-table-column prop="username" label="姓名" ></el-table-column>
            <el-table-column prop="phone" label="手机号" ></el-table-column>
            <el-table-column prop="avatar" label="头像" >
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="avatar">
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" >
                <template slot-scope="scope">
                    <span>{{scope.row.sex==1? '男' : '女'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="个性签名" ></el-table-column>
            <el-table-column prop="_id" label="操作" >
                <template slot-scope="scope">
                    <el-button type="primary">详情</el-button>
                    <el-button type="danger" @click="deleteAdminuser(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            adminlistData:[]
        }
    },
    methods:{
        getadminData(){
            this.$axios.get('/admin/adminUser').then(res=>{
                console.log(res)
                this.adminlistData = res.data
            })
        },
        deleteAdminuser(_id){
            this.$axios.delete(`/admin/adminUser?id=${_id}`).then(res=>{
                console.log(res)
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.getadminData()
                }
            })
        }
    },
    created(){
        this.getadminData()
    }
}
</script>
<style lang="scss" scoped>
.adminuser-list-box{
    .avatar{
        height: 80px;
        width: 80px;
    }
}
</style>
