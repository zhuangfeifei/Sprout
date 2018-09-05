<template>
  <div id="app">
    <transition :name="transitionName">
        <!--每个页面缓存，只有第一次加载会请求数据，执行生命周期-->
        <!--<keep-alive><router-view /></keep-alive>-->
        <!--只有返回才缓存页面，应该用这个-->
        <!--<navigation><router-view /></navigation>-->
        <router-view />
    </transition>
    <audio autoplay loop id="audio" ref="audio" style="display:none">
        <source src="http://www.homeamc.cn/shopping/static/img/muse.mp3" type='audio/ogg'>
        <source src="http://www.homeamc.cn/shopping/static/img/muse.mp3" type='audio/mpeg'>	
    </audio>
    <img class="imgs" :class="{start_stop: isShow}" @click="isUp" src="./assets/img/yy.png" alt="">
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import Api from './api'
export default {
  name: 'App',
  data(){
    return{
        transitionName:'', isShow:true
    }
  },
  computed:{
    
  },
  created(){
      this.wxs()
      $(document).ready(()=>{
            if(this.isShow){
                    // 创建页面监听，等待微信端页面加载完毕 触发音频播放
                document.addEventListener('DOMContentLoaded', function () {
                    function audioAutoPlay() {
                        var audio = document.getElementById('audio')
                            audio.play()
                        document.addEventListener("WeixinJSBridgeReady", function () {
                            audio.play()
                        }, false)
                    }
                    audioAutoPlay()
                })
                    // 创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
                // document.addEventListener('touchstart', function () {
                //     function audioAutoPlay() {
                //         var audio = document.getElementById('audio')
                //             audio.play()
                //     }
                //     audioAutoPlay();
                // })
            }
      })   
  },
  methods:{
      isUp(){
        this.isShow = !this.isShow
        var audio = document.getElementById('audio')
        if(this.isShow){
            audio.play()
        }else{
            audio.pause()
        }
      },
      wxs(){
            Api.post('/shopping/vote/shire',$.param({ wxh: this.$Util.getLocal('sprout_wxhs'), openId: this.$Util.getLocal('sprout_openIds') }))
            .then(res =>{
                // console.log(res.data)
                if(res.data.code == 200) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.data.appId, // 必填，公众号的唯一标识
                        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.data.nonce, // 必填，生成签名的随机串
                        signature: res.data.data.signature,// 必填，签名
                        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表
                    })
                    wx.ready(()=>{
                        var audio = document.getElementById('audio')
                        audio.play()
                        wx.onMenuShareAppMessage({
                            title: '方圆里萌主活动', // 分享标题
                            desc: '谁才是苏城方圆里公认的“萌主”？ 暨苏州相城方圆里最萌宝贝线上评选活动', // 分享描述
                            link: 'http://www.homeamc.cn/shopping/eva/seminar?wxh=' + this.$Util.getLocal('sprout_wxhs'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://www.homeamc.cn/shopping/static/img/eva.png', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function (res) {
                                // console.log(res)
                            },
                            fail: function (res) {
                                // console.log(res)
                            }
                        })
                        wx.onMenuShareTimeline({
                            title: '方圆里萌主活动', // 分享标题
                            link: 'http://www.homeamc.cn/shopping/eva/seminar?wxh=' + this.$Util.getLocal('sprout_wxhs'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://www.homeamc.cn/shopping/static/img/eva.png', // 分享图标
                            success: function (res) {
                                // console.log(res)
                            },
                            fail: function (res) {
                                // console.log(res)
                            }
                        })
                    })
                }
            })
            .catch(err => console.log(err))
        },
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



    .imgs{
        width: 10vw; height: 10vw; position: fixed; top: 2vw; right: 3vw; z-index: 99999;
    }
    .start_stop{
        animation: rights 1.5s infinite linear; -webkit-animation: rights 1.5s infinite linear;
    }

    @keyframes rights {
        from {transform: rotate(0deg)}
        to {transform: rotate(360deg)}
    }



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
