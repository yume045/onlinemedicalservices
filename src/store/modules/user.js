
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
    console.log(payload.status)
  },
  selectNews: (state, payload) => {
    state.selectNews = payload
    console.log(state.selectNews)
  },
  LOAD (state, {user, status}) {
    state.user = user
    state.status = status
  },
  logout: (state) => {
    state.user = null
  },
  setProfile: (state, payload) => {
    state.profile = payload
  }
}

const actions = {
  signIn: ({commit, dispatch}, payload) => {
    commit('setUser', payload)
    dispatch('save')
  },
  logout: ({commit, dispatch}, payload) => {
    commit('setUser', payload)
    dispatch('save')
  },
  selectNews: ({commit}, payload) => {
    commit('selectNews', payload)
  },
  save ({state}) {
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('status', JSON.stringify(state.status))
  },
  load ({commit}) {
    let Getuser = localStorage.getItem('user')
    let GetStatus = localStorage.getItem('status')
    if (Getuser !== 'null') {
      let user = JSON.parse(Getuser)
      let status = JSON.parse(GetStatus)
      commit('LOAD', {user, status})
    }
  },
  setProfile ({commit, dispatch}, payload) {
    commit('setProfile', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
