// 用户信息
export const user = state => state.user

// 音乐信息
export const music = state => state.music

// 当前播放音乐
export const currentMusic = state => {
  return state.music.playlist[state.music.currentIndex] || {}
}




