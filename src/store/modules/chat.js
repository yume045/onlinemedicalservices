
const state = {
  selectChat: null,
  chatData: null
}

const getters = {
  selectChat: state => {
    return state.selectChat
  },
  chatData: state => {
    return state.chatData
  }
}

const mutations = {
  setSelectChat: (state, payload) => {
    state.selectChat = payload
  },
  setChatData: (state, payload) => {
    state.chatData = payload
  },
}

const actions = {
  actionSelectChat: ({ commit }, payload) => {
    commit('setSelectChat', payload)
  },
  actionChatData: ({ commit }, payload) => {
    commit('setChatData', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}