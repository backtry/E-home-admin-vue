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
        }
      ]
    }
  ]
})
