import Vue from 'vue'
import Router from 'vue-router'
import layout from '../layout'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:()=>import('../views/login.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      redirect:'/home',
      children:[
        {
          path:'/home',
          name:'home',
          component:()=>import('../views/home.vue')
        },
        {
          path:'/adminlist',
          name:'adminlist',
          component:()=>import('../views/adminUser/adminuserlist.vue')
        },
        {
          path:'/adduser',
          name:'adduser',
          component:()=>import('../views/adminUser/addadminuser.vue')
        },
        {
          path:'/swiperlist',
          name:'swiperlist',
          component:()=>import('../views/swiper/swiperlist.vue')
        },
        {
          path:'/addswiper',
          name:'addswiper',
          component:()=>import('../views/swiper/addswiper.vue')
        },
        {
          path:'/swipereditor',
          name:'swipereditor',
          component:()=>import('../views/swiper/addswiper.vue')
        },
        {
          path:'/addnews',
          name:'addnews',
          component:()=>import('../views/news/addnews.vue'),
          meta:{
            title:'添加新闻',
            Isinput:true
          }
        },
        {
          path:'/newseditor',
          name:'newseditor',
          component:()=>import('../views/news/addnews.vue'),
          meta:{
            title:'编辑新闻',
            Isinput:true
          }
        },
        {
          path:'/newslist',
          name:'newslist',
          component:()=>import('../views/news/newslist.vue')
        },
        {
          path:'/newsdetail',
          name:'newsdetail',
          component:()=>import('../views/news/newsdetail.vue'),
          meta:{
            title:'新闻详情',
            Isinput:false
          }
        },
        {
          path:'/test',
          name:'test',
          component:()=>import('../views/test.vue')
        }
      ]
    }
  ]
})
