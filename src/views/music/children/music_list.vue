<template>
	<div class="list_page">
		<me-list class="melist" :musicList="musicList"></me-list>

		<!--底部-->
		<me-footer></me-footer>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meList from '../../components/me-list'
import meFooter from '../../components/me-footer'
export default {
	components:{
		meList, meFooter
	},

	data () {
		return {
		}
	},

	computed: {
  	...mapGetters(['playlist']),

  	musicList () {
  		return this.playlist
  	}
  },

	methods: {
	}
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	.melist{
		flex: 1;
		overflow-y: auto;
	}
}
</style>

<style>
	.music_list .van-cell{
		padding: 8px 12px 8px 0 !important;
	}
</style>