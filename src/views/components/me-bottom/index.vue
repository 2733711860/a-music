<template>
	<div class="bottom_lyric">
		<div>
			<span class="icon iconfont fosz">&#xe66c;</span>
		</div>
		<div class="bottom_button">
			<span class="icon iconfont fosz">&#xe603;</span>
			<span class="icon iconfont foszz" @click="play">{{ playing ? '&#xe643;' : '&#xe609;'}}</span>
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
		...mapGetters([ 'playing' ])
	},

	methods: {
		play () { // 播放暂停
			this.playing = !this.playing
			this.setPlaying(this.playing)
		},

		...mapMutations({
      setPlaying: 'SET_PLAYING'
    })
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