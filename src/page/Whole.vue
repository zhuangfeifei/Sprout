<template>
    <div id="Wgole">
        <van-pull-refresh class="la" v-model="show" @refresh="onRefresh" :pulling-text="a" :loosing-text="a" :loading-text="a" :head-height="0" :animation-duration="0">
            <div class="sign">
                <div class="signs">

                    <nav>
                        <div class="Jump"><img @click="onRefresh" src="../assets/img/活动页面_上翻箭头@2x.png" alt=""></div>
                        <div class="Statistics">
                            <div class="participate"><div><p>60</p><p>参与萌娃</p><p>∨</p></div></div>
                            <div class="vote"><div><p>1000</p><p>累计投票</p><p>∨</p></div></div>
                            <div class="amount"><div><p>2000</p><p>访问量</p><p>∨</p></div></div>
                        </div>
                    </nav>

                    <div class="search">
                        <div><input type="text" placeholder="输入姓名或者编号"></div>
                        <img src="../assets/img/活动页面_搜索按钮@2x.png" alt="">
                    </div>

                    <div class="tab">
                        <span :class="{active:num == index}" @click="tabs(index)" v-for="(item,index) in tab_list" :key="index">{{item}}</span>
                    </div>

                    <div class="list">
                        <div class="list_1" @click="List_detils">
                            <div class="list_item" v-for="(item,index) in 5" :key="index">
                                <img src="../assets/img/er.jpg" alt="">
                                <p>蒋婷婷</p>
                                <p>今年12岁，擅长硬笔书法和 毛笔</p>
                                <div><img src="../assets/img/活动页面_图标_投票数@2x.png" alt=""><span>2684</span><span>投票</span></div>
                            </div>
                        </div>
                        <div class="list_2">
                            <div class="list_item" v-for="(item,index) in 5" :key="index">
                                <img src="../assets/img/er.jpg" alt="">
                                <p>蒋婷婷</p>
                                <p>今年12岁，擅长硬笔书法和 毛笔</p>
                                <div><img src="../assets/img/活动页面_图标_投票数@2x.png" alt=""><span>2684</span><span>投票</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </van-pull-refresh>

        <div class="footter">
            <router-link to="/Signup"><div>我要报名</div></router-link>
            <div @click="rule">
                <img src="../assets/img/活动页面_图标_活动规则@2x.png" alt="">
                <span>活动规则 </span>
            </div>
        </div>

        <van-popup v-model="shows" class="popups">
            <div class="rule_list">
                <h3>活动规则</h3>
                <div class="rule_1">
                    <div class="rule_2">
                        <ol>
                            <li>1.&nbsp;&nbsp;报名时间  2018.07.01至2018.07.10</li>
                            <li>2.&nbsp;&nbsp;投票时间 2018.07.11至2018.07.15</li>
                            <li>3.&nbsp;&nbsp;每人每天限投1票</li>
                            <li>4.&nbsp;&nbsp;活动结束后会根据投票排名给到奖品</li>
                            <li>5.&nbsp;&nbsp;实体奖品请在活动结束后3日内领取实体 奖品请在活动结束后3日内领取</li>
                            <li>5.&nbsp;&nbsp;实体奖品请在活动结束后3日内领取实体 奖品请在活动结束后3日内领取</li>
                            <li>5.&nbsp;&nbsp;实体奖品请在活动结束后3日内领取实体 奖品请在活动结束后3日内领取</li>
                            <li>5.&nbsp;&nbsp;实体奖品请在活动结束后3日内领取实体 奖品请在活动结束后3日内领取</li>
                            <li>5.&nbsp;&nbsp;实体奖品请在活动结束后3日内领取实体 奖品请在活动结束后3日内领取</li>
                            <li>5.&nbsp;&nbsp;实体奖品请在活动结束后3日内领取实体 奖品请在活动结束后3日内领取</li>
                            <li>5.&nbsp;&nbsp;实体奖品请在活动结束后3日内领取实体 奖品请在活动结束后3日内领取</li>
                        </ol>
                    </div>
                </div>
                <img @click="rule" src="../assets/img/活动规则_弹窗_删除@2x.png" alt="">
            </div>
        </van-popup>

        

    </div>
