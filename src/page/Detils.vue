<template>
    <div id="Detils" v-show="show">

        <scroller lock-y>
            <div class="box1">
                <div class="box1-item" v-for="(item,index) in evaDetails.pictures" :key="index">
                    <img :src="imgUrl + item.PICTRUE_NAME" alt="">
                </div>
            </div>
        </scroller>

        <div class="detil">
            <div>
                <span>{{evaDetails.joinName}}</span>
                <img src="../assets/img/活动页面_图标_投票数@2x.png" alt="">
                <span>{{voteNum}}</span>
            </div>
            <p>{{evaDetails.remark}}</p>
            <button class="votes" @click="Success">投票</button>
        </div>

        <van-popup v-model="show_vote" class="sign_vote" @click-overlay="isvote">
            <div class="sign_votes">
                <img src="../assets/img/投票_图_投票成功@2x.png" alt="">
                <p class="hao">{{orderNum}}号</p>
                <p>当前排名{{voteDetails.rownum}}</p>
                <router-link to="/Signup"><button class="signs">我要报名</button></router-link>
                <button class="vote">给Ta拉票</button>
            </div>
        </van-popup>

    </div>
</template>
<script>
import { Scroller } from 'vux'
export default {
    data(){
        return{
            show:false, show_vote: false, voteNum:'',orderNum:''
        }
    },
    components: {
        Scroller,
    },
    computed:{
        imgUrl(){
            return this.$store.state.imgUrl
        },
        evaDetails(){
            if(this.$store.state.evaDetails == undefined){
                this.$store.commit('EVA_DETAILS')
            }
            return this.$store.state.evaDetails
        },
        voteDetails(){
            return this.$store.state.voteDetails
        },
    },
    beforeCreate(){
        this.$store.commit('VOTE_DETAILS', false)
    },
    activated(){ 
        // console.log(this.$store.state.evaDetails)
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        this.voteNum = this.$route.query.voteNum
        this.orderNum = this.$route.query.orderNum

        $(document).ready(()=>{
            var widths = 89
            this.show = true  // 房子dom提前渲染
            $('.box1').css('width',''+(widths*this.evaDetails.pictures.length + 11)+'vw')
        })
    },
    methods:{
        Success(){
            this.$store.dispatch('voteDetails', this.evaDetails.id)
            
        },
        isvote(){
            this.$router.push({path:'/Whole'})
        }
    },
    watch:{
        voteDetails(val,old){
            if(val.message == "投票成功") this.show_vote = !this.show_vote
        }
    },
    filters:{
        
    }
}
</script>
<style lang="less" scoped>
    #Detils{
        width: 100%; font-size: 4vw; height: 100vh; background-color: white; padding-top: 5vw;
    }

    *{
         box-sizing: border-box;
    }

    .box1 {
        height: 60vh; position: relative; padding-left: 3vw; padding-right: 8vw;
    }
    .box1-item {
        width: 84vw;
        height: 95%;
        display:inline-block;
        margin-left: 5vw;
        text-align: center;
        img{
            width: 100%; height: 100%; border-radius: 3vw; box-shadow:3px 3px 5px rgba(35,24,21,0.2);
        }
    }

    .detil{
        width: 100%; height: 20vh; padding: 0 5vw;
        div{
            width: 100%;
            span:nth-child(1){
                font-family:PingFang-SC-Medium; color:rgba(43,43,43,1); font-weight: Medium; font-size: 5.5vw;
            }
            img{
                width: 3.5vw; height: 4vw; margin-left: 6vw; 
            }
            span:nth-child(3){
                color: rgba(128,128,128,1); margin-left: 1vw; font-size: 4vw;
            }
        }
        p{ font-family:PingFang-SC-Regular; color:rgba(75,75,75,1);  font-size: 4vw;}
        .votes{
            width: 60%; height: 13vw; outline: none; border: 0; color: white; font-size: 4.5vw; margin-left: 20%; margin-top: 5vw;
            background-color: rgba(84,179,156,1); border-radius: 1vw; box-shadow:0px 0px 20px rgba(0,0,0,0.2);
        }
    }


    .sign_vote{
        width: 70%; height: 60vh; background:rgba(255,254,245,1); border-radius: 3vw; 
        // -webkit-animation:opacitys 2s linear 0s 1 alternate;
        .sign_votes{
            width: 100%; height: 100%; text-align: center; padding-top: 5vw;
            img{
                width: 45vw; height: 45vw;
            }
            .hao{
                font-family: PingFang-SC-Medium; font-weight: Medium; font-size: 5vw; margin-top: 2vw;
            }
            p{ margin: 0; font-size: 4vw; font-family: PingFang-SC-Regular; font-weight: Regular;}
            .signs,.vote{
                width: 27vw; height: 10vw; outline: none; border: 0; color: white;
                background-color: rgba(84,179,156,1); border-radius: 1vw; font-family: PingFang-SC-Medium; font-weight: Medium;
            }
            .vote{
                background-color: rgba(255,139,75,1); margin-top: 5vw; margin-left: 5vw;
            }
        }
    }

    @-webkit-keyframes opacitys{
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
	}

    
</style>


