
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
  getuser: state => {
    return state.getuser
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
    state.getuser = payload.val
  },
  selectNews: (state, payload) => {
    state.selectNews = payload
  },
  LOAD(state, { user, status, profile, get }) {
    state.user = user
    state.status = status,
      state.profile = profile
    state.getuser = get
  },
  logout: (state) => {
    state.user = null
  },
  setProfile: (state, payload) => {
    state.profile = payload
  },
  setGetUser: (state, payload) => {
    state.getuser = payload
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
    localStorage.setItem('getUser', JSON.stringify(state.getuser))
  },
  load({ commit }) {
    let Getuser = localStorage.getItem('user')
    let GetStatus = localStorage.getItem('status')
    let GetProfile = localStorage.getItem('profile')
    let getU = localStorage.getItem('getUser')
    if (Getuser !== 'null') {
      let user = JSON.parse(Getuser)
      let status = JSON.parse(GetStatus)
      let profile = JSON.parse(GetProfile)
      let get = JSON.parse(getU)
      commit('LOAD', { user, status, profile, get })
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
