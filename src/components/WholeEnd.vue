<template>
    <div id="Wgole_2">
        <van-pull-refresh class="la" v-model="show" @refresh="onRefresh" :pulling-text="a" :loosing-text="a" :loading-text="a" :head-height="0" :animation-duration="0">
            <div class="sign">
                <div class="signs">

                    <Header-Item></Header-Item>
                    
                    <div class="Rankings">
                        <div class="Rankings_title"><span>人气排名</span><span @click="rule">活动规则>></span></div>
                        <div class="Rankings_content">
                            <div class="Rankings_list" v-for="(item,index) in playerRankings" :key="index">
                                <div class="ranking_num">
                                    <span v-if="index > 2">{{index+1}}</span>
                                    <img v-else-if="index == 0" class="ranking_num" src="../assets/img/num1.png" alt="">
                                    <img v-else-if="index == 1" class="ranking_num" src="../assets/img/num2.png" alt="">
                                    <img v-else-if="index == 2" class="ranking_num" src="../assets/img/num3.png" alt="">
                                </div>
                                <div class="portrait">
                                    <div><img :src="imgUrl + item.coverPic" alt=""></div>
                                    <div><p>{{item.orderNum}}号</p><p>{{item.joinName}}</p></div>
                                </div>
                                <div class="Rankings_votes"><span>{{item.voteNum}}</span><img src="../assets/img/活动页面_图标_投票数@2x.png" alt=""></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </van-pull-refresh>

    </div>
</template>
<script>
import Header from './Header'
export default {
    data(){
        return{
            show:false,a:' ',
        }
    },
    components:{
        "Header-Item": Header,
    },
    beforeCreate(){
        
    },
    mounted(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        
        
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
        rule_show(){
            return this.$store.state.ruleShow
        },
        playerRankings(){
            // var list = this.$store.state.playerRankings
            // function compare(property) {
            //     return function(a, b) {
            //         var value1 = a[property];
            //         var value2 = b[property];
            //         return value1 - value2;
            //     }
            // }
            // var s = list.sort(compare('rownum'))  // 排序
            return this.$store.state.playerRankings
        },
    },
    methods:{
        onRefresh() {
            setTimeout(()=>{
                this.show = false   // 不加的话第二次滑动就会不执行
                this.$router.push({path:'/'})
            },100)
        },
        rule(){
            this.$store.commit('RULE_SHOW', !this.rule_show)
        },
        List_detils(){
            this.$router.push({path:'/Detils'})
        }
    },
    filters:{
        
    }
}
</script>
<style lang="less" scoped>
    #Wgole_2{
        width: 100%; font-size: 4vw; background-color: white;
    }

    *{
         box-sizing: border-box;
    }

    .sign{
        width: 100%; overflow-y: auto; overflow: hidden;
        .signs{
            width: 100%;
        }
    }

    
    .Rankings{
        width: 90%; margin: 0 auto; padding-bottom: 3vw;
        .Rankings_title{
            width: 100%; height: 10vw; line-height: 10vw; font-size: 4.5vw; font-family: PingFang-SC-Medium; font-weight: Medium;
            span:nth-child(2){
                float: right; color: rgba(255,139,75,1); font-size: 4vw;
            }
        }
        .Rankings_content{
            width: 100%; background:rgba(255,255,255,1); border-radius:2vw; box-shadow:0px 0px 20px rgba(0,0,0,0.16);
            margin-top: 2vw; padding: 5vw 0 2vw 0;
        }
        .Rankings_list{
            width: 100%; height: 18vw; display: flex; justify-content: space-around; line-height: 18vw; font-size: 7vw; color:rgba(84,179,156,1);
            .ranking_num{
                width: 10%; height: 100%; text-align: center;
                img{
                    width: 8vw; height: 8vw; margin-top: 4vw;
                }
            }
            // border: 1px solid red;
            div{
                width: 30%; height: 100%; 
            }
            .portrait{
                width: 35%; display: flex; padding-top: 3vw;
                p{ margin: 0}
                div:nth-child(1){
                    width: 12vw; height: 12vw;
                    img{ width: 100%; height: 100%; border-radius: 50%; }
                }
                div:nth-child(2){
                    width: calc(100% - 12vw); height: 12vw; padding-left: 3vw; line-height: 6vw;
                    p:nth-child(1){ font-size: 4.5vw; font-family: PingFang-SC-Medium; font-weight: Medium; color: rgba(43,43,43,1); }
                    p:nth-child(2){ font-size: 3.6vw; font-family: PingFang-SC-Regular; font-weight: Regular; color:rgba(75,75,75,1); }
                }
            }
        }
        .Rankings_votes{
            text-align: right; font-size: 5vw; color: rgba(128,128,128,1); padding-right: 2vw;
            img{ width: 4vw; height: 4vw; margin-left: 2vw; }
        }
    }

    

    .popups{
        width: 80%; height: 55vh; border-radius: 1vw;
        .rule_list{
            width: 100%; height: 100%;  padding-top: 4vw; position: relative;
            background: url("../assets/img/活动规则_弹窗_背景@2x.png") no-repeat; background-size: 100% 100%;
            h3{ text-align: center; }
            .rule_1{
                width: 90%; height: 26vh; margin: 0 auto; overflow-y: auto;
                .rule_2{
                    width: 100%; font-family:PingFang-SC-Regular; color:rgba(75,75,75,1);
                    ol{ list-style-type: decimal!important;}
                }
            }
            .rule_1::-webkit-scrollbar-track-piece {
                background-color: rgba(0, 0, 0, 0);
                border-left: 1px solid rgba(0, 0, 0, 0);
            }
            .rule_1::-webkit-scrollbar {
                width: 5px;
                height: 13px;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
            }
            .rule_1::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, 0.5);
                background-clip: padding-box;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                min-height: 28px;
            }
            .rule_1::-webkit-scrollbar-thumb:hover {
                background-color: rgba(0, 0, 0, 0.5);
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
            }
            img{
                width: 11vw; height: 18vw;
                position: absolute; top: -18vw; left: calc(50% - 5.5vw);
            }
        }
    }

    a{
        color: white;
    }


    @-webkit-keyframes dong{
		from{
			top:2vw;
		}
		to{
			top: 6vw;
		}
	}
    @-webkit-keyframes bottoms{
		from{
			bottom:-20vw;
		}
		to{
			bottom: 0vw;
		}
	}
    
</style>


