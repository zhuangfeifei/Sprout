<template>
    <div id="swip">
        <van-list @load="onLoad" :offset="1" :immediate-check="false">
            <div class="swips">
                <div class="Have">
                    <img v-if="ACTIVITY.STATUS == 0" src="../assets/img/云朵_未开始@2x.png" alt="">
                    <img v-if="ACTIVITY.STATUS == 1" src="../assets/img/云朵_进行中@2x.png" alt="">
                    <img v-if="ACTIVITY.STATUS == 2" src="../assets/img/云朵_已结束@2x.png" alt="">
                </div>

                <div class="end">
                    <h3>奖品领取时间：</h3>
                    <p>2018年7月23日-7月31日</p>
                    <p>周一至周五15:00-17:00</p>
                    <h3>奖品领取地点：</h3>
                    <p>苏州市相城区华元路818号</p>
                    <p>方圆里商业广场苏浙徽农家大院</p>
                    <h3>奖品领取流程：</h3>
                    <p>通过宝贝名字和预留手机号码进行领奖</p>
                </div>

                <div class="foot" v-if="ACTIVITY">
                    <h3>{{ACTIVITY.TITLE}}</h3>
                    <p>报名时间： {{ACTIVITY.JOIN_START_TIME}}~{{ACTIVITY.JOIN_END_TIME}}</p>
                    <p>投票时间： {{ACTIVITY.VOTE_START_TIME}}~{{ACTIVITY.VOTE_END_TIME}}</p>
                </div>
                <div class="Jump"><img @click="next" src="../assets/img/活动页面_下翻箭头@2x.png" alt=""></div>
            </div>
        </van-list>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    beforeCreate(){
        this.$store.dispatch('activity')
    },
    computed:{
        ACTIVITY(){
            return this.$store.state.activity
        }
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        
    },
    methods:{
        onLoad() {
            setTimeout(()=>{
                // this.$router.replace({path:'/Whole'})
                if(this.ACTIVITY.STATUS == 0) this.$toast('活动还未开始！')
                if(this.ACTIVITY.STATUS == 1) this.$router.push({path:'/Whole'})
                if(this.ACTIVITY.STATUS == 2) this.$router.push({path:'/Whole'})
            },500)
        },
        next(){
            if(this.ACTIVITY.STATUS == 0) this.$toast('活动还未开始！')
            if(this.ACTIVITY.STATUS == 1) this.$router.push({path:'/Whole'})
            if(this.ACTIVITY.STATUS == 2) this.$router.push({path:'/Whole'})
            // this.$router.push({path:'/Whole'})
        },
        
    },
    watch:{
        
    }
}
</script>
<style lang="less" scoped>
    @import '../assets/toast.less';
    #swip{
        width: 100%; background: url("../assets/img/活动页面大背景@2x.png") no-repeat; background-size: 100% 95%;
    }
    
    

    .swips{
        width: 100%; height: 102vh; position: relative;
    }
    .Have{
        width: 25vw; height: 15vw; position: absolute; right: 0vw; top: 15.5vh;
        img{
            width: 100%; height: 100%;
        }
    }

    .end{
        width: 70%; text-align: center; position: absolute; top: 20vh; left: 15%; background-color: rgba(255, 255, 255, 0.9); border-radius: 2vw; line-height: 5vw;
        box-shadow:4px 0px 16px rgba(35,24,21,0.2);
        h3{ font-size: 4vw; }
        p{ font-size: 3.5vw; }
    }

    .font{font-family: PingFang-SC-Medium; font-weight: Medium;}
    .foot{
        width: 90%; height: 25vw; position: absolute; bottom: 18vw; left: 5%; text-align: center; .font;
        background: url("../assets/img/活动页面_详细信息背景框@2x.png") no-repeat; background-size: 100% 100%;
        h3{ line-height: 10vw; margin: 0; font-size: 4vw;}
        p{ margin: 0; line-height: 6vw; font-size: 3.5vw;}
        p:nth-child(2){ margin-top: 2vw;}
    }
    .Jump{
        width: 15%; height: 18vw; position: absolute; bottom: 4vw; left: 42.5%;
        animation:dong 1s linear 0s infinite alternate;
        -webkit-animation:dong 1s linear 0s infinite alternate;
        img{
            width: 100%; height: 100%;
        }
    }

    @keyframes dong{
		from{
			bottom:4vw;
		}
		to{
			bottom: 10vw;
		}
	}
    @-webkit-keyframes dong{
		from{
			bottom:4vw;
		}
		to{
			bottom: 10vw;
		}
	}
</style>


