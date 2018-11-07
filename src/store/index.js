import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

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
  user
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules
})
