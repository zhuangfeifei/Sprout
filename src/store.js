import Vue from 'vue'
import axios from 'axios'
import Util from './storage'
import Api from './api'
import * as types from './types'
import router from './router/index'
import Vuex from 'vuex'
Vue.use(Vuex)
import { Toast } from 'vant'

let localhostDev = true
let url = localhostDev ? '/vote' : 'http://www.homeamc.cn'
let imgUrl = url + '/shopping/kaptcha/'

const state = {
    fetchLoading:false,     //全局加载状态的Loading
    fetchLoading_detils:false,     //详情的Loading
    ruleShow: false,        
    activity:'',            // 获取所有活动主题信息
    allCount:'',            // 萌娃参与总数和累计总的投票数
    information:'',         // 报名信息
    picList:'',             // 后台返回的图片name
    codes:false,               // 验证码
    playerRankings:'',        // 获取某一活动主题下投票排名情况
    newEva:'',              // 获取最新萌娃
    imgUrl: imgUrl,
    voteDetails: ''          // 是否投票成功
}

const mutations = {
    [types.SET_LOADING](state,res){
        state.fetchLoading = res
    },
    [types.SET_LOADING_DETILS](state,res){
        state.fetchLoading_detils = res
    },
    [types.RULE_SHOW](state,res){
        state.ruleShow = res
    },
    [types.ACTIVITY](state){
        state.activity = Util.getLocal('activity')
    },
    [types.ALL_COUNT](state,res){
        state.allCount = res
    },
    [types.PICLIST](state,res){
        state.picList = res 
    },
    [types.CODE](state,res){
        state.codes = res 
    },
    [types.PLAYER_RANKINGS](state,res){
        state.playerRankings = res  
    },
    [types.EVA_DETAILS](state){
        state.evaDetails = Util.getLocal('evaDetails') 
    },
    [types.VOTE_DETAILS](state,res){
        state.voteDetails = res 
    },
    
}

const actions = {
    activity({commit,state}){                                                           // 获取所有活动主题信息
        Api.post('/shopping/vote/activity')
        .then(res =>{
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data[0], 'activity')
                commit('ACTIVITY')
            }
        })
        .catch(err => console.log(err))
    },
    allCount({commit,state}){                                                           // 获取萌娃参与总数和累计总的投票数
        Api.post('/shopping/vote/allCount')
        .then(res =>{
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('ALL_COUNT', res.data.data[0])
            }
        })
        .catch(err => console.log(err))
    },
    playerRankings({commit,state}, codeNums){                                                     // 获取某一活动主题下投票排名情况
        Api.post('/shopping/vote/playerRankings', $.param({ activityId: parseInt(Util.getLocal('activity').ID), codeNum: codeNums}))
        .then(res =>{
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('PLAYER_RANKINGS', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    newEva({commit,state}){                                                     // 获取最新萌娃
        Api.post('/shopping/vote/newEva', $.param({ activityId: parseInt(Util.getLocal('activity').ID)}))
        .then(res =>{
            // console.log(res.data)
            if(res.data.code == 200) {
                commit('PLAYER_RANKINGS', res.data.data)
            }
        })
        .catch(err => console.log(err))
    },
    evaDetails({commit,state}, id){                                                     // 获取萌娃详情信息
        Api.post('/shopping/vote/evaDetails', $.param({ activityId: parseInt(Util.getLocal('activity').ID), voteJoinId: id}))
        .then(res =>{
            // console.log(res.data)
            if(res.data.code == 200) {
                Util.setLocal(res.data.data, 'evaDetails')
                commit('EVA_DETAILS')
                commit('SET_LOADING_DETILS',true)
            }
        })
        .catch(err => console.log(err))
    },
    voteDetails({commit,state}, VOTE_JOIN_ID){                                                     // 投票
        Api.post('/shopping/vote/voteDetails', $.param({ openId: openIds, voteJoinId: VOTE_JOIN_ID}))
        .then(res =>{
            // console.log(res.data)
            if(res.data.code == 200) {
                if(res.data.data[0].message == "投票成功"){
                    commit('VOTE_DETAILS', res.data.data[0])
                }else{
                    Toast(res.data.data[0].message);
                }
            }
        })
        .catch(err => console.log(err))
    },
    upload({commit,state,dispatch}, information){                                         // 上传图片
        Api.post('/shopping/vote/upload', information.formData )
        .then(res =>{
            // console.log(res.data)
            if(res.data.code == 200) {
                var name = res.data.data[0]
                var name_list = []
                for(let i in name){
                    name_list.push(name[i])
                }
                commit('PICLIST', name_list.join())
                dispatch('signUp', information)
            }
        })
        .catch(err => console.log(err))
    },
    codes({commit,state}, information){                                                    // 获取验证码
        Api.post('http://www.homeamc.cn/puman/api/system/code', $.param({phone: information.phone, msgType:3}))
        .then(res =>{
            if(res.data.code == 200) Toast.success('发送成功！')
        })
        .catch(err => console.log(err))
    },
    signUp({commit,state}, information){                                                    // 萌娃活动报名
        var join = {
            joinName: information.name, openId: openIds, remark: information.remark, vcode: information.code,
            phone: information.phone, voteActivityId: parseInt(Util.getLocal('activity').ID), picList: state.picList
        }                                               
        Api.post('/shopping/vote/signUp', $.param( join ))
        .then(res =>{
            if(res.data.code == 200) {
                Toast.success('报名成功！')
                router.replace({path:'/Whole'})
            }
        })
        .catch(err => console.log(err))
    },
}

const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})