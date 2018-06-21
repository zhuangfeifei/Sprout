<template>
    <div id="Wgole_rule">
        <van-popup v-model="show" class="popups" :close-on-click-overlay="false" @click-overlay="rule">
            <div class="rule_list">
                <h3>活动规则</h3>
                <div class="rule_1">
                    <div class="rule_2" v-html="ACTIVITY">
                        
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
            show:true,
        }
    },
    beforeCreate(){
        
    },
    mounted(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        
        
    },
    computed:{
        ACTIVITY(){
            if(this.$store.state.activity == ''){
                this.$store.commit('ACTIVITY')
            }
            return this.$store.state.activity.REMARK.replace(/;/g,'').replace(/&gt/g,'>').replace(/&lt/g,'<').replace(/&apos/g,"'").replace(/&quot/g,"\\")
                .replace(/&#39/g,"'").replace(/&ensp/g,"'").replace(/&emsp/g,"'").replace(/base64/g,';base64').replace(/&ampwxfrom/g,'&amp;wxfrom').replace(/&ampwx_lazy/g,'&amp;wx_lazy')
        }
    },
    methods:{
        rule(){
            this.$store.commit('RULE_SHOW', false)
        }
    },
    filters:{
        
    }
}
</script>
<style lang="less" scoped>
    #Wgole_rule{
        width: 100%; font-size: 4vw; background-color: white;
    }

    *{
         box-sizing: border-box;
    }


    .popups{
        width: 80%; height: 60vh; border-radius: 1vw;
        .rule_list{
            width: 100%; height: 100%;  padding-top: 4vw; position: relative;
            background: url("../assets/img/活动规则_弹窗_背景@2x.png") no-repeat; background-size: 100% 100%;
            h3{ text-align: center; }
            .rule_1{
                width: 90%; height: 30vh; margin: 0 auto; overflow-y: auto;
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


