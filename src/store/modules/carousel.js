const state = {
  isFull: false,
  isSwipper: false
}

const mutations = {
  CHANGE_SCREEN_STATUS: (state,val)=>{
    state.isFull = val
  },
  CHANGE_SWIPPER_STATUS: (state,val)=>{
    state.isSwipper = val
  }
}

const actions = {
  changeScreenStatus({commit},val){
    commit('CHANGE_SCREEN_STATUS',val)
  },
  changeSwipperStatus({commit},val){
    commit('CHANGE_SWIPPER_STATUS',val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

