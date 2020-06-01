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
  		<div class="music_name">点歌的人</div>
  		<div class="music_user">海来阿木</div>
  	</div>
  	<div class="me_footer_icon">
  		<span class="iconfont icon2"></span>
  	</div>
  </div>
</template>

<script>
import meProgress from '../me-progress'
import { mapGetters } from 'vuex'
export default {
	components: {
		meProgress
	},

	computed: {
		...mapGetters([ 'currentTime', 'currentMusic', 'playing']),

		percent() { // 进度条进度百分比
      const duration = this.currentMusic.duration
      return this.currentTime && duration ? (this.currentTime / duration) * 100 : 0
    },

    picUrl() {
      return this.currentMusic.id && this.currentMusic.image
      	? `${this.currentMusic.image}?param=300y300`
      	: require('../../../assets/image/bg.jpg')
    },
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
