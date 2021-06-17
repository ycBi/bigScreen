const state = {
  isFull: false,
  isSwipper: false,
  carouselTime: 30
}

const mutations = {
  CHANGE_SCREEN_STATUS: (state)=>{
    state.isFull = !state.isFull
  },
  CHANGE_SWIPPER_STATUS: (state,status)=>{
    state.isSwipper = status
  },
  CHANGE_CAROUSEL_TIME: (state,number)=>{
    state.carouselTime = number
  }
}

const actions = {
  changeScreenStatus({commit}){
    commit('CHANGE_SCREEN_STATUS')
  },
  changeSwipperStatus({commit},status){
    commit('CHANGE_SWIPPER_STATUS',status)
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

