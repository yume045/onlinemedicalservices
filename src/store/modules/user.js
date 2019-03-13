
const state = {
  user: null,
  password: null,
  profile: null,
  getuser: null,
  selectNews: null,
  added: [],
  status: null
}

const getters = {
  user: state => {
    return state.user
  },
  isLoggedIn: state => {
    return state.user !== null
  },
  status: state => {
    return state.status
  },
  selectNews: state => {
    return state.selectNews
  },
  profile: state => {
    return state.profile
  }
}

const mutations = {
  setUser: (state, payload) => {
    state.user = payload.userSet
    state.status = payload.status
  },
  selectNews: (state, payload) => {
    state.selectNews = payload
  },
  LOAD(state, { user, status, profile }) {
    state.user = user
    state.status = status,
    state.profile = profile
  },
  logout: (state) => {
    state.user = null
  },
  setProfile: (state, payload) => {
    state.profile = payload
  }
}

const actions = {
  signIn: ({ commit, dispatch }, payload) => {
    commit('setUser', payload)
    dispatch('save')
  },
  setKey: ({ commit, dispatch }, payload) => {
    commit('setProfile', payload)
    dispatch('save')
  },
  logout: ({ commit, dispatch }, payload) => {
    commit('setUser', payload)
    dispatch('save')
  },
  selectNews: ({ commit }, payload) => {
    commit('selectNews', payload)
  },
  save({ state }) {
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('status', JSON.stringify(state.status))
    localStorage.setItem('profile', JSON.stringify(state.profile))
    console.log(state.profile)
  },
  load({ commit }) {
    let Getuser = localStorage.getItem('user')
    let GetStatus = localStorage.getItem('status')
    let GetProfile = localStorage.getItem('profile')
    if (Getuser !== 'null') {
      let user = JSON.parse(Getuser)
      let status = JSON.parse(GetStatus)
      let profile = JSON.parse(GetProfile)
      commit('LOAD', { user, status, profile })
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
