<template>
    <div>
        <el-card>
            <div slot="header">添加新闻</div>
            <el-form label-width="80px" label-position="left" v-model="formData">
                <el-form-item label="新闻标题" >
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="作者" >
                    <el-select v-model="formData.author">
                        <el-option
                        v-for="(item,index) in authorData" :key="index"
                        :value="item._id" 
                        :label="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻内容">
                    <RichTextEditor v-model="textData"></RichTextEditor>
                </el-form-item>
                <el-form-item label="新闻头图">
                    <UploadImg v-model="formData.img"></UploadImg>
                </el-form-item>
                <el-form-item label="新闻分类">
                    <el-select v-model="formData.type">
                        <el-option 
                        value="" 
                        v-for="(item,index) in typeData" :key="index"
                        :label="item.title"
                        ></el-option>
                    </el-select>
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
            typeData:[]
        }
    },
    methods:{
        getAuthor(){
            this.$axios.get('/admin/adminUser').then(res=>{
                console.log(res)
                this.authorData = res.data
            })
        },
        getType(){
            this.$axios.get('/admin/news/category').then(res=>{
                console.log(res)
                this.typeData = res.data
            })
        }
    },
    created(){
        this.getAuthor()
        this.getType()
    }
}
</script>

<style lang="scss" scoped>

</style>
