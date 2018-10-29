<template>
    <div class="addnews-p-box">
        <el-card>
            <div slot="header">{{title}}</div>
            <el-form label-width="80px" label-position="left" v-model="formData">
                <el-form-item label="新闻标题" >
                    <el-input v-model="formData.title" class="news-title" ></el-input>
                </el-form-item>
                <el-form-item label="作者" >
                    <el-select v-model="formData.author._id" v-if="IsEditor">
                        <el-option
                        v-for="(item,index) in authorData" :key="index"
                        :value="item._id" 
                        :label="item.nickname"
                        ></el-option>
                    </el-select>
                    <el-select v-model="formData.author" v-else>
                        <el-option
                        v-for="(item,index) in authorData" :key="index"
                        :value="item._id" 
                        :label="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻内容">
                    <RichTextEditor v-model="textData" class="richtext-box" 
                        v-bind:Fcontent="Fcontent" 
                        v-bind:FcontentText="FcontentText" >
                    </RichTextEditor>
                </el-form-item>
                <el-form-item label="新闻头图">
                    <UploadImg v-model="formData.img"></UploadImg>
                </el-form-item>
                <el-form-item label="新闻分类">
                    <el-select v-model="formData.type">
                        <el-option 
                        :value="item._id" 
                        v-for="(item,index) in typeData" :key="index"
                        :label="item.title"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Addnews" v-if="!IsEditor">提交添加</el-button>
                    <el-button type="primary" @click="Editornews" v-else>提交修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import UploadImg from '@/components/upload-avatar.vue'
import RichTextEditor from '../../components/quillTexteditor.vue'
export default {
    components:{
        RichTextEditor,
        UploadImg
    },
    data(){
        return{
            IsEditor:false,
            formData:{
                title:'',
                content:'',
                contentText:'',
                img:'',
                author:'',
                type:'',
            },
            authorData:[],
            textData:{},
            typeData:[],
            title:'',
            // 定义父传子的值
            Fcontent:'',
            FcontentText:'',
        }
    },
    methods:{
        getAuthor(){
            this.$axios.get('/admin/adminUser').then(res=>{
                this.authorData = res.data
            })
        },
        getType(){
            this.$axios.get('/admin/newscategory').then(res=>{
                this.typeData = res.data
            })
        },
        Addnews(){
            this.formData.content = this.textData.content
            this.formData.contentText = this.textData.contentText
            this.$axios.post('/admin/news',this.formData).then(res=>{
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.$router.push('/newslist')
                }
            })
        },
        Editornews(){
            this.formData.content = this.textData.content
            this.formData.contentText = this.textData.contentText
            const id = this.$route.query.id
            this.$axios.put(`/admin/news/${id}`,this.formData).then(res=>{
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.$router.push('/newslist')
                }
            })
        },
        getTitle(){
            this.title = this.$route.meta.title
        },
        getnewsData(){
            if(this.$route.query.id){
                this.IsEditor = true
                const id = this.$route.query.id
                this.$axios.get(`/admin/news/${id}`).then(res=>{
                    if(res.code==200){
                        delete res.data._id
                        delete res.data.update_time
                        delete res.data.create_time
                        console.log(res.data)
                        this.formData = res.data
                        this.Fcontent = res.data.content
                        this.FcontentText = res.data.contentText
                }
            })}
        }
    },
    watch:{
        $route(to){
            if(to.name == 'addnews' ){
                this.IsEditor = false
                this.formData = {
                    title:'',
                    content:'',
                    contentText:'',
                    img:'',
                    author:'',
                    type:'',
                }
                this.Fcontent = ''
            }
        }
    },
    created(){
        this.getAuthor()
        this.getType()
        this.getTitle()
        this.getnewsData()
    }
}
</script>

<style lang="scss" scoped>
.addnews-p-box{
    .news-title{
        width: 300px;
    }
} 
</style>
