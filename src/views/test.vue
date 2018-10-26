<template>
    <div>
        <RichTextEditor v-model="textData"></RichTextEditor>
        <el-button @click="Testmethods">测试</el-button>
    </div>
</template>

<script>
import RichTextEditor from '../components/quillTexteditor.vue'
export default {    
    components:{
        RichTextEditor
    },
    data(){
        return{
            textData:{}
        }
    },
    methods:{
        Testmethods(){
            console.log(this.textData)
        }
    },
    // watch:{
    //     textData(val){
    //         console.log(val),
    //         console.log(this.textData)
    //     }
    // }
}
</script>

<style lang="scss" scoped>

</style>