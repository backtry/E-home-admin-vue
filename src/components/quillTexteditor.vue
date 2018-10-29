<template>
    <div>
        <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                :v-model="contentData"
                class="richtext-box">
        </quill-editor>
    </div>
</template>
<script>
import Vue from 'vue'

import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)
export default {
    components: {quillEditor},
    props:{
        value:Object,  
        Fcontent:{
            type:String,
            required:true
        },
        FcontentText:{
            type:String,
            required:true
        }
    },
    data() {
      return {
       content: '',
       contentText:'',
       token:'',
       contentData:{},
        // 富文本框参数设置
        editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action: "https://upload-z1.qiniup.com",
              response: (res) => {
                return res.url
              },
              change: (xhr, formData) => {
                     formData.append('token', this.token)       
                }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    methods:{
        getToken(){
            axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                if(res.data.code==200){
                    this.token = res.data.data
                }
            })
        },
        onEditorChange({quill,content,text}){
            this.contentText = text
            this.$emit("input",{content:this.content,contentText:this.contentText})
        }
    },
    watch:{
        Fcontent(val){
            this.content=val
            this.contentText = this.FcontentText
            // console.log(this.Fcontent,this.FcontentText)
        }
    },
    created(){
        this.getToken()
    }
  }

</script>
<style lang="scss" scoped>
/deep/ .ql-container{
    min-height: 255px;
}
</style>
