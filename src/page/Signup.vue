<template>
    <div id="Signup">

        <h3>谁才是苏城方圆里公认的“萌主”</h3>
        <h4>萌娃信息</h4>

        <div class="information">
            <p>萌娃姓名</p>
            <div class="inputs"><input type="text" placeholder="不超过10个字"></div>
            <p>个人介绍</p>
            <div class="inputs"><input type="text" placeholder="不超过15个字"></div>
            <p>手机号（方便联系哦！）</p>
            <div class="inputs"><input type="text"></div>
            <p>验证码</p>
            <div class="inputs inputs_code">
                <div class="code"><input type="text"></div>
                <button class="btn_code">验证码</button>
            </div>
            <p>萌娃照片<span>（最多上传5张）</span></p>
            <div class="img_list">
                <div class="imgs" v-for="(item,index) in Item_img" :key="index">
                    <img :src="item" alt="">
                    <img @click="deletes(index)" class="delet" src="../assets/img/我要报名_按钮_删除@2x.png" alt="">
                </div>
                <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" :disabled="disabled">
                    <div class="files"></div>
                </van-uploader>
            </div>
        </div>

        <button class="btn">提交申请</button>

        <router-link to="/Whole">
            <div class="gohome">返回 <br>首页</div>
        </router-link>

    </div>
</template>
<script>
export default {
    data(){
        return{
            Item_img:[], disabled:false
        }
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        
    },
    methods:{
        onRead(file) {
            // console.log(file)
            this.Item_img.push(file.content)
        },
        deletes(index){
            this.Item_img.splice(index,1)
        }
    },
    watch:{
        Item_img(val,old){
            if(val.length > 4){
                this.disabled = true
            }else{
                this.disabled = false
            }
        }
    }
}
</script>
<style lang="less" scoped>
    #Signup{
        width: 100%; background-color: white; min-height: 100vh; padding-bottom: 10vw;
    }

    h3{ text-align: center;}
    h4{ margin-left: 5vw;}

    .information{
        width: 90%; margin: 0 auto; padding: 5vw 4vw; box-sizing: border-box; font-family: PingFang-SC-Regular; font-weight: Regular;
        background:rgba(255,255,255,1); border-radius:1vw; box-shadow:0px 0px 20px rgba(0,0,0,0.16);
        .inputs{
            width: 100%; height: 9vw; border: 1px solid gainsboro; margin: 2vw 0 5vw 0; border-radius: 1.5vw; 
        }
        .inputs_code{ border: 0; display: flex; justify-content: space-between;}
        input{
            width: 100%; height: 9vw; border: 0; outline: none!important; background: none; padding-left: 3vw;
            box-sizing: border-box;
        }
        input:-moz-placeholder{
            color:rgba(206,206,206,1); font-family:PingFang-SC-Regular;
        }
        ::-webkit-input-placeholder{
            color:rgba(206,206,206,1); font-family:PingFang-SC-Regular;
        }
        p{ font-size: 4vw; margin: 0; font-family:PingFang-SC-Medium; font-weight: Medium;}
        span{ color: red;}

        .code{
            width: 50%; border: 1px solid gainsboro; border-radius: 1.5vw;
        }
        .btn_code{
            width: 30%; height: 9vw; background-color: white; border: 1px solid gainsboro; outline: none; border-radius: 1.5vw;
            
        }
    }

    .img_list{
        width: 100%;
        .imgs{
            width: 30%; height: 18vw; float: left; margin-right: 4%; margin-top: 3vw; position: relative;
            img{width: 100%; height: 100%; border-radius: 1.5vw;} 
            .delet{
                width: 5vw; height: 5vw; position: absolute; right: -2.5vw; top: -2.5vw;
            }
        }
        .imgs:nth-child(3){
            margin-right: 0;
        }
        .files{
            width: 24vw; height: 18vw; float: left; border-radius: 1vw; margin-top: 3vw;
            background: url("../assets/img/我要报名_添加图片@2x.png") no-repeat; background-size: 100% 100%;
        }
    }

    .btn{
        width: 90%; height: 13vw; margin-top: 10vw; margin-left: 5%; outline: none; border: 0; color: white; 
        font-family:PingFang-SC-Bold; font-weight: Bold; font-size: 4.5vw; letter-spacing: 0.5vw;
        background:rgba(117,190,168,1); border-radius:1.5vw; box-shadow:0px 0px 10px rgba(43,43,43,0.1);
    }

    .gohome{
        width: 17vw; height: 17vw; border-radius: 50%; background-color: white; position: fixed; bottom: 1vw; right: 5%; box-sizing: border-box;
        font-family:PingFang-SC-Medium; color:rgba(255,139,75,1); line-height: 5vw; text-align: center; padding-top: 3.5vw; font-size: 4vw;
        -webkit-animation: rights 1.5s linear 0s infinite alternate; box-shadow:0px 0px 20px rgba(0,0,0,0.16);
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


