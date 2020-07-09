<template>
  <div class="app">
  	<navigation>
	    <transition :name="$route.meta.aniName">
	      <router-view class="app-router-view"></router-view>
	    </transition>
    </navigation>

    <!--播放器-->
  	<audio ref="ddPlayer"></audio>
  </div>
</template>

<script>
console.log(process.env.NODE_ENV)
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { silencePromise, parseLyric, createTopList } from '@/utils'
import ddPlayerMusic from './ddPlayer.js'
export default {
  name: "app",
  created() {
  	// 设置audio元素
    this.$nextTick(() => {
    	this.setAudioele(this.$refs.ddPlayer) // 设置audio元素
    })
//  this.getSongList()
  },
  
  computed: {
    ...mapGetters([ 'audioEle', 'playlist', 'currentIndex', 'currentMusic', 'currentTime',
    	'playing', 'mode', 'historyList', 'lyric', 'nolyric', 'volume', 'isMute', 'lastVolumn' ]),
	},
	
	watch: {
		playlist (newList) {
			this.setCurrentMusic(newList[this.currentIndex])
		},
		
		currentIndex(newIndex, oldIndex) {
			this.setCurrentMusic(this.playlist[newIndex])
		},
		
		currentMusic(newMusic, oldMusic) { // 监听当前播放音乐
			if (newMusic.isSearch && (newMusic.image == null || newMusic.image == undefined)) {
				this.getAlbumPic()
			} else if (!newMusic.id) {
				this.setLyric([])
			} else if (newMusic.id === oldMusic.id) {
        return
      } else {
	     	this.audioEle.src = newMusic.url
	     	// 重置相关参数
	     	this.setLyricIndex(0)
	     	this.setCurrentProgress(0)
	     	silencePromise(this.audioEle.play())
	     	this.$nextTick(() => {
	     	  this._getLyric(newMusic.id)
	     	})
      }
    },

    playing(newPlaying) { // 监听播放暂停
      const audio = this.audioEle
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause()
      })
    },

    currentTime(newTime) { // 监听当前播放时间
      if (this.nolyric) {
        return
      }
      let lyricIndexx = 0
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          lyricIndexx = i
        }
      }
      this.setLyricIndex(lyricIndexx)
    },

    volume (newVolume) { // 音量变化
    	let isMutue = newVolume == 0 ? true : false
    	this.setIsMute(isMutue)
    	this.audioEle.volume = newVolume
    },

    isMute (newMute) { // 是否静音变化
    	if (newMute) { // 静音
    		this.setLastvolumn(this.volume) // 静音前音量
    		this.setVolume(0)
    	} else {
    		this.setVolume(this.lastVolumn)
    	}
    }
	},
  
  mounted () {
  	this.$nextTick(() => {
      ddPlayerMusic.initAudio(this)
    	this.audioEle.volume = this.isMute ? 0 : this.volume
    })
  },

  methods: {
  	async getAlbumPic() { // 获取专辑详情
  		await this.$get(this.$api.getAlbum, { id: this.currentMusic.albumId }).then(async data => {
  			let nowMusic = this.currentMusic
  			nowMusic.image = data.album.picUrl
  			this.setCurrentMusic(nowMusic)
  			
  			this.audioEle.src = nowMusic.url
	     	// 重置相关参数
	     	this.setLyricIndex(0)
	     	this.setCurrentProgress(0)
	     	silencePromise(this.audioEle.play())
	     	this.$nextTick(() => {
	     	  this._getLyric(nowMusic.id)
	     	})
	    })
  	},
  	
  	async getSongList() { // 获取歌曲列表
  		let param = {
	  		idx: '1'
	  	}
  		await this.$get(this.$api.top_list, param).then(async data => {
    		if (data.body.code == 200) {
    			data = data.body.playlist.tracks.slice(0,100)
			  	let playlist = await this._formatSongs(data) // 设置播放列表
			  	this.setPlaylist(playlist)
				}
	    })
  	},

    _formatSongs(list) { // 歌曲数据处理
      let ret = []
      list.forEach(item => {
        const musicData = item
        if (musicData.id) {
          ret.push(createTopList(musicData))
        }
      })
      return ret
    },
    
    async _getLyric (id) { // 获取歌词
    	let param = { id }
    	await this.$get(this.$api.getLyric, param).then(async data => {
    		if (data.nolyric) {
		    	this.setNolyric(true)
		    } else {
		    	this.setNolyric(false)
	        let lyricc = await parseLyric(data.lrc.lyric)
	        this.setLyric(lyricc)
		    }
		    silencePromise(this.audioEle.play())
	    })
    },

    nextSong () { // 下一曲
    	if (this.playlist.length === 1) { // 播放列表只有一首歌曲，循环播放
        this.loop()
      } else {
      	let index = ''
      	if (this.mode === 'listLoop') { // 列表循环
      		index = this.currentIndex + 1
	        if (index === this.playlist.length) {
	          index = 0
	        }
      	} else if (this.mode === 'random') { // 随机播放
      		index = Math.floor(Math.random() * (this.playlist.length))
      	}
        if (!this.playing) { // 暂停状态
          this.setPlaying(true)
        }
        this.setCurrentIndex(index)
      }
    },

    pause () { // 暂停
    	this.playing = !this.playing
			this.setPlaying(this.playing)
    },

    loop () { // 循环，再次播放本歌曲
      this.audioEle.currentTime = 0
      silencePromise(this.audioEle.play())
      this.setPlaying(true)
      if (this.lyric.length > 0) {
        this.setLyricIndex(0)
      }
    },

  	...mapMutations({
      setAudioele: 'SET_AUDIOELE',
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX',
      setCurrentTime: 'SET_CURRENTTIME',
      setCurrentProgress: 'SET_CURRENTPROGRESS',
      setNolyric: 'SET_NOLYRIC',
      setLyric: 'SET_LYRIC',
      setLyricIndex: 'SET_LYRICINDEX',
      setIsMute: 'SET_ISMUTE',
      setLastvolumn: 'SET_LASTVOLUMN',
      setCurrentMusic: 'SET_CURRENTMUSIC'
    }),
    ...mapActions(['setPlaylist', 'setHistorylist', 'setVolume'])
  }
}
</script>

<style>
	@import url("assets/css/vant-me.css");
	@import url("assets/css/common.css");
	@import url("assets/css/transition.css"); /*vue路由切换特效，需要加以下样式才能生效*/
	*{
		padding: 0;
		margin: 0;
	}
	html,
  body,
  .app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: rgba(255, 255, 255, .9);
  }
  .app {
    perspective: 1200px;
  }
  .app .app-router-view {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  }
</style>



