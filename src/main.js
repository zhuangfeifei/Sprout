// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 缓存页面
// import Navigation from 'vue-navigation'
// Vue.use(Navigation, {router})

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

import store from './store'
Vue.prototype.$store = store
import Util from './storage'
Vue.prototype.$Util = Util

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    // error:'../static/error.png',
    // loading:'../static/placeholder.gif'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
