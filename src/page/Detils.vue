<template>
    <div id="Detils" v-show="show">

        <router-link to="/Whole">
            <img class="gohome" src="../assets/img/fanhui.png" alt="">
        </router-link>

        <scroller lock-y>
            <div class="box1" @click="isShowimg">
                <div class="box1-item" v-for="(item,index) in evaDetails.pictures" :key="index">
                    <img :src="imgUrl + item.PICTRUE_NAME" alt="">
                </div>
            </div>
        </scroller>

        <!--<div class="box">
            <div class="box1">
                <div class="box1-item" v-for="(item,index) in evaDetails.pictures" :key="index">
                    <img :src="imgUrl + item.PICTRUE_NAME" alt="">
                </div>
            </div>
        </div>-->

        <div class="detil" v-show="isShow">
            <div>
                <span>{{evaDetails.joinName}}</span>
                <img src="../assets/img/活动页面_图标_投票数@2x.png" alt="">
                <span>{{voteNum}}</span>
            </div>
            <p>{{evaDetails.remark}}</p>
            <button class="votes" @click="Success">投票</button>
            <button class="votes1" @click="Draw">给Ta拉票</button>
        </div>

        <van-popup v-model="show_vote" class="sign_vote">
            <div class="sign_votes">
                <img src="../assets/img/投票_图_投票成功@2x.png" alt="">
                <p class="hao">{{orderNum}}号</p>
                <p>当前排名{{voteDetails.rownum}}</p>
                <router-link to="/Signup"><button class="signs">我要报名</button></router-link>
                <button class="vote" @click="Draw">给Ta拉票</button>
            </div>
        </van-popup>

        <img id="Draw_img" src="../assets/img/Draw.png" v-show="share_show" @click="Draw" alt="">

        <!--<van-popup class="rights" v-model="share_show" position="right" :overlay="false">
            <section><img src="../assets/img/share.png" alt=""></section>
            <p>谁才是苏城方圆里公认的“萌主”？ </p>
            <p>暨苏州相城方圆里最萌宝贝线上评选活动</p>
            <h4>分享到</h4>
            <div class="share">
                <div @click="shareFriends">
                    <img class="share_img1" src="../assets/img/拉票分享_微信好友@2x.png" alt="">
                    <p>微信好友</p>
                </div>
                <div @click="shareCircle">
                    <img class="share_img2" src="../assets/img/拉票分享_微信朋友圈@2x.png" alt="">
                    <p>朋友圈</p>
                </div>
            </div>
        </van-popup>-->

    </div>
