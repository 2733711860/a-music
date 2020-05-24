import * as types from './mutation-types'

const mutations = {
	// 用户信息
  [types.SET_USER](state, user) {
    state.user = user
  },
  
  // 音乐信息
  [types.SET_MUSIC](state, music) {
    state.music = music
  }
}

export default mutations
