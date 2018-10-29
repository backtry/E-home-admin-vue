<template>
    <div class="addswiper-box">
        <el-card class="addswiper-container">
            <div slot="header">添加轮播图</div>
            <el-form label-position="left" label-width="100px" v-model="formData">
                <el-form-item label="轮播图标题">
                    <el-input v-model="formData.title" class="swiper-title"></el-input>
                </el-form-item>
                <el-form-item label="轮播图头图">
                    <UploadImg v-model="formData.img"></UploadImg>
                </el-form-item>
                <el-form-item label="轮播图新闻">
                    <el-button type="primary" @click="pickNews">选择新闻</el-button>
                    <div class="picknews-detail clearfix" v-if="Iseditor">
                        <span class="title">{{this.formData.newsId.title.substr(0,20)+'...'}}</span>
                        <img :src="this.formData.newsId.img" class="img">
                    </div>
                    <el-dialog title="选择新闻" :visible.sync="dialogTableVisible">
                        <el-table 
                            :data="newslistData"
                            style="width: 100%">
                            <el-table-column prop="title" label="新闻标题" class="news-title">
                                <template slot-scope="scope">
                                    {{scope.row.title.substr(0,20)+'...'}}    
                                </template>
                            </el-table-column>
                            <el-table-column prop="author.nickname" label="新闻作者" ></el-table-column>
                            <el-table-column label="新闻头图" >
                                <template slot-scope="scope" >
                                    <img :src="scope.row.img" class="news-img">
                                </template>
                            </el-table-column>
                            <el-table-column prop="type.title" label="新闻分类" ></el-table-column>
                            <el-table-column label="操作" >
                                <template slot-scope="scope" >
                                    <el-button type="primary" @click="pickNewsOver(scope.row._id, scope.$index)">选择</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>
                    <div class="picknews-detail clearfix" v-if="!Iseditor&&formData.newsId">
                        <span class="title">{{this.newslistData[index].title.substr(0,20)+'...'}}</span>
                        <img :src="this.newslistData[index].img" class="img">
                    </div>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-switch
                        style="display: block"
                        v-model="formData.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="显示"
                        inactive-text="不显示"
                        active-value=1
                        inactive-value=0>
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序">
                    <template>
                    <el-input-number v-model="formData.sort" :min="1"></el-input-number>
                    </template>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addSwiper" v-if="!Iseditor">提交添加</el-button>
                    <el-button type="primary" @click="editorSwiper" v-else>提交修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import UploadImg from '@/components/upload-avatar.vue'
export default {
    components:{
        UploadImg
    },
    data(){
        return{
            Iseditor:false,
            formData:{
                title:'',
                img:'',
                newsId:'',
                status:0,
                sort:0
            },
            newslistData:[],
            index:0,
            dialogTableVisible:false,
        }
    },
    methods:{
        pickNews(){
            this.dialogTableVisible=!this.dialogTableVisible
        },
        pickNewsOver(id,index){
            this.formData.newsId = id
            this.index = index
            this.pickNews()
        },
        getnewsData(){
            this.$axios.get('/admin/news').then(res=>{
                console.log(res)
                if(res.code==200){
                    this.newslistData = res.data
                }
            })
        },
        addSwiper(){
            this.$axios.post('/admin/swiper',this.formData).then(res=>{
                if(res.code==200){
                    this.$message.success(res.msg)
                    setTimeout(()=>{
                        this.$router.push('/swiperlist')
                    },500)
                }
            })
        },
        getSwiperdetail(){
            const _id = this.$route.query.id
            if(this.$route.query.id){
                this.Iseditor = true
                this.$axios.get(`/admin/swiper/${_id}`).then(res=>{
                    console.log(res)
                    this.formData = res.data
                })
            }
        },
        editorSwiper(){
            const _id = this.$route.query.id
            this.$axios.put(`/admin/swiper/${_id}`,this.formData).then(res=>{
                if(res.code==200){
                    this.$message.success(res.msg)
                    setTimeout(()=>{
                        this.$router.push('/swiperlist')
                    },500)
                }
            })
        }
    },
    watch:{
        $route(to){
            if(to.name == 'addswiper' ){
                this.Iseditor = false
                this.formData = {
                    title:'',
                    content:'',
                    contentText:'',
                    img:'',
                    author:'',
                    type:'',
                }
            }
        }
    },
    created(){
        this.getnewsData()
        this.getSwiperdetail()
    }
}
</script>
<style lang="scss" scoped>
.addswiper-box{
    .news-img{
        max-height: 100px;
        max-width: 100px;
    }
    .addswiper-container{
        min-height: 800px;
        .swiper-title{
            width: 200px;
        }
    }
    .picknews-detail{
        .title{
            display: block;
            width: 200px;
            float: left;
        }
        .img{
            display: block;
            height: 200px;
            float: left;
        }
    }
}
</style>
