<template>
  <div class="app">
    <transition name="move-fade-top-to-bottom">
      <router-view class="app-router-view"></router-view>
    </transition>
    
    <!--播放器-->
  	<audio ref="ddPlayer"></audio>
  </div>
</template>

<script>
console.log(process.env.NODE_ENV)
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { createTopList } from '@/utils/song'
export default {
  name: "app",
  created() {
  	// 设置audio元素
    this.$nextTick(() => {
    	this.music.audioEle = this.$refs.ddPlayer // 设置audio元素
      this.setMusic(this.music)
    })
    this.getSongList()
  },
  
  computed: {
  	...mapGetters(['music'])
  },
  
  methods: {
  	async getSongList() { // 获取歌曲列表
  		let param = {
	  		idx: '1'
	  	}
  		await this.$get(this.$api.top_list, param).then(async data => {
    		if (data.body.code == 200) {
    			data = data.body.playlist.tracks.slice(0,100)
			  	this.music.playlist = await this._formatSongs(data) // 设置播放列表
			  	this.setMusic(this.music)
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
  	
  	...mapActions(['setMusic'])
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
    color: rgba(255, 255, 255, 0.8);
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



