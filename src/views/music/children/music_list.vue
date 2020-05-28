<template>
	<div class="list_page">
		<div class="music_list">
			<van-cell v-for="(item, index) in musicList" :key="index" @click="playThis(item, index)" :title="item.name" :label="item.singer" center title-class="vanCell">
			  <template #right-icon>
			  	<me-loading class="musicLoading" v-show="currentMusic.id == item.id"></me-loading>
			    <van-icon name="ellipsis" style="line-height: inherit;" />
			  </template>
			</van-cell>
		</div>

		<!--底部-->
		<me-footer></me-footer>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meLoading from '../../components/me-loading'
import meFooter from '../../components/me-footer'
export default {
	components:{
		meLoading, meFooter
	},

	data () {
		return {
		}
	},

	computed: {
  	...mapGetters(['currentMusic', 'playlist']),

  	musicList () {
  		return this.playlist
  	}
  },

	methods: {
		async playThis(item, index) { // 选择播放
			this.setCurrentIndex(index)
			this.setPlaying(true)
  	},

  	...mapMutations({
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX'
    })
	}
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	.music_list{
		flex: 1;
		overflow-y: auto;
	}
}
.musicLoading {
	height: 15px !important;
	width: 20px;
	margin-right: 20px;
}
.vanCell{
	background-color: rgba(0, 0, 0, 0);
	padding: 0 12px;
	color: rgba(255, 255, 255, 0.9);
}
</style>