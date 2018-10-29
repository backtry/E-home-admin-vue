<template>
    <div class="newsdetail-box">
        <el-card>
            <div slot="header" >新闻详情</div>
            <div>
                <h3>{{newsDetailData.title}}</h3>
            </div>
            <div class="author-box">
                <span>作者:{{author}}</span>
                <span>{{newsDetailData.create_time}}</span>
            </div>
            <div v-html="newsDetailData.content">

            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            newsDetailData:{},
            author:''
        }
    },
    methods:{
        getData(){
            const id = this.$route.query.id
            this.$axios.get(`/admin/news/${id}`).then(res=>{
                if(res.code==200){
                    this.newsDetailData = res.data
                    this.author = res.data.author.nickname
                    this.newsDetailData.create_time=res.data.create_time.substring(0,10)
                }
            })
        }
    },
    created(){
        this.getData()
    }
}
</script>
<style lang="scss">
.newsdetail-box{
    .author-box{
        padding-left: 150px;
    }
}
</style>
