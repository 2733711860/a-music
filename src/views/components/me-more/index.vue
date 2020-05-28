<template>
	<div>
		<van-action-sheet v-model="volumeShow">
			<div class="more_div">
				<div class="more_div_title">杨小壮 - 我承认我自卑</div>
				<div class="more_colume">
					<span class="icon iconfont marrh">&#xe662;</span>
					<van-slider v-model="value" @input="change" bar-height="1px" button-size="12px" />
				</div>
				<div class="more_list">
					<van-cell title="下一首播放" icon="play-circle-o" />
					<van-cell title="评论" icon="comment-o" />
					<van-cell title="收藏" icon="like-o" />
					<van-cell title="添加到歌单" icon="todo-list-o" />
					<van-cell title="歌曲信息" icon="coupon-o" />
					<div style="height: 10px;"></div>
				</div>
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	data () {
		return {
			volumeShow: false,
			value: 0
		}
	},
	
	computed: {
    ...mapGetters([ 'volume' ])
	},
	
	methods: {
		showMoreF () { // 音量弹出
			this.value = this.volume * 100
  		this.volumeShow = true
  	},
  	
  	change () { // 音量变化
  		let percent = this.value / 100
  		this.setVolume(percent)
  	},
  	
  	...mapActions(['setVolume'])
	}
}
</script>

<style scoped="scoped" lang="less">
.more_div{
	display: flex;
	flex-flow: column;
	z-index: 1;
	.more_div_title{
		padding: 15px;
		border-bottom: 1px solid #e5e5e5;
	}
	.more_colume{
		padding: 15px 15px;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		align-items: center;
		.marrh{
			margin-right: 10px;
		}
	}
	.more_list{
		flex: 1;
		overflow-y: auto;
	}
}
</style>

<style>
	.van-cell__left-icon{
		margin-right: 15px;
	}
</style>