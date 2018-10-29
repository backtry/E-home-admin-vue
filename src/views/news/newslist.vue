<template>
    <div class="newslist-p-box">
        <el-card>
            <div slot="header">新闻列表</div>
            <el-table 
                :data="newslistData"
                style="width: 100%">
                <el-table-column prop="title" label="新闻标题" class="news-title"></el-table-column>
                <el-table-column prop="author.nickname" label="新闻作者" ></el-table-column>
                <el-table-column label="新闻头图" >
                    <template slot-scope="scope" >
                        <img :src="scope.row.img" class="news-img">
                    </template>
                </el-table-column>
                <el-table-column prop="type.title" label="新闻分类" ></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope" >
                        <el-button type="primary" @click="newsDetail(scope.row._id)">详情</el-button>
                        <el-button type="warning" @click="newsEditor(scope.row._id)">编辑</el-button>
                        <el-button type="danger" @click="newsDelete(scope.row._id)">删除</el-button>
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
            newslistData:[],
            totle:0,
            currentPage:1,
            formData:{
                page:1,
                page_size:10
            }
        }
    },
    methods:{
        getNewsData(){
            this.$axios.get('/admin/news',this.formData).then(res=>{
                console.log(res)
                if(res.code==200){
                    this.newslistData = res.data.map(item => {
                        item.title = item.title.substr(0, 20) + `...`
                        return item
                    })
                    this.totle = res.count
                }
            })
        },
        newsDetail(id){
            this.$router.push({path:'/newsdetail',query:{id:id}})
        },
        newsEditor(id){
            this.$router.push({path:'/newseditor',query:{id:id}})
        },
        newsDelete(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/admin/news/${id}`).then(res=>{
                            if(res.code==200){
                                this.$message.success(res.msg)
                                this.getNewsData()
                            }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            })
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.formData.page = val
            this.getNewsData()
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
            this.formData.page_size = val 
            this.getNewsData()
        }
    },
    created(){
        this.getNewsData()
    }
}
</script>
<style lang="scss" scoped>
.newslist-p-box{
    .news-title{
        max-width: 250px;
    }
    .news-img{
        max-width: 200px;

    }
}
</style>
