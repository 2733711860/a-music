import * as types from './mutation-types'

// user信息
export const setUser = function({ commit }, user) {
  commit(types.SET_USER, user)
}

// playlist
export const setPlaylist = function({ commit }, playlist) {
  commit(types.SET_PLAYLIST, playlist)
}

// 当前播放音乐索引
export const setCurrentIndex = function({ commit }, currentIndex) {
  commit(types.SET_CURRENTINDEX, currentIndex)
}

// 当前播放时间
export const setCurrentTime = function({ commit }, currentTime) {
  commit(types.SET_CURRENTTIME, currentTime)
}

// 当前歌词对象
export const setCurrentLyric = function({ commit }, currentLyric) {
  commit(types.SET_CURRENTLYRIC, currentLyric)
}

// 播放状态
export const setPlaying= function({ commit }, playing) {
  commit(types.SET_PLAYING, playing)
}

// 当前缓存进度
export const setCurrentProgress = function({ commit }, currentProgress) {
  commit(types.SET_CURRENTPROGRESS, currentProgress)
}

// 播放模式
export const setMode = function({ commit }, mode) {
  commit(types.SET_MODE, mode)
}

// 播放历史列表
export const setHistorylist = function({ commit }, historylist) {
  commit(types.SET_HISTORYLIST, historylist)
}

// 歌词
export const setLyric= function({ commit }, lyric) {
  commit(types.SET_LYRIC, lyric)
}

// 是否有歌词
export const setNolyric = function({ commit }, nolyric) {
  commit(types.SET_NOLYRIC, nolyric)
}

// 当前播放歌词下标
export const setLyricIndex = function({ commit }, lyricIndex) {
  commit(types.SET_LYRICINDEX, lyricIndex)
}

// 音量
export const setVolume = function({ commit }, volume) {
  commit(types.SET_VOLUME, volume)
}

// 是否静音
export const setIsMute = function({ commit }, isMute) {
  commit(types.SET_ISMUTE, isMute)
}

// 选择播放（会更新整个播放列表）
export const selectPlay = function({ commit }, { list, index }) {
  commit(types.SET_PLAYLIST, list) // 更新播放列表
  commit(types.SET_CURRENTINDEX, index) // 当前播放音乐索引更新
  commit(types.SET_PLAYING, true) //更新播放状态
}