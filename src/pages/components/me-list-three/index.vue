<template>
	<div class="music_list_two">
		<div class="music_list_all">
			<van-cell v-for="(item, index) in musicList" :key="index" center title-class="vanCell" :style="{backgroundColor: (currentMusic.id == item.id ? '#ededed' : '')}">
			  <template #title>
			  	<div class="item_left" @click="playThis(item, index)">
			  		<div class="sort_in">
			  			<img v-lazy="item.image" v-if="currentMusic.id == item.id" />
			  			<div v-else>{{index + 1}}</div>
			  		</div>
			  		<div class="item_left_right">
			  			<div :style="{color: (currentMusic.id == item.id ? 'rgb(25, 137, 250)' : '')}">{{item.name}}</div>
			  			<div class="item_left_right_desc">{{item.singer}}</div>
			  		</div>
			  	</div>
			  </template>
	
			  <template #right-icon>
			    <span class="icon iconfont foszzx" v-if="currentMusic.id == item.id">&#xe870;</span>
			    <span class="icon iconfont foszzx">&#xe852;</span>
			  </template>
			</van-cell>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
}
.vanCell{
	padding: 0 12px;
}
.item_left{
	display: flex;
	align-items: center;
	.sort_in{
		width: 30px;
		display: flex;
		justify-content: center;
		img{
			width: 30px;
			border-radius: 50%;
		}
	}
}
.item_left_right{
	display: flex;
	flex-flow: column;
	margin-left: 15px;
	.item_left_right_desc{
		font-size: 12px;
		line-height: 20px;
		color: rgba(0, 0, 0, .6);
	}
}
.music_list_all{
	.foszzx{
		margin: 0 5px 0 10px;
	}
}
</style>

<style>
.van-cell.van-cell--center .icon.van-icon{
	color: rgba(0, 0, 0, .6);
}
.music_list_two .van-cell{
	font-size: 13px;
	padding: 2px 10px;
}
.music_list_two .van-cell .vanCell{
	padding: 0 10px 0 0;
}
.item_left_two.van-cell{
	display: flex;
	align-items: center;
	padding: 10px;
}
</style>

