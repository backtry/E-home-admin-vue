import axios from 'axios'
import router from '../router/index'

const instance = axios.create({
    baseURL:'/api',
    timeout:15000
})

const xhr = {
    get(url,data,config){
        return new Promise((resolve,reject)=>{
            instance.get(url,{params:data},config).then(res=>{
                resolve(res.data)
                if(res.code==403){
                    this.$message.error(res.msg)
                    router.push('/login')
                }
            }).catch(err=>{
                reject(err)
            })
        })
    },
    fetch(methods,url,data,config){
        return new Promise((resolve,reject)=>{
            instance[methods](url,data,config).then(res=>{
                resolve(res.data)
                if(res.code==403){
                    this.$message.error(res.msg)
                    router.push('/login')
                }
            }).catch(err=>{
                reject(err)
            })
        })
    },
    post(url,data,config){
        return this.fetch('post',url,data,config)
    },
    delete(url,data,config){
        return this.fetch('delete',url,data,config)
    }
}

export default xhr