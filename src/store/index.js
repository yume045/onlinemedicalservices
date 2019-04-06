import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import chat from './modules/chat'

Vue.use(Vuex)

const actions = {
}

const mutations = {
}

const getters = {
}

const state = {
  loading: false
}

const modules = {
  user,
  chat
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules
})
