<template>
	<div class="bottom_lyric">
		<div>
			<span class="icon iconfont fosz">&#xe66c;</span>
		</div>
		<div class="bottom_button">
			<span class="icon iconfont fosz">&#xe603;</span>
			<span class="icon iconfont foszz" @click="play">{{ music.playing ? '&#xe643;' : '&#xe609;'}}</span>
			<span class="icon iconfont fosz">&#xe602;</span>
		</div>
		<div>
			<span class="icon iconfont fosz">&#xe662;</span>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	computed: {
		...mapGetters([ 'music' ])
	},
	
	methods: {
		play () { // 播放暂停
			this.music.playing = !this.music.playing
			this.setMusic(this.music)
		},
		
		...mapActions(['setMusic'])
	}
}
</script>

<style scoped="scoped" lang="less">
	.bottom_lyric{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		.bottom_button{
			display: flex;
			align-items: center;
		}
		.fosz{
			font-size: 22px;
		}
		.foszz{
			font-size: 36px;
			padding: 0 15px;
		}
	}
</style>