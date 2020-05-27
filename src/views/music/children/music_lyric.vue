<template>
	<div class="me_lyric_page">
		<div class="music_lyric">
			<me-lyric></me-lyric>
		</div>
		
		<div class="music_lyric_bottom">
			<div class="music_progress" :class="{ disable: !currentMusic.id }">
				<me-slider></me-slider>
				<me-bottom></me-bottom>
			</div>
		</div>
	</div>
</template>

<script>
import meLyric from '../../components/me-lyric'
import meSlider from '../../components/me-slider'
import meBottom from '../../components/me-bottom'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		meLyric, meSlider, meBottom
	},
	
	computed: {
    ...mapGetters([
      'currentMusic', // 当前播放音乐
    ])
  },
}
</script>

<style scoped="scoped" lang="less">
.me_lyric_page{
	height: 100%;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
}
.music_lyric{
	position: relative;
	height: inherit;
	flex: 1;
}
.music_lyric_bottom{
	display: flex;
	flex-flow: column;
	.music_progress{
		padding: 20px 20px 5px 20px;
	}
	.disable{
		pointer-events: none; /*阻止用户的点击动作产生任何效果*/
    opacity: 0.6;
	}
}
</style>