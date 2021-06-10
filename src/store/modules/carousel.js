const state = {
  isFull: false,
  isSwipper: false,
  carouselTime: 1000
}

const mutations = {
  CHANGE_SCREEN_STATUS: (state)=>{
    state.isFull = !state.isFull
  },
  CHANGE_SWIPPER_STATUS: (state)=>{
    state.isSwipper = !state.isSwipper
  },
  CHANGE_CAROUSEL_TIME: (state,number)=>{
    state.carouselTime = number
  }
}

const actions = {
  changeScreenStatus({commit}){
    commit('CHANGE_SCREEN_STATUS')
  },
  changeSwipperStatus({commit}){
    commit('CHANGE_SWIPPER_STATUS')
  },
  changeCarouselTime({commit},number){
    commit('CHANGE_CAROUSEL_TIME',number)
  }
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}

