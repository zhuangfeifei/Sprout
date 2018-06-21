import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/page/Home'
// import Whole from '@/page/Whole'
// import Detils from '@/page/Detils'
// import Signup from '@/page/Signup'

Vue.use(Router)

//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Home = resolve => require(['@/page/Home'], resolve)
const Whole = resolve => require(['@/page/Whole'], resolve)
const Detils = resolve => require(['@/page/Detils'], resolve)
const Signup = resolve => require(['@/page/Signup'], resolve)

export default new Router({
  routes: [
    {
      path:'/',
      component: Home,
      meta:{
          index:0,
          keepAlive: false // 不需要缓存
      }
    },
    {
      path:'/Whole',
      name:'Whole',
      component: Whole,
      meta:{
          index:1,
          keepAlive: true // 需要缓存
      }
    },
    {
      path:'/Detils',
      name:'Detils',
      component: Detils,
      meta:{
          index:2,
          keepAlive: false // 不需要缓存
      }
    },
    {
      path:'/Signup',
      name:'Signup',
      component: Signup,
      meta:{
          index:3,
          keepAlive: false // 不需要缓存
      }
    }
  ]
})
