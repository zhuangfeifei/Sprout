import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Whole from '@/page/Whole'
import Detils from '@/page/Detils'
import Signup from '@/page/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component: Home,
      meta:{
          index:0
      }
    },
    {
      path:'/Whole',
      name:'Whole',
      component: Whole,
      meta:{
          index:1
      }
    },
    {
      path:'/Detils',
      name:'Detils',
      component: Detils,
      meta:{
          index:2
      }
    },
    {
      path:'/Signup',
      name:'Signup',
      component: Signup,
      meta:{
          index:3
      }
    }
  ]
})
