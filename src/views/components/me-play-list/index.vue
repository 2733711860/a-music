<template>
	<div>
		<van-action-sheet v-model="showList" class="musi_list">
			<div class="popup_dev">
				<me-list :musicList="musicList" style="z-index: 1;position: relative;"></me-list>
				
				<div class="background-mask"></div>
				<div class="background-image" :style="{ backgroundImage: picUrl }"></div>
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
import meList from '../me-list'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		meList
	},

	data () {
		return {
			showList: false
		}
	},

	computed: {
    ...mapGetters([ 'playlist', 'currentMusic' ]),

    musicList () {
  		return this.playlist
  	},
  	
  	picUrl() {
      return this.currentMusic.id && this.currentMusic.image
      	? `url(${this.currentMusic.image}?param=300y300)`
      	: "url("+require('../../../assets/img/MovieDetails/jz2.jpg')+")"
    },
	},

	methods: {
		showMoreF () { // 弹出
  		this.showList = true
  	}
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
.musi_list{
	max-height: 350px;
	.popup_dev{
		position: relative;
		.background-mask{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 0;
			background-color: rgba(0, 0, 0, .6);
		}
		.background-image{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 0;
			background-image: url(../../../assets/img/MovieDetails/jz2.jpg);
			filter: blur(20px);
		}
	}
}
</style>

<style>
	.van-cell__left-icon{
		margin-right: 15px;
	}
</style>