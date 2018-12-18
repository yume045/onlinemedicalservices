
const state = {
  user: null,
  password: null,
  profile: null,
  getuser: null,
  selectNews: null,
  added: [],
  Per: null
}

const getters = {
  user: state => {
    console.log('test')
    return state.user
  },
  isLoggedIn: state => {
    return state.user !== null
  },
  Per: state => {
    console.log('2222')
    return state.Per
  },
  selectNews: state => {
    return state.selectNews
  }
}

const mutations = {
  setUser: (state, payload) => {
    state.user = payload.userSet
    state.Per = payload.Per
    console.log(payload.Per)
  },
  selectNews: (state, payload) => {
    state.selectNews = payload
    console.log(state.selectNews)
  }
}

const actions = {
  signIn: ({commit}, payload) => {
    commit('setUser', payload)
  },
  logout: ({commit}, payload) => {
    commit('setUser', payload)
  },
  selectNews: ({commit}, payload) => {
    commit('selectNews', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
