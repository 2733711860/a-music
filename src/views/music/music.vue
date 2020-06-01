<template>
	<div class="music_page">
		<!--顶部-->
		<me-top v-if="$route.meta.showTop"></me-top>

		<!--列表-->
		<div class="child_page">
			<transition :name="$route.meta.aniName">
				<router-view class="item_page" wechat-title></router-view>
			</transition>
		</div>

		<!--背景设置-->
		<div class="dd_bg_pic" :style="{ backgroundImage: picUrl }"></div>
    <div class="dd_bg_mask"></div>
	</div>
</template>

<script>
import meTop from '../components/me-top'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { silencePromise, parseLyric } from '@/utils/util'
import ddPlayerMusic from './ddPlayer.js'
export default {
	components: {
		meTop
	},

	data () {
		return {
		}
	},

	mounted () {
		this.$nextTick(() => {
      ddPlayerMusic.initAudio(this)
    	this.audioEle.volume = this.isMute ? 0 : this.volume
    })
	},

	computed: {
		picUrl() {
      return this.currentMusic.id && this.currentMusic.image
      	? `url(${this.currentMusic.image}?param=300y300)`
      	: "url("+require('../../assets/image/bg.jpg')+")"
    },

    ...mapGetters([ 'audioEle', 'playlist', 'currentIndex', 'currentMusic', 'currentTime',
    	'playing', 'mode', 'historyList', 'lyric', 'nolyric', 'volume', 'isMute', 'lastVolumn' ]),

    historyListt: {
    	get() {
    		return this.historyList
    	},
    	set() {}
    }
	},

	watch: {
		currentMusic(newMusic, oldMusic) { // 监听当前播放音乐
      if (!newMusic.id) {
      	this.setLyric([])
        return
      }
      if (newMusic.id === oldMusic.id) {
        return
      }
      this.audioEle.src = newMusic.url
      // 重置相关参数
      this.setLyricIndex(0)
      this.setCurrentProgress(0)
      silencePromise(this.audioEle.play())
      this.$nextTick(() => {
        this._getLyric(newMusic.id)
      })
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

	methods: {
		async _getLyric (id) { // 获取歌词
    	let param = { id }
    	await this.$get(this.$api.music_lyric, param).then(async data => {
    		if (data.body.nolyric) {
		    	this.setNolyric(true)
		    } else {
		    	this.setNolyric(false)
	        let lyricc = await parseLyric(data.body.lrc.lyric)
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
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX',
      setCurrentTime: 'SET_CURRENTTIME',
      setCurrentProgress: 'SET_CURRENTPROGRESS',
      setNolyric: 'SET_NOLYRIC',
      setLyric: 'SET_LYRIC',
      setLyricIndex: 'SET_LYRICINDEX',
      setIsMute: 'SET_ISMUTE',
      setLastvolumn: 'SET_LASTVOLUMN'
    }),

    ...mapActions(['setHistorylist', 'setVolume'])
	}
}
</script>

<style scoped="scoped" lang="less">
	.music_page{
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		.child_page{
			flex: 1;
			overflow-y: auto;
			position: relative;
	    overflow: hidden;
	    color: rgba(255, 255, 255, .9);
	    perspective: 1200px;
	    .item_page {
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
		}
	}

	/*背景*/
	.dd_bg_pic, .dd_bg_mask{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -2;
	}
	.dd_bg_pic{
		z-index: -2;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		transition: all 0.8s;
		-webkit-transition: all 0.8s;
		filter: blur(7px);
		-webkit-filter: blur(7px);
		opacity: .8;
	}
	.dd_bg_mask{
		opacity: .5;
		filter: none;
		background-color: rgba(46, 48, 48, 1);
	}
</style>