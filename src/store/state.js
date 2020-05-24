const state = {
	user: null, // user信息
	music: {
		audioEle: null, // audio元素
		playlist: [], // 当前播放列表
		currentIndex: -1, // 当前播放音乐索引
		currentTime: 0, // 当前播放时间
		currentLyric: {}, // 当前歌词对象
		playing: false, // 播放状态
		currentProgress: 0, // 当前缓存进度
		mode: 'listLoop', // 播放模式，默认顺序播放。listLoop：顺序播放；loop：单曲循环；random：随机播放。
		historyList: [], // 播放历史列表
		lyric: [], // 歌词
    nolyric: false, // 是否有歌词
    lyricIndex: 0, // 当前播放歌词下标
	}
}

export default state
