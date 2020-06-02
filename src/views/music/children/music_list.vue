<template>
	<div class="list_page">
		<div class="me_top">
			<van-icon name="arrow-left" color="hsla(0,0%,100%,.7)" @click="goback" />
			<div>列表</div>
			<van-icon name="search" color="hsla(0,0%,100%,.7)" />
		</div>
		
		<me-list class="melist" :musicList="listData"></me-list>

		<!--底部-->
		<me-footer-two></me-footer-two>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meList from '../../components/me-list'
import meFooterTwo from '../../components/me-footer-two'
export default {
	components:{
		meList, meFooterTwo
	},

	data () {
		return {
		}
	},
	
	computed: {
		...mapGetters([ 'listData' ]),
	},
	
	methods: {
		goback () {
			history.go(-1)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	.me_top{
		height: 40px;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
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