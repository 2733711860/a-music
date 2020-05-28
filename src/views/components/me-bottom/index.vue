<template>
	<div>
		<div class="bottom_lyric">
			<div class="music_mode">
				<span :class="[{iconxunhuanbofang: mode == 'listLoop'}, {icondanquxunhuan: mode == 'loop'}, {iconiconsj: mode == 'random'}, 'iconfont', 'fosz']" @click="modeShow = !modeShow"></span>
				<div :class="[{hHeigh : modeShow}, 'mode_choo']">
					<div class="mode_lvj"></div>
					<div class="mode_div">
						<div @click="chooseMode('listLoop')" :class="{'active': mode == 'listLoop'}"><span class="icon iconfont foszs">&#xe66c;</span>顺序播放</div>
						<div @click="chooseMode('loop')" :class="{'active': mode == 'loop'}"><span class="icon iconfont foszs">&#xe66d;</span>单曲循环</div>
						<div @click="chooseMode('random')" :class="{'active': mode == 'random'}"><span class="icon iconfont foszs">&#xe77d;</span>随机播放</div>
					</div>
				</div>
			</div>
			<div class="bottom_button">
				<span class="icon iconfont fosz" @click="pre()">&#xe603;</span>
				<span class="icon iconfont foszz" @click="play">{{ playing ? '&#xe643;' : '&#xe609;'}}</span>
				<span class="icon iconfont fosz" @click="next()">&#xe602;</span>
			</div>
			<div>
				<span class="icon iconfont foszzx" @click="showMore">&#xe62f;</span>
			</div>
		</div>
		<me-more ref="moreFunc"></me-more>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meMore from '../me-more'
export default {
	components: {
		meMore
	},
	
	data () {
		return {
			modeShow: false
		}
	},
	
	computed: {
		...mapGetters([ 'playing', 'currentMusic', 'playlist', 'currentIndex', 'mode' ])
	},

	methods: {
		play () { // 播放暂停
			if (this.currentMusic.id == undefined) { //当前没有正在播放的音乐，底部按钮不可点击
  			return
  		}
			this.setPlaying(!this.playing)
		},
		
		pre() { // 上一首
  		if (this.currentMusic.id == undefined) {
  			return
  		}
  		if (this.playlist.length === 1) { // 播放列表只有一首歌曲，循环播放
  			this.loop()
  		} else {
  			let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
        if (!this.playing) { // 暂停状态
          this.setPlaying(true)
        }
        this.setCurrentIndex(index)
  		}
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
  	
  	chooseMode (mode) { // 选择模式
  		this.setMode(mode)
  		this.modeShow = false
  	},
  	
  	showMore () { // 音量弹出
  		this.$refs.moreFunc.showMoreF()
  	},

		...mapMutations({
			setCurrentIndex: 'SET_CURRENTINDEX',
      setPlaying: 'SET_PLAYING'
    }),
    
    ...mapActions(['setMode'])
	}
}
</script>

<style scoped="scoped" lang="less">
	.bottom_lyric{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		.bottom_button{
			display: flex;
			align-items: center;
		}
		.fosz{
			font-size: 22px;
		}
		.foszz{
			font-size: 36px;
			padding: 0 15px;
		}
		.foszzx{
			font-size: 38px;
		}
		.music_mode{
			position: relative;
			.hHeigh{
				height: 105px;
			}
			.mode_choo{
				white-space: nowrap;
				position: absolute;
				bottom: 35px;
				left: 0;
				transition: all .2s;
				overflow: hidden;
				width: 115px;
				.mode_lvj{
					width: 100%;
					height: 100%;
					border-radius: 5px;
					background-color: rgba(78, 56, 53, .8);
					filter: blur(1px);
					-webkit-filter: blur(1px);
				}
				.mode_div{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					.active{
						background-color: rgba(255, 255, 255, .2);
					}
					div{
						height: 35px;
						display: flex;
						align-items: center;
						padding: 0 10px;
						span{
							margin-right: 10px;
						}
					}
					.foszs{
						font-size: 20px;
					}
				}
			}
		}
	}
</style>