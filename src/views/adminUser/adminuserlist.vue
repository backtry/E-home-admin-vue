<template>
    <div>
        <el-table 
        :data="adminlistData"
        style="width: 100%">
            <el-table-column prop="" label="姓名" ></el-table-column>
            <el-table-column prop="" label="手机号" ></el-table-column>
            <el-table-column prop="" label="头像" >
                <template slot-scope="scope">
                    <img src="" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="" label="性别" ></el-table-column>
            <el-table-column prop="" label="个性签名" ></el-table-column>
            <el-table-column prop="" label="操作" >
                <template slot-scope="scope">
                    <el-button type="primary">详情</el-button>
                    <el-button type="danger">删除</el-button>
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
            })
        }
    },
    created(){
        this.getadminData()
    }
}
</script>
<style lang="scss" scoped>

</style>
