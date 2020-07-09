import * as types from './mutation-types'

const mutations = {
	// 用户信息
  [types.SET_USER](state, user) {
    state.user = user
  },

  // audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },

  // playlist
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist
  },

  // 当前播放音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },

  // 当前播放时间
  [types.SET_CURRENTTIME](state, currentTime) {
    state.currentTime = currentTime
  },

  // 当前歌词对象
  [types.SET_CURRENTLYRIC](state, currentLyric) {
    state.currentLyric = currentLyric
  },
  
  // 当前音乐
  [types.SET_CURRENTMUSIC](state, currentMusic) {
    state.currentMusic = currentMusic
  },

  // 播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },

  // 当前缓存进度
  [types.SET_CURRENTPROGRESS](state, currentProgress) {
    state.currentProgress = currentProgress
  },

  // 播放模式
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },

  // 播放历史列表
  [types.SET_HISTORYLIST](state, historyList) {
    state.historyList = historyList
  },

  // 歌词
  [types.SET_LYRIC](state, lyric) {
    state.lyric = lyric
  },

  // 是否有歌词
  [types.SET_NOLYRIC](state, nolyric) {
    state.nolyric = nolyric
  },

  // 当前播放歌词下标
  [types.SET_LYRICINDEX](state, lyricIndex) {
    state.lyricIndex = lyricIndex
  },
  
  // 音量
  [types.SET_VOLUME](state, volume) {
    state.volume = volume
  },
  
  // 是否静音
  [types.SET_ISMUTE](state, isMute) {
    state.isMute = isMute
  },
  
  // 静音前音量
  [types.SET_LASTVOLUMN](state, lastVolumn) {
    state.lastVolumn = lastVolumn
  },
  
  // 播放页面样式
  [types.SET_PLAYSTYLE](state, playStyle) {
    state.playStyle = playStyle
  },
  
  // 列表页面数据
  [types.SET_LISTDATA](state, listData) {
    state.listData = listData
  },
  
  // 新歌速递
  [types.SET_NEWMUSICS](state, newMusics) {
    state.newMusics = newMusics
  },
  
  // 歌单
  [types.SET_SHEETS](state, sheets) {
    state.sheets = sheets
  },
}

export default mutations
