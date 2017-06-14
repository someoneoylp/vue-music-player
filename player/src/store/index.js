import vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

vue.use(Vuex)

const state = {
	hidNav: true,
	hidFoot:true,
	transitionName: '',
	transitionName2: '',
	musicIsActive:true,
	scrollToBelow:false,
	hidSidebar:false,
	recoListId:'',
	persRecoLists:[],//个性推荐歌单
	recoMvLists:[],//推荐mv
	stationLists:[],//主播电台
	subscribedCount:0,//订阅数目
	commentCount:0, //评论数目
	shareCount:0, //分享数目
	musicLists:[], //歌单
	trackCount:0, //歌单内歌曲数目
	rankingListName:'',//榜单子页面的名字
	name:'', //歌单名称
	nickname:'',//歌单创建者名称
	coverImgUrl:'',//背景图片
	avatarUrl:'',//歌单创建者头像
	playCount:'',//播放量
	searchKeyWord:'',//search的关键词
	typeId:0//search的类型（单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002) *(type)*）
	songListID:'',//歌单id
	lastID:0,//上一首
	nextID:0,//下一首
	index:0
}

const mutations = {
	change:(state,type) => {state.hidNav = type},
	getRecoListId:(state,id) =>{state.recoListId = id,console.log(id)}
}
const actions = {
	changeAsync ({commit},type){
		setTimeout(() => {
			commit('change',type)
		},1000)
	}
}
export default new Vuex.Store({
  state : state,
  mutations:mutations,
  actions:actions
})
