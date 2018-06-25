<template>
    <div id="Wgole_1">
        <van-pull-refresh class="la" v-model="show" @refresh="onRefresh" :pulling-text="a" :loosing-text="a" :loading-text="a" :head-height="0" :animation-duration="0">
            <div class="sign">
                <div class="signs" :class="{scrolls:!Signup_show}">

                    <Header-Item></Header-Item>

                    <div class="search">
                        <div><input type="text" v-model="value" placeholder="输入姓名或者编号"></div>
                        <img @click="search_name" src="../assets/img/活动页面_搜索按钮@2x.png" alt="">
                    </div>

                    <div class="tab">
                        <span :class="{active:num == index}" @click="tabs(index)" v-for="(item,index) in tab_list" :key="index">{{item}}</span>
                    </div>

                    <div class="list" v-if="playerRankings">
                        <div class="list_1">
                            <div class="list_item" v-if="index%2 == 0" v-for="(item,index) in playerRankings" @click="List_detils(item)" :key="index">
                                <img :src="imgUrl + item.coverPic" alt="">
                                <p>{{item.joinName}}</p>
                                <p>{{item.remark}}</p>
                                <div><img src="../assets/img/活动页面_图标_投票数@2x.png" alt=""><span>{{item.voteNum}}</span><span>投票</span></div>
                                <section>{{item.orderNum}}号</section>
                            </div>
                        </div>
                        <div class="list_2">
                            <div class="list_item" v-if="index%2 != 0" v-for="(item,index) in playerRankings" @click="List_detils(item)" :key="index">
                                <img :src="imgUrl + item.coverPic" alt="">
                                <p>{{item.joinName}}</p>
                                <p>{{item.remark}}</p>
                                <div><img src="../assets/img/活动页面_图标_投票数@2x.png" alt=""><span>{{item.voteNum}}</span><span>投票</span></div>
                                <section>{{item.orderNum}}号</section>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </van-pull-refresh>

        <div class="footter" v-show="Signup_show">
            <router-link to="/Signup"><div>我要报名</div></router-link>
            <div @click="rule">
                <img src="../assets/img/活动页面_图标_活动规则@2x.png" alt="">
                <span>活动规则 </span>
            </div>
        </div>

    </div>
</template>
<script>
import Header from './Header'
export default {
    name:'test-keep-alive',
    data(){
        return{
            show:false,a:' ', tab_list: ['全部萌娃','最新萌娃','人气排名'],num:0, shows: false, Signup_show:true,
            scroll_count:0, voteNum:'', orderNum:'', value:''
        }
    },
    components:{
        "Header-Item": Header,
    },
    beforeCreate(){
        
    },
    mounted(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        
        // window.addEventListener('scroll', this.menu)
    },
    computed:{
        rule_show(){
            return this.$store.state.ruleShow
        },
        playerRankings(){
            return this.$store.state.playerRankings
        },
        imgUrl(){
            return this.$store.state.imgUrl
        },
        fetchLoading_detils(){
            return this.$store.state.fetchLoading_detils
        }
    },
    methods:{
        onRefresh() {
            setTimeout(()=>{
                this.show = false     // 不加的话第二次滑动就会不执行
                this.$router.push({path:'/'})
            },100)
        },
        tabs(index){
            this.num = index
            if(index == 0) {
                this.$store.commit('PLAYER_RANKINGS_ORDERNUM', true)
                this.$store.dispatch('playerRankings')
            }
            if(index == 1) this.$store.dispatch('newEva')
            if(index == 2) {
                this.$store.commit('PLAYER_RANKINGS_ORDERNUM', false)
                this.$store.dispatch('playerRankings')
            }
        },
        rule(){
            this.$store.commit('RULE_SHOW', !this.rule_show)
        },
        List_detils(item){
            this.$store.dispatch('evaDetails', item.id)
            this.voteNum = item.voteNum
            this.orderNum = item.orderNum
        },
        menu() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop
            this.scroll_count = this.scroll
        },
        search_name(){
            this.$store.dispatch('playerRankings', this.value)
        }
    },
    watch:{
        scroll_count(val,old){
            if(val > old){
                this.Signup_show = false
            }else{
                this.Signup_show = true
            }
        },
        fetchLoading_detils(val,old){
            if(val) this.$router.push({path:'/Detils',query:{voteNum: this.voteNum, orderNum: this.orderNum}})
            this.$store.commit('SET_LOADING_DETILS', false)
        },
    },
    filters:{
        
    }
}
</script>
<style lang="less" scoped>
    #Wgole_1{
        width: 100%; font-size: 4vw; background-color: white;
    }

    *{
         box-sizing: border-box;
    }

    .sign{
        width: 100%; height: 100%; overflow-y: auto; overflow: hidden;
        .signs{
            width: 100%; padding-bottom: 25vw;
        }
        .scrolls{ padding-bottom: 10vw!important }
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
                width: 95%; border-radius: 3vw; box-shadow:4px 0px 16px rgba(35,24,21,0.2); font-size: 3.5vw; padding-bottom: 3vw; margin-top: 5vw; position: relative;
                img{
                    width: 100%; border-top-left-radius: 3vw; border-top-right-radius: 3vw;
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
                        position: relative; top: 0.8vw;
                    }
                }
                section{
                    width: 13vw; height: 7vw; position: absolute; top: 0; left: 0; text-align: center; line-height: 7vw; color: white; font-weight: Regular;
                    background-color: rgba(117,190,168,1); opacity: 0.8; border-top-left-radius: 3vw; font-size: 4vw; font-family: PingFang-SC-Regular;
                }
            }
        }
        .list_2{
            .list_item{ float: right}
        }
    }

    .footter{
        width: 100%; height: 20vw; position: fixed; bottom: 0; left: 0; display: flex; animation:bottoms 1s linear 0s 1 alternate;
        -webkit-animation:bottoms 1s linear 0s 1 alternate;
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

    @keyframes bottoms{
		from{
			bottom:-20vw;
		}
		to{
			bottom: 0vw;
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

    .fade-enter-active, .fade-leave-active {
        transition: bottom 1s
    }
    .fade-enter, .fade-leave-active {
        bottom: 0
    }
    
</style>