</template>
<script>
export default {
    data(){
        return{
            show:false,a:' ', tab_list: ['全部萌娃','最新萌娃','人气排名'],num:0, shows: false, 
        }
    },
    beforeCreate(){
        
    },
    mounted(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        
        
    },
    computed:{
        
    },
    methods:{
        onRefresh() {
            // this.$toast('刷新成功');
            setTimeout(()=>{
                this.show = false
                this.$router.push({path:'/'})
            },100)
        },
        tabs(index){
            this.num = index
        },
        rule(){
            this.shows = !this.shows
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
    #Wgole{
        width: 100%; font-size: 4vw; background-color: white;
    }

    *{
         box-sizing: border-box;
    }

    .sign{
        width: 100%; height: 100%; overflow-y: auto;
        .signs{
            width: 100%; padding-bottom: 25vw;
        }
    }

    nav{
        width: 100%; height: 40vh; 
        background: url("../assets/img/活动页面_统计大背景@2x.png") no-repeat; background-size: 100% 100%;
        .Jump{
            width: 15%; height: 18vw; position: absolute; top: 2vw; left: 42.5%;
            -webkit-animation:dong 1s linear 0s infinite alternate;
            img{
                width: 100%; height: 100%;
            }
        }
        .Statistics{
            width: 100%; height: 27vw; margin: 0 auto; display: flex; position: absolute; top: 14vw; left: 5%;
            .participate,.vote,.amount{
                width: 34%; height: 100%; background: url("../assets/img/活动页面_统计背景@2x.png") no-repeat; background-size: 100% 100%;
                div{
                    text-align: center; padding-top: 4vw; color:rgba(221,117,49,1); font-family:FZY1JW--GB1-0; 
                    transform: rotateY(9deg);
                    -ms-transform:rotate(9deg); /* Internet Explorer */
                    -moz-transform:rotate(9deg); /* Firefox */
                    -webkit-transform:rotate(9deg); /* Safari 和 Chrome */
                    -o-transform:rotate(9deg); /* Opera */
                    p{ margin: 0;font-size: 3.6vw; }
                    p:nth-child(1){
                        font-size: 7vw;
                    }
                }
            }
            div:nth-child(2){
                 position: relative; left: -5vw;
            }
             div:nth-child(3){
                 position: relative; left: -10vw
            }
        }
    }

    .search{
        width: 90%; height: 10vw; display: flex; justify-content: space-between; margin: 2vw 5%;
        div{
            width: 85%; height: 100%; 
            background: url("../assets/img/活动页面_搜索框@2x.png") no-repeat; background-size: 100% 100%;
            input{
                width: 100%; height: 100%; border: 0; background: none; outline: none; padding-left: 5vw;
            }
            input:-moz-placeholder{
                color:rgba(206,206,206,1); font-family:PingFang-SC-Regular;
            }
            ::-webkit-input-placeholder{
                color:rgba(206,206,206,1); font-family:PingFang-SC-Regular;
            }
        }
        img{
            width: 8vw; height: 8vw; margin-top: 1vw;
        }
    }
    
    .tab{
        width: 100%; display: flex; justify-content: space-around; padding: 0 5vw;
        font-family:PingFang-SC-Medium; color:rgba(43,43,43,1); line-height: 7vw; margin-top: 6vw;
        .active{ color:rgba(255,139,75,1); border-bottom: 0.5vw solid rgba(255,139,75,1);}
    }

    .list{
        width: 90%; margin: 0 auto; display: flex;
        .list_1,.list_2{
            width: 50%;
            .list_item{
                width: 95%; border-radius: 3vw; box-shadow:4px 0px 16px rgba(35,24,21,0.2); font-size: 3.5vw; padding-bottom: 3vw; margin-top: 5vw;
                img{
                    width: 100%; height: 35vw; border-top-left-radius: 3vw; border-top-right-radius: 3vw;
                }
                p{margin: 0; padding: 0 2vw; line-height: 4vw; margin-top: 2vw; }
                p:nth-child(3){
                    color:rgba(75,75,75,1); font-size: 3vw; margin-top: 1vw;
                }
                div{
                    width: 100%; height: 6vw; padding: 0 2vw; margin-top: 3vw;
                    img{ width: 5vw; height: 5vw; position: relative; top: 1vw; margin-right: 1vw; }
                    span:nth-child(3){
                        float: right; background-color: rgba(255,139,75,1); color: white; padding: 0.5vw 3vw; border-radius: 1vw;
                    }
                }
            }
        }
        .list_2{
            .list_item{ float: right}
        }
    }

    .footter{
        width: 100%; height: 20vw; position: fixed; bottom: 0; left: 0; display: flex; -webkit-animation:bottoms 1s linear 0s 1 alternate;
        a{ width: 70%; height: 100%;}
        a div:nth-child(1){
            width: 100%; height: 100%; text-align: center; background:rgba(117,190,168,1); line-height: 20vw; 
            font-family:PingFang-SC-Bold; font-weight: bold; color: white; font-size: 5vw;
        }
        div{
            width: 30%; height: 100%; text-align: center; background-color: rgba(255,255,255,1); line-height: 20vw; 
            font-family:PingFang-SC-Medium; font-weight: Medium; color:rgba(117,190,168,1);
            img{
                width: 5vw; height: 6vw; position: relative; top: 1.2vw;
            }
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


