<template>
  <div class="me_footr">
  	<ul class="footer flex jc-sa w100pc bott0 aic footer">
	    <li class="item">
	      <router-link to="/index" class="flex2 aic f20 yellow" active-class="active">
	        <i class="icon-home iconfont f18 text"></i>
	        <p class="mt-5 f12 text">首页</p>
	      </router-link>
	    </li>
	    <li class="item">
	      <router-link to="/demo" class="flex2 aic f20 text" active-class="active">
	        <van-icon class="text" name="service-o"></van-icon>
	        <p class="mt-5 text f12">歌单</p>
	      </router-link>
	    </li>
	    <li class="item">
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
	    </li>
	    <li class="item">
	      <router-link to="/cart" class="flex2 aic f20 text" active-class="active">
	        <van-icon class="text" name="search"></van-icon>
	        <p class="mt-5 text f12">搜索</p>
	      </router-link>
	    </li>
	    <li class="item">
	      <router-link to="/my" class="flex2 aic f20 text" active-class="active">
	        <van-icon class="text" name="user-o"></van-icon>
	        <p class="mt-5 text f12">我的</p>
	      </router-link>
	    </li>
	  </ul>
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
}
.footer {
  height: 60px;
  width: 100%;
  background-color: rgba(0, 0, 0, .1);
  .text {
    color: #797d82;
  }
  .active .text {
    color: @red;
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
