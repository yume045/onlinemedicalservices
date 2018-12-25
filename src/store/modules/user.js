
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
  },
  LOAD (state, {user, Per, selectShop}) {
    state.user = user
    state.Per = Per
  },
  logout: (state) => {
    state.user = null
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
    localStorage.setItem('Per', JSON.stringify(state.Per))
  },
  load ({commit}) {
    let Getuser = localStorage.getItem('user')
    let GetPer = localStorage.getItem('Per')
    if (Getuser !== 'null') {
      let user = JSON.parse(Getuser)
      let Per = JSON.parse(GetPer)
      commit('LOAD', {user, Per})
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
