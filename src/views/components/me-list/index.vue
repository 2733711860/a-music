<template>
	<div class="music_list">
		<van-cell v-for="(item, index) in musicList" :key="index" @click="playThis(item, index)" center title-class="vanCell">
		  <template #title>
		  	<div class="item_left">
		  		<div class="item_left_left">{{index + 1}}</div>
		  		<div class="item_left_right">
		  			<div>{{item.name}}</div>
		  			<div class="item_left_right_desc">{{item.singer}}</div>
		  		</div>
		  	</div>
		  </template>
		  
		  <template #right-icon>
		  	<me-loading class="musicLoading" v-show="currentMusic.id == item.id"></me-loading>
		    <van-icon name="ellipsis" style="line-height: inherit;" />
		  </template>
		</van-cell>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import meLoading from '../me-loading'
export default {
	components:{
		meLoading
	},

	data () {
		return {
		}
	},
	
	props: {
		musicList: {
			type: Array,
			default: () => []
		}
	},

	computed: {
  	...mapGetters(['currentMusic'])
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
.item_left{
	display: flex;
	align-items: center;
}
.item_left_right{
	display: flex;
	flex-flow: column;
	margin-left: 15px;
	.item_left_right_desc{
		color: rgba(255, 255, 255, .5);
		font-size: 12px;
	}
}
</style>

<style>
	.music_list .van-cell{
		padding: 8px 12px 8px 0 !important;
	}
</style>