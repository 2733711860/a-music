<template>
	<div class="music_list">
		<van-cell v-for="(item, index) in musicList" :key="index" center title-class="vanCell">
		  <template #title>
		  	<div class="item_left" @click="playThis(item, index)">
		  		<div class="sort_in">{{index + 1}}</div>
		  		<div class="item_left_left">
		  			<img v-lazy="item.picUrl" />
		  		</div>
		  		<div class="item_left_right">
		  			<div>{{item.name}}</div>
		  			<div class="item_left_right_desc">{{item.song.artists | filterSinger}}</div>
		  		</div>
		  	</div>
		  </template>

		  <template #right-icon>
		  	<me-loading class="musicLoading" v-show="currentMusic.id == item.id"></me-loading>
		    <van-icon name="ellipsis" class="icon" />
		  </template>
		</van-cell>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meLoading from '../me-loading'
import { filterSinger } from '@/utils/song.js'
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
	
	filters: {
		filterSinger
	},

	computed: {
  	...mapGetters(['currentMusic'])
  },

	methods: {
		async playThis(music, index) { // 选择播放
			if (this.$route.path == "/music/list/lisy") { // 正在播放列表页面，不需要重置
        // 正在播放列表页面
        if (music.id !== this.currentMusic.id) {
          this.setCurrentIndex(index)
          this.setPlaying(true)
        }
     } else { // 其他重置播放列表
	     	this.selectPlay({
	        list: this.musicList,
	        index
	      });
      }
  	},

  	...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),

    ...mapActions([
      "selectPlay"
    ])
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
	padding: 0 12px;
}
.item_left{
	display: flex;
	align-items: center;
	.sort_in{
		padding-right: 15px;
	}
	.item_left_left{
		img{
			width: 50px;
			border-radius: 5px;
		}
	}
}
.item_left_right{
	display: flex;
	flex-flow: column;
	margin-left: 15px;
	.item_left_right_desc{
		font-size: 12px;
		color: rgba(0, 0, 0, .6);
	}
}
</style>

<style>
.van-cell.van-cell--center .icon.van-icon{
	color: rgba(0, 0, 0, .8);
}
.music_list .van-cell{
	font-size: 13px;
	padding: 8px 10px;
}
.music_list .van-cell .vanCell{
	padding: 0 10px 0 0;
}
</style>

