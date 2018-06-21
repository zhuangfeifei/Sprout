<template>
    <div id="Wgole_header">
        <nav>
            <div class="Jump"><img @click="onRefresh" src="../assets/img/活动页面_上翻箭头@2x.png" alt=""></div>
            <div class="Statistics">
                <div class="participate"><div><p>{{allCount.evaCount || 0}}</p><p>参与萌娃</p><p>∨</p></div></div>
                <div class="vote"><div><p>{{allCount.voteCount || 0}}</p><p>累计投票</p><p>∨</p></div></div>
                <div class="amount"><div><p>{{allCount.trafficCount || 0}}</p><p>访问量</p><p>∨</p></div></div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    beforeCreate(){
        
    },
    mounted(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        
        
    },
    computed:{
        allCount(){
            return this.$store.state.allCount
        }
    },
    methods:{
        onRefresh() {
            setTimeout(()=>{
                this.show = false
                this.$router.push({path:'/'})
            },100)
        },
    },
    filters:{
        
    }
}
</script>
<style lang="less" scoped>
    #Wgole_header{
        width: 100%; font-size: 4vw; background-color: white;
    }

    *{
         box-sizing: border-box;
    }

    .sign{
        width: 100%; height: 100%; overflow-y: auto;
        .signs{
            width: 100%; padding-bottom: 10vw;
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
    
</style>


