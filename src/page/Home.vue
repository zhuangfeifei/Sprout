<template>
    <div id="swip">
        <van-list @load="onLoad" :offset="1">
            <div class="swips">
                <div class="Have"></div>
                <div class="foot">
                    <h3>苏州相城方圆里最萌宝贝线上评选活动</h3>
                    <p>报名时间    2018.07.01~2018.07.10</p>
                    <p>投票时间    2018.07.11~2018.07.15</p>
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
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        // $(document).ready(()=>{
        //     $('html,body').animate({scrollTop:0},500)
        // }) 
    },
    methods:{
        onLoad() {
            setTimeout(()=>{
                // this.$router.replace({path:'/Whole'})
                this.$router.push({path:'/Whole'})
            },500)
        },
        next(){
            this.$router.push({path:'/Whole'})
        }
    },
    watch:{
        
    }
}
</script>
<style lang="less" scoped>
    #swip{
        width: 100%; background: url("../assets/img/活动页面大背景@2x.png") no-repeat; background-size: 100% 95%;
    }

    .swips{
        width: 100%; height: 102vh; position: relative;
    }
    .Have{
        width: 25vw; height: 15vw; position: absolute; right: 0vw; top: 15.5vh;
        background: url("../assets/img/活动页面_进行中@2x.png") no-repeat; background-size: 100% 100%;
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
        -webkit-animation:dong 1s linear 0s infinite alternate;
        img{
            width: 100%; height: 100%;
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


