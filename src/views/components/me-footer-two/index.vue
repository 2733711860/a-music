<template>
  <div class="me_footr">
		<router-link to="/music/lyric" class="flex2 aic f20 text" active-class="active">
    	<me-progress
    		:percentage="percent"
    		:strokeWidth="3"
    		:width="50"
    		trackColor="rgba(255, 255, 255, .3)"
    		type="circle"
    		strokeLinecap="round">
    		<img :src="picUrl" class="circleImg" :class="{Rotation: playing}" style="width: 40px;height: 40px;" />
    	</me-progress>
    </router-link>
  	<div class="me_footer_desc">
  		<div class="music_name">{{currentMusic.name}}</div>
  		<div class="music_user">{{currentMusic.singer}}</div>
  	</div>
  	<div class="me_footer_icon" :class="{ disable: !currentMusic.id }">
  		<span class="iconfont iconsize" @click="play">{{playing ? '&#xe87a;' : '&#xe87c;'}}</span>
  		<span class="iconfont iconsize" @click="next()">&#xe602;</span>
  		<span class="iconfont iconbofangliebiao iconsize"></span>
  	</div>
  </div>
</template>

<script>
import meProgress from '../me-progress'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { silencePromise } from '@/utils/util'
export default {
	components: {
		meProgress
	},

	computed: {
		...mapGetters([ 'currentTime', 'currentMusic', 'playing', 'currentIndex', 'audioEle', 'mode', 'playlist']),

		percent() { // 进度条进度百分比
      const duration = this.currentMusic.duration
      return this.currentTime && duration ? (this.currentTime / duration) * 100 : 0
    },

    picUrl() {
      return this.currentMusic.id && this.currentMusic.image
      	? `${this.currentMusic.image}?param=300y300`
      	: require('../../../assets/image/bg.jpg')
    },
	},

	methods: {
		play () { // 播放暂停
			if (this.currentMusic.id == undefined) { //当前没有正在播放的音乐，底部按钮不可点击
  			return
  		}
			this.setPlaying(!this.playing)
		},

		next() { // 下一首
  		if (this.currentMusic.id == undefined) {
  			return
  		}
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

  	loop() { // 循环
      this.audioEle.currentTime = 0
      silencePromise(this.audioEle.play())
      this.setPlaying(true)
    },

		...mapMutations({
			setCurrentIndex: 'SET_CURRENTINDEX',
      setPlaying: 'SET_PLAYING'
    })
	}
}
</script>

<style scoped lang="less">
.me_footr{
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	background-color: rgba(242, 243, 245, .1);
	.disable{
		pointer-events: none; /*阻止用户的点击动作产生任何效果*/
    opacity: 0.6;
	}
	.me_footer_desc{
		flex: 1;
		padding: 0 20px;
		line-height: 26px;
		font-size: 16px;
		.music_user{
			font-size: 12px;
			color: rgba(255, 255, 255, .6);
			line-height: 18px;
		}
	}
	.me_footer_icon{
		display: flex;
		justify-content: space-between;
		width: 90px;
		color: rgba(255, 255, 255, .9);
		.iconsize{
			font-size: 22px;
		}
	}
}
.footer {
  height: 60px;
  width: 100%;
  background-color: rgba(242, 243, 245, .1);
  .text {
    color: rgba(255, 255, 255, .9);
  }
  .active .text {
    color: #1296db;
  }
}
.item{
	position: relative;
}
.circleImg{
	border-radius: 100%;
	opacity: .7;
}
.Rotation{
	-webkit-transform: rotate(360deg);
	animation: rotation 15s linear infinite;
	-moz-animation: rotation 15s linear infinite;
	-webkit-animation: rotation 15s linear infinite;
	-o-animation: rotation 15s linear infinite;
}
@-webkit-keyframes rotation{
	from {-webkit-transform: rotate(0deg);}
	to {-webkit-transform: rotate(360deg);}
}
</style>
