<template>
	<div>
		<van-action-sheet v-model="showList" class="musi_list">
			<div class="popup_dev">
				<me-list-two :musicList="musicList" style="z-index: 1;position: relative;"></me-list-two>
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
import meListTwo from '../me-list-two'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		meListTwo
	},

	data () {
		return {
			showList: false
		}
	},

	computed: {
    ...mapGetters([ 'playlist' ]),

    musicList () {
  		return this.playlist
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
.musi_list{
	max-height: 350px;
	.popup_dev{
		position: relative;
	}
}
</style>

<style>
	.van-cell__left-icon{
		margin-right: 15px;
	}
</style>