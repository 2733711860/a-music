<template>
	<div>
		<div class="left_play" :class="{ disable: !currentMusic.id }">
	    <img class="play-bar-support" src="@/assets/image/play-bar-support.png" />
	    <img :class="{playing}" class="play-bar" src="@/assets/image/play-bar.png" />
	    <div class="img-outer-border" ref="disc" @click="playF()">
	      <div :class="{paused: !playing}" class="img-outer" ref="discRotate" >
	        <div class="img-wrap">
	          <img :src="picUrl" />
	        </div>
	      </div>
	    </div>
	  </div>
	  
	  <div class="left_lyric" @click="changePlayer">
	  	<p v-if="!currentMusic.id">还没有播放音乐哦！</p>
	      <p v-else-if="nolyric">暂无歌词！</p>
	      <template v-else-if="lyric.length>0">
	        <p>{{ lyric.filter((item, index) => lyricIndex===index)[0].text }}</p>
	      </template>
	      <p v-else>歌词加载失败！</p>
	  </div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	data () {
		return {
		}
	},
	
	computed: {
    ...mapGetters([ 'playing', 'currentMusic', 'lyricIndex', 'lyric', 'nolyric' ]),
    
    picUrl() {
      return this.currentMusic.id && this.currentMusic.image
      	? `${this.currentMusic.image}?param=300y300`
      	: require('../../../assets/image/bg.jpg')
    },
	},
	
	methods: {
		playF () { // 播放暂停
			if (this.currentMusic.id == undefined) { //当前没有正在播放的音乐，底部按钮不可点击
  			return
  		}
			this.setPlaying(!this.playing)
		},
		
		changePlayer () { // 改变播放器页面样式，改为歌词
			this.setPlaystyle(1)
		},
		
		...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlaystyle: 'SET_PLAYSTYLE'
    }),
	}
}
</script>

<style scoped="scoped" lang="less">
.disable{
	pointer-events: none; /*阻止用户的点击动作产生任何效果*/
}
.left_play {
  position: relative;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  .play-bar-support {
    position: absolute;
    left: 172.5px;
    top: -15px;
    width: 30px;
    height: 30px;
    z-index: 2;
  }

  .play-bar {
    position: absolute;
    top: 0;
    left: 182.5px;
    width: 100px;
    height: 146px;
    z-index: 1;
    transform-origin: 0 0;
    transform: rotate(-30deg);
    transition: all 0.3s;
  }
  .playing {
    transform: rotate(1deg);
  }

  .img-outer-border {
  	border-radius: 50%;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	width: 300px;
  	height: 300px;
    .img-outer {
    	width: 300px;
    	height: 300px;
      background: black;
      background: linear-gradient(-45deg, #333540, #070708, #333540);
      animation: rotate 20s linear infinite;
      border-radius: 50%;
	  	display: flex;
	  	align-items: center;
	  	justify-content: center;
      .img-wrap {
      	width: 200px;
      	height: 200px;
      	flex-shrink: 0;
        img {
        	width: 100%;
        	height: 100%;
          border-radius: 50%;
        }
      }
    }
    .paused {
      animation-play-state: paused;
    }
  }
}
.left_lyric{
	height: 34px;
	line-height: 34px;
	text-align: center;
	margin: 40px 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>