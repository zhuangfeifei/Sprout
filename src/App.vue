<template>
  <div id="app">
    <transition :name="transitionName">
        <!--每个页面缓存，只有第一次加载会请求数据，执行生命周期-->
        <!--<keep-alive><router-view /></keep-alive>-->
        <!--只有返回才缓存页面，应该用这个-->
        <!--<navigation><router-view /></navigation>-->
        <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
        transitionName:''
    }
  },
  computed:{
    
  },
  created(){
         
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > from.meta.index){
            this.transitionName = 'slide-right'
        }else{
            this.transitionName = 'slide-left'
        }
        if(to.meta.index == 1 && from.meta.index == 0) {
            this.transitionName = 'slide-top'
        }
        if(to.meta.index == 0 && from.meta.index == 1) {
            this.transitionName = 'slide-bottom'
        }
    }
  }
}
</script>

<style>
    .slide-bottom-enter-active,
    .slide-bottom-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-top-enter-active,
    .slide-top-leave-active {
        will-change: transform;
        transition: all 0.5s;
        position: absolute;
        width:100%;
        left:0;
    }
    .slide-right-enter-active,
    .slide-right-leave-active {
        will-change: transform;
        transition: all 0.5s;
        position: absolute;
        width:100%;
        left:0;
        bottom: 0;
    }
    .slide-bottom-enter {
        transform: translateY(-100%);
    }
    .slide-bottom-leave-active {
        transform: translateY(100%);
    }
    .slide-top-enter {
        transform: translateY(100%);
    }
    .slide-top-leave-active {
        transform: translateY(-100%);
    }
    .slide-right-enter {
        transform: translateX(100%);
    }
    .slide-right-leave-active {
        /*transform: translateX(-100%);*/
    }
    .slide-left-enter {
        transform: translateX(-100%);
    }
    .slide-left-leave-active {
        /*transform: translateX(100%);*/
    }
</style>
