import { Toast } from 'vant'
const ddPlayerMusic = {
  initAudio(that) {
    const ele = that.audioEle
    // 音频缓冲事件
    ele.onprogress = () => {
      try {
        if (ele.buffered.length > 0) {
          const duration = that.currentMusic.duration
          let buffered = 0
          ele.buffered.end(0)
          buffered =
            ele.buffered.end(0) > duration ? duration : ele.buffered.end(0)
          let currentProgress = buffered / duration
          that.setCurrentProgress(currentProgress)
        }
      } catch (e) {}
    }
    // 开始播放音乐
    ele.onplay = () => {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.musicReady = true // 是否可以使用播放器
      }, 100)
    }
    // 获取当前播放时间
    ele.ontimeupdate = () => {
      that.setCurrentTime(ele.currentTime)
    }
    // 当前音乐播放完毕
    ele.onended = () => {
      if (that.mode == 'loop') { // 单曲循环
        that.loop()
      } else {
        that.nextSong()
      }
    }
    // 音乐播放出错
    ele.onerror = () => {
    	Toast('播放出错，3秒后播放下一首')
    	setTimeout(() => {
    		that.nextSong()
    	}, 3000)
    }
    // 音乐进度拖动大于加载时重载音乐
    ele.onstalled = () => {
      ele.load()
      that.setPlaying(false)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
      	that.setPlaying(true)
      }, 10)
    }
    // 将能播放的音乐加入播放历史
    ele.oncanplay = async () => {
    	let historyListt = that.historyList
    	let list = historyListt.filter(item => item.id == that.currentMusic.id)
    	if (list.length == 0) { // 历史记录里有的，不用再次添加
    		historyListt.push(that.currentMusic)
    		that.setHistorylist(historyListt)
    	}
    }
  }
}

export default ddPlayerMusic
