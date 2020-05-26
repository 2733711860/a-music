<template>
	<div class="me_lyric_page">
		<div class="music_lyric">
			<me-lyric></me-lyric>
		</div>
		
		<div class="music_lyric_bottom">
			<div class="music_progress">
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
export default {
	components: {
		meLyric, meSlider, meBottom
	}
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
}
</style>