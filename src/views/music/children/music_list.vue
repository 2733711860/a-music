<template>
	<div class="list_page">
		<van-cell v-for="(item, index) in musicList" :key="index" @click="playThis(item, index)" :title="item.name" :label="item.singer" center>
		  <template #right-icon>
		  	<me-loading class="musicLoading" v-show="currentMusic.id == item.id"></me-loading>
		    <van-icon name="ellipsis" style="line-height: inherit;" />
		  </template>
		</van-cell>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meLoading from '../../components/me-loading'
export default {
	components:{
		meLoading
	},
	
	data () {
		return {
			musicList: []
		}
	},
	
	computed: {
  	...mapGetters(['music', 'currentMusic'])
  },
	
	mounted () {
		this.musicList = this.music.playlist
	},
	
	methods: {
		async playThis(item, index) { // 选择播放
			this.music.playlist = this.musicList
			this.music.currentIndex = index
			this.music.currentIndex = index
			this.music.playing = true
			this.music.currentProgress = 0
			this.setMusic(this.music)
  	},
  	
  	...mapActions(['setMusic'])
	}
}
</script>

<style scoped="scoped" lang="less">
.musicLoading {
	height: 15px !important;
	width: 20px;
	margin-right: 20px;
}
</style>