
const state = {
  user: null,
  password: null,
  profile: null,
  getuser: null,
  selectShop: null,
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
  }
}

const mutations = {
  setUser: (state, payload) => {
    state.user = payload.userSet
    state.Per = payload.Per
    console.log(payload.Per)
  }
}

const actions = {
  signIn: ({commit}, payload) => {
    commit('setUser', payload)
  },
  logout: ({commit}, payload) => {
    commit('setUser', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
