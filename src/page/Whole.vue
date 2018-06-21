<template>
    <div id="Wgoles">
        <van-list v-model="loading" @load="onLoad" :finished="finished" :immediate-check="false">
            <Whole-End v-if="ACTIVITY.STATUS == 2"></Whole-End>
            <Whole-Conduct v-else></Whole-Conduct>
        </van-list>
        <transition name="fade">
            <Rule-Item v-if="rule_show"></Rule-Item>
        </transition>
    </div>
</template>
<script>
import WholeConduct from '../components/WholeConduct'
import WholeEnd from '../components/WholeEnd'
import Rule from '../components/Rule'
export default {
    data(){
        return{
            loading:false ,finished: false,list: [],
        }
    },
    components:{
        "Whole-Conduct": WholeConduct,
        "Whole-End": WholeEnd,
        "Rule-Item": Rule,
    },
    beforeCreate(){
        this.$store.dispatch('allCount')
        this.$store.dispatch('playerRankings')
    },
    created(){
        // document.body.scrollTop = 0
        // document.documentElement.scrollTop = 0
        
    },
    computed:{
        rule_show(){
            return this.$store.state.ruleShow
        },
        ACTIVITY(){
            return this.$store.state.activity
        }
    },
    methods:{
        onLoad() {
            setTimeout(() => {
                this.loading = false;

                setTimeout(() => {
                    this.finished = true;
                }, 2000);
            }, 500);
        },
        
    },
    watch:{
        
    },
    filters:{
        
    }
}
</script>
<style lang="less" scoped>
    #Wgoles{
        width: 100%; font-size: 4vw; background-color: white; min-height: 100vh;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
    
</style>


