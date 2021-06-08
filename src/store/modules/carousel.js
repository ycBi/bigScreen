const state = {
  isFull: false,
  isSwipper: false
}

const mutations = {
  CHANGE_SCREEN_STATUS: (state)=>{
    state.isFull = !state.isFull
  },
  CHANGE_SWIPPER_STATUS: (state)=>{
    state.isSwipper = !state.isSwipper
  }
}

const actions = {
  changeScreenStatus({commit}){
    commit('CHANGE_SCREEN_STATUS')
  },
  changeSwipperStatus({commit}){
    commit('CHANGE_SWIPPER_STATUS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

