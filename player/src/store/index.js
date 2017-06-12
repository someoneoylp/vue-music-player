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
	hidSidebar:false
}

const mutations = {
	change:(state,type) => {state.hidNav = type}
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
