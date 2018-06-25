<template>
    <div id="Signup">

        <h3>谁才是苏城方圆里公认的“萌主”</h3>
        <h4>萌娃信息</h4>

        <div class="information">
            <p>萌娃姓名</p>
            <div class="inputs"><input type="text" v-model="list.name" placeholder="不超过10个字"></div>
            <p>个人介绍</p>
            <div class="inputs"><input type="text" v-model="list.remark" placeholder="不超过15个字"></div>
            
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

        <button class="btn" @click="xia">下一步</button>

        <van-popup class="rights" v-model="show" position="right" :overlay="false">
            <div class="information rights_">
                <p>手机号（方便联系哦！）</p>
                <div class="inputs"><input type="text" v-model="list.phone" placeholder="11位数"></div>
                <p>验证码</p>
                <div class="inputs inputs_code">
                    <div class="code"><input type="text" v-model="list.code" placeholder="6位数"></div>
                    <button class="btn_code" :class="{codes:disabled_btn}" @click="getCode" :disabled="disabled_btn">{{time}}</button>
                </div>
            </div>

            <div class="Tip">
                <p>Tip：1. 若需要修改图片信息请点击【返回】。</p>   
                <p>2. 请正确填写萌娃信息，若出现虚假、反动、违法行为，我们将剔除活动资格。</p>           
            </div>

            <button class="btn" @click="Submission">提交</button>
            
            <div class="gohome go" @click="xia">返回</div>
        </van-popup>

        <router-link to="/Whole">
            <div class="gohome">返回 <br>首页</div>
        </router-link>

    </div>
</template>
<script>
export default {
    data(){
        return{
            Item_img:[],Item_imgs:[], disabled:false, time:'验证码', 
            list:{
                name:'', remark:'', phone:'', code:'', formData:''
            },
            disabled:false,disabled_btn:false, show:false
        }
    },
    computed:{
        
    },
    created(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        
    },
    methods:{
        onRead(file) {
            // console.log(file)
            this.Item_img.push(file.content)
            this.Item_imgs.push(file.file)
        },
        deletes(index){
            this.Item_img.splice(index,1)
            this.Item_imgs.splice(index,1)
        },
        getCode(){
            if(this.list.phone.length != 11) {
                this.$toast('请输入正确手机号！')
                return
            }
            this.disabled_btn = true
            this.$store.dispatch('codes', this.list)
            this.time = 120
            let interval = window.setInterval(()=> {
                if ((this.time--) <= 0) {
                    this.time = '验证码'
                    this.disabled_btn = false
                    window.clearInterval(interval)
                }
            }, 1000)
        },
        xia(){
            if(this.Item_img.length < 1){
                this.$toast('请上传萌娃图片信息！')
                return
            }
            this.show = !this.show
        },
        Submission(){
            if(this.list.name.length > 10 || this.list.remark.length > 15 || this.list.code.length != 6){
                this.$toast('请填写规范信息！')
                return
            }
            this.$toast.loading({
                mask: true,
                duration: 0,
                message: '报名中...'
            });
            var formData = new FormData()
            // formData.append('file', this.Item_imgs)         // 这是错的，不可以直接放在数组里，不然会取不到值
            for(var i = 0; i < this.Item_imgs.length; i ++){   
                formData.append('file', this.Item_imgs[i])
            }
            this.list.formData = formData
            this.$store.dispatch('upload', this.list)
        }
    },
    watch:{
        Item_img(val,old){
            if(val.length > 4){
                this.disabled = true
            }else{
                this.disabled = false
            }
        },
    }
}
</script>
<style lang="less" scoped>
    #Signup{
        width: 100%; background-color: white; min-height: 100vh; padding-bottom: 10vw;
    }

    *{
         box-sizing: border-box;
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
            width: 30%; height: 9vw; background-color: white; border: 1px solid rgba(117,190,168,1); outline: none; border-radius: 1.5vw;
            color: rgba(117,190,168,1);
        }
        .codes{
            color: gray; border: 1px solid gainsboro;
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

    .Tip{
        width: 90%; height: 20vw; margin: 0 auto; padding-top: 5vw; color: red; font-size: 3.5vw;
        line-height: 5vw;
        p{
            margin: 0;
        }
        p:nth-child(2){
            padding-left: 8vw;
        }
    }

    .btn{
        width: 90%; height: 13vw; margin-top: 10vw; margin-left: 5%; outline: none; border: 0; color: white; 
        font-family:PingFang-SC-Bold; font-weight: Bold; font-size: 4.5vw; letter-spacing: 0.5vw;
        background:rgba(117,190,168,1); border-radius:1.5vw; box-shadow:0px 0px 10px rgba(43,43,43,0.1);
    }

    .rights{
        width: 100%; height: 100vh;
        .rights_{
            margin-top: 10vw;
        }
    }

    .gohome{
        width: 17vw; height: 17vw; border-radius: 50%; background-color: white; position: fixed; bottom: 1vw; right: 5%; box-sizing: border-box;
        font-family:PingFang-SC-Medium; color:rgba(255,139,75,1); line-height: 5vw; text-align: center; padding-top: 3.5vw; font-size: 4vw;
        animation: rights 1.5s linear 0s infinite alternate;
        -webkit-animation: rights 1.5s linear 0s infinite alternate; box-shadow:0px 0px 20px rgba(0,0,0,0.16);
    }
    .go{
        line-height: 10vw;
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


