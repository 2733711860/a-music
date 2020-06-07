<template>
	<div class="me_lyric_page">
		<div class="me_top">
			<span class="icon iconfont" @click="goback">&#xe725;</span>
			<div>{{currentMusic.name ? currentMusic.name : '播放器'}}</div>
			<van-icon name="search" />
		</div>
		
		<div class="music_lyric">
			<me-lyric v-if="playStyle == 1"></me-lyric>
			<me-player v-if="playStyle == 0"></me-player>
		</div>
		
		<div class="music_lyric_bottom">
			<div class="music_progress" :class="{ disable: !currentMusic.id }">
				<me-slider></me-slider>
				<me-bottom></me-bottom>
			</div>
		</div>
		
		<!--背景设置-->
		<div class="dd_bg_pic" :style="{ backgroundImage: picUrl }"></div>
    <div class="dd_bg_mask"></div>
	</div>
</template>

<script>
import meLyric from '../components/me-lyric'
import mePlayer from '../components/me-player'
import meSlider from '../components/me-slider'
import meBottom from '../components/me-bottom'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		meLyric, meSlider, meBottom, mePlayer
	},
	
	computed: {
    ...mapGetters([
      'currentMusic', // 当前播放音乐
      'playStyle'
    ]),
    
    picUrl() {
      return this.currentMusic.id && this.currentMusic.image
      	? `url(${this.currentMusic.image}?param=300y300)`
      	: "url("+require('@/assets/image/bg.jpg')+")"
    },
  },
  
  methods: {
  	goback () {
			history.go(-1)
		}
  }
}
</script>

<style scoped="scoped" lang="less">
.me_lyric_page{
	height: 100%;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	.me_top{
		height: 40px;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(0, 0, 0, .05);
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
}
.music_lyric{
	position: relative;
	height: inherit;
	flex: 1;
}
.music_lyric_bottom{
	display: flex;
	flex-flow: column;
	.music_progress{
		padding: 20px 20px 5px 20px;
	}
	.disable{
		pointer-events: none; /*阻止用户的点击动作产生任何效果*/
    opacity: 0.6;
	}
}
</style>