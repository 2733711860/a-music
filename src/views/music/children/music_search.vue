<template>
	<div class="list_page">
		<me-search-top @onsearch="onsearch"></me-search-top>
		
		<van-list
			class="melist"
		  v-model="loading"
		  :finished="finished"
		  finished-text="--我也是有底线的--"
		  :immediate-check=false
		  @load="onLoad">
			<me-list :musicList="searchList"></me-list>
		</van-list>

		<!--底部-->
		<me-footer></me-footer>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meList from '../../components/me-list'
import meFooter from '../../components/me-footer'
import meSearchTop from '../../components/me-search-top'
import formatSongs from '@/utils/song'
export default {
	components:{
		meList, meFooter, meSearchTop
	},

	data () {
		return {
			keyword: '', // 搜索关键字
			page: 1, // 页码
			searchList: [],
			loading: false,
      finished: false
		}
	},

	methods: {
		async onsearch (val) { // 确定搜索
			this.keyword = val
			this.page = 1
			this.search()
		},
		
		async search () { // 搜索接口
			let param = {
				keywords: this.keyword,
				limit: 30,
				offset: (this.page - 1) * 30
			}
  		await this.$get(this.$api.search, param).then(async data => {
  			this.loading = false // 加载状态结束
    		if (!data.body.result.songs) { // 没有更多数据啦
    			this.finished = true
	        return
	      }
		    if (this.page != 1) {
		    	this.searchList = [...this.searchList, ...formatSongs(data.body.result.songs)]
		    } else {
		    	this.searchList = formatSongs(data.body.result.songs)
		    }
	    })
		},
		
		onLoad () {
			this.page++
			console.log(this.page)
			this.search()
		}
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