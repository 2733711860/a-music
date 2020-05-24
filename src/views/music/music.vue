<template>
	<div class="music_page">
		<!--顶部-->
		<me-top></me-top>
		
		<!--列表-->
		<router-view class="item_page" wechat-title></router-view>
		
		<!--底部-->
		<me-bottom></me-bottom>
		
		<!--背景设置-->
		<div :class="[{isflur: $route.meta.mask}, 'dd_bg_pic']" :style="{ backgroundImage: picUrl }"></div>
    <div class="dd_bg_mask" v-if="$route.meta.mask"></div>
	</div>
</template>

<script>
import meTop from '../components/me-top'
import meBottom from '../components/me-bottom'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { silencePromise, parseLyric } from '@/utils/util'
import ddPlayerMusic from './ddPlayer.js'
export default {
	components: {
		meTop, meBottom
	},
	
	data () {
		return {
		}
	},
	
	mounted () {
		this.$nextTick(() => {
      ddPlayerMusic.initAudio(this)
    })
	},
	
	computed: {
		picUrl() {
      return this.currentMusic.id && this.currentMusic.image
      	? `url(${this.currentMusic.image}?param=300y300)`
      	: "url("+require('../../assets/image/bg.jpg')+")"
    },
    
    currentTime() { // 当前播放时间中间层，便于watch监听music里面的currentTime
    	return this.music.currentTime
    },
    
    ...mapGetters([ 'music', 'currentMusic'])
	},
	
	watch: {
		currentMusic(newMusic, oldMusic) { // 监听当前播放音乐
      if (!newMusic.id) {
      	this.music.lyric = []
        return
      }
      if (newMusic.id === oldMusic.id) {
        return
      }
      this.music.audioEle.src = newMusic.url
      // 重置相关参数
      this.music.lyricIndex = 0
      this.music.currentProgress = 0
      this.setMusic(this.music)
      silencePromise(this.music.audioEle.play())
      this.$nextTick(() => {
        this._getLyric(newMusic.id)
      })
    },
   
    playing(newPlaying) { // 监听播放暂停
      const audio = this.music.audioEle
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause()
      })
    },
    
    currentTime(newTime) { // 监听当前播放时间
      if (this.music.nolyric) {
        return
      }
      let lyricIndex = 0
      for (let i = 0; i < this.music.lyric.length; i++) {
        if (newTime > this.music.lyric[i].time) {
          lyricIndex = i
        }
      }
      this.music.lyricIndex = lyricIndex
      this.setMusic(this.music)
    }
	},
	
	methods: {
		async _getLyric (id) { // 获取歌词
    	let param = { id }
    	await this.$get(this.$api.music_lyric, param).then(async data => {
    		if (data.body.nolyric) {
		    	this.music.nolyric = true
		    } else {
		    	this.music.nolyric = false
	        this.music.lyric = await parseLyric(data.body.lrc.lyric)
		    }
		    this.setMusic(this.music)
		    silencePromise(this.music.audioEle.play())
	    })
    },
    
    nextSong () { // 下一曲
    	if (this.music.playlist.length === 1) { // 播放列表只有一首歌曲，循环播放
        this.loop()
      } else {
      	let index = ''
      	if (this.music.mode === 'listLoop') { // 列表循环
      		index = this.music.currentIndex + 1
	        if (index === this.music.playlist.length) {
	          index = 0
	        }
      	} else if (this.music.mode === 'random') { // 随机播放
      		index = Math.floor(Math.random() * (this.music.playlist.length))
      	}
        if (!this.music.playing) { // 暂停状态
          this.music.playing = true
        }
        this.music.currentIndex = index
        this.setMusic(this.music)
      }
    },
    
    pause () { // 暂停
    	this.music.playing = !this.music.playing
			this.setMusic(this.music)
    },
    
    loop () { // 循环，再次播放本歌曲
      this.music.audioEle.currentTime = 0
      silencePromise(this.music.audioEle.play())
      this.music.playing = true
      if (this.music.lyric.length > 0) {
        this.music.lyricIndex = 0
      }
      this.setMusic(this.music)
    },
		
		...mapActions(['setMusic'])
	}
}
</script>

<style scoped="scoped" lang="less">
	.music_page{
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		.item_page{
			flex: 1;
			overflow-y: auto;
		}
	}
	
	/*背景*/
	.dd_bg_pic, .dd_bg_mask{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.dd_bg_pic{
		z-index: -2;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		transition: all 0.8s;
		-webkit-transition: all 0.8s;
	}
	.isflur{
		filter: blur(7px);
		-webkit-filter: blur(7px);
		opacity: .7;
	}
	.dd_bg_mask{
		z-index: -1;
		background-color: rgba(0, 0, 0, .4);
	}
</style>