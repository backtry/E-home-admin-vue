<template>
    <div class="swiper-p-box">
        <el-card>
            <div slot="header">轮播图列表</div>
            <el-table 
                :data="SwiperData"
                style="width: 100%">
                <el-table-column prop="title" label="轮播图标题" class="news-title"></el-table-column>
                <el-table-column label="轮播图头图" >
                    <template slot-scope="scope" >
                        <img :src="scope.row.img" class="swiper-img">
                    </template>
                </el-table-column>
                <el-table-column prop="newsId.title" label="轮播图新闻"></el-table-column>
                <el-table-column prop="status" label="是否显示" >
                    <template slot-scope="scope" >
                        {{scope.row.status ? '显示': '不显示'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope" >
                        <!-- <el-button type="primary" @click="newsDetail(scope.row._id)">详情</el-button> -->
                        <el-button type="warning" @click="swiperEditor(scope.row._id)">编辑</el-button>
                        <el-button type="danger" @click="swiperDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="clearfix">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,7,10,2]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totle"
                    style='float:right;margin-right:100px;margin-top:10px;'>
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            SwiperData:[],
            currentPage:1,
            totle:0,
            formData:{
                page:1,
                page_size:10
            }
        }
    },
    methods:{
        getSwiperData(){
            this.$axios.get('/admin/swiper',this.formData).then(res=>{
                console.log(res)
                this.SwiperData = res.data
                this.totle = res.count
            })
        },
        swiperDelete(id){
            const _this = this
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/admin/swiper/${id}`).then(res=>{
                        if(res.code==200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                                });
                            _this.getSwiperData()
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });        
        },
        swiperEditor(id){
            this.$router.push({path:'/swipereditor',query:{id:id}})
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.formData.page = val
            this.getSwiperData()
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
            this.formData.page_size = val 
            this.getSwiperData()
        }
    },
    created(){
        this.getSwiperData()
    }
}
</script>
<style lang="scss" scoped>
.swiper-p-box{
    .swiper-img{
        max-width: 200px;
        max-height: 200px;
    }
}
</style>
