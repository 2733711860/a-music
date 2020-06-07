const state = {
	user: null, // user信息
	audioEle: null, // audio元素
	playlist: [], // 当前播放列表
	currentIndex: -1, // 当前播放音乐索引
	currentTime: 0, // 当前播放时间
	currentLyric: {}, // 当前歌词对象
	currentMusic: {}, // 当前音乐
	playing: false, // 播放状态
	currentProgress: 0, // 当前缓存进度
	mode: 'listLoop', // 播放模式，默认顺序播放。listLoop：顺序播放；loop：单曲循环；random：随机播放。
	historyList: [], // 播放历史列表
	lyric: [], // 歌词
  nolyric: false, // 是否有歌词
  lyricIndex: 0, // 当前播放歌词下标
  volume: 0.5, // 音量
  lastVolumn: 0, // 静音前音量
  isMute: false, // 是否静音
  playStyle: 0, // 0:播放器，1:歌词
  listData: [], // 列表页面数据
  newMusics: [], // 新歌速递
  sheets: [], // 歌单
}

export default state