</template>
<script>
import { Scroller } from 'vux'
import { Swiper, SwiperItem, } from 'vux'
export default {
    data(){
        return{
            show:false, show_vote: false, voteNum:'', orderNum:'', share_show: false,demo01_index:'',isShow:true,
        }
    },
    components: {
        Scroller,Swiper,SwiperItem
    },
    computed:{
        evaDetails(){
            if(this.$store.state.evaDetails == undefined){
                this.$store.commit('EVA_DETAILS')
            }
            return this.$store.state.evaDetails
        },
        imgUrl(){
            // var b= []
            // for(var i = 0; i < this.$store.state.evaDetails.pictures.length; i ++){
            //     var a = { img: this.$store.state.imgUrl + this.$store.state.evaDetails.pictures[i]}
            //     b.push(a)
            // }
            return this.$store.state.imgUrl
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
            this.show = true  // 防止dom提前渲染
            $('.box1').css('width',''+(widths*this.evaDetails.pictures.length + 11)+'vw')
        })

        
    },
    methods:{
        isShowimg(){
            this.isShow = !this.isShow
        },
        Success(){
            this.$dialog.confirm({
                title: '确认投票？',
            }).then(() => {
                this.$store.dispatch('voteDetails', this.evaDetails.id)
            }).catch(() => {
                
            });
        },
        isvote(){
            this.$router.go(-1)
        },
        Draw(){
            this.show_vote = false
            this.share_show = !this.share_show
        },
    },
    watch:{
        voteDetails(val,old){
            if(val.message == "投票成功") {
                this.voteNum ++
                this.show_vote = !this.show_vote 
            }
        }
    },
    filters:{
        
    }
}
</script>
<style lang="less" scoped>
    #Detils{
        width: 100%; font-size: 4vw; height: 100vh; background-color: white; padding-top: 5vw; position: relative;
    }

    *{
         box-sizing: border-box;
    }

    .box{
        width: 100%; height: 100vh; overflow-x: auto;
    }
    .box1 {
        width: 100%; position: relative; padding-left: 3vw; padding-right: 8vw;
    }
    .box1-item {
        width: 84vw; float: left;
        // height: 95%;
        margin-left: 5vw;
        text-align: center;
        img{
            width: 100%; max-height: 95vh; border-radius: 3vw; box-shadow:3px 3px 5px rgba(35,24,21,0.2);
        }
    }

    // .pictures_img{
    //     width: 100%;
    //     // .pictures_item{
    //     //     width: 100%; height: 50vh;
    //         img{
    //             width: 90vw;
    //             margin-left: 5vw; border-radius: 3vw; box-shadow:3px 3px 5px rgba(35,24,21,0.2);
    //         }
    //     // }
    // }

    .detil{
        width: 100%; height: 32vh; padding: 2vw 5vw; position: fixed; bottom: 0; left: 0; background-color: rgba(0,0,0,0.6); color:white;
        div{
            width: 100%;
            span:nth-child(1){
                font-family:PingFang-SC-Medium; font-weight: Medium; font-size: 5.5vw;
            }
            img{
                width: 3.5vw; height: 4vw; margin-left: 6vw; 
            }
            span:nth-child(3){
             margin-left: 1vw; font-size: 4vw;
            }
        }
        p{ font-family:PingFang-SC-Regular; font-size: 4vw;}
        .votes{
            width: 40%; height: 13vw; outline: none; border: 0; color: white; font-size: 4.5vw; margin-top: 5vw; margin-left: 6.66%;
            background-color: rgba(84,179,156,1); border-radius: 1vw; box-shadow:0px 0px 20px rgba(0,0,0,0.2); float: left;
        }
        .votes1{
            width: 40%; height: 13vw; outline: none; border: 0; color: white; font-size: 4.5vw; margin-top: 5vw; margin-left: 6.66%;
            background-color: rgba(255,139,75,1); border-radius: 1vw; box-shadow:0px 0px 20px rgba(0,0,0,0.2); float: left;
        }
    }


    .sign_vote{
        width: 70%; height: 60vh; background:rgba(255,254,245,1); border-radius: 3vw; 
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

    #Draw_img{
        position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
    }

    .gohome{
        width: 10vw; height: 10vw; position: fixed; top: 2vw; left: 3vw; z-index: 9999;
    }


    .rights{
        width: 100%; height: 100vh; background:rgba(0,0,0,0.8); text-align: center; color: white;
        section{
            width: 35vw; height: 35vw; margin: 0 auto; margin-top: 12vh; margin-bottom: 6vw;
            img{
                width: 100%; height: 100%; border-radius: 2vw;
            }
        }
        h4{ font-size: 4.5vw; margin-top: 15vw; }
        p{ margin: 0; line-height: 7vw;}
        .share{
            width: 90%; margin: 0 auto; border-top: 0.5vw solid white; display: flex; justify-content: space-around; padding: 5vw 10vw; font-size: 3.5vw;
            .share_img1{
                width: 12vw; height: 10vw;
            }
            .share_img2{
                width: 11vw; height: 11vw;
            }
        }
    }

    @keyframes rights{
		from{
			right:-20%;
		}
		to{
			right:-1%;
		}
	}
    @-webkit-keyframes rights{
		from{
			right:-20%;
		}
		to{
			right:-1%;
		}
	}

    
</style>


