import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	menuinfo:null,
	userInfo:null,
	login: true//是否登录
}

export default new Vuex.Store({
	state
})