<template>
	<div>
		<van-action-sheet v-model="showList" class="musi_list">
			<me-list :musicList="musicList"></me-list>
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
    ...mapGetters([ 'playlist' ]),

    musicList () {
  		return this.playlist
  	}
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
	background-color: rgba(0, 0, 0, .9);
	max-height: 300px;
}
</style>

<style>
	.van-cell__left-icon{
		margin-right: 15px;
	}
</style>