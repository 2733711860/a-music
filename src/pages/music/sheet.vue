<template>
	<div class="list_page">
		<div class="me_top">
			<van-icon name="arrow-left" @click="goback" />
			<div>歌单</div>
			<van-icon name="search" />
		</div>
		
		<div class="page_content" id="playlist">
			<div class="item_dev">
				<van-tabs v-model="nowTab" @change="tabChange()" sticky swipeable animated offset-top="40">
				  <van-tab v-for="(item, index) in tabs" :key="index" :title="item.name" :name="index">
				  	<van-list
				  	  v-model="loading"
				  	  :finished="finished"
				  	  finished-text="--我也是有底线的--"
				  	  @load="onLoad">
				  	  <me-song-sheet :sheetList="sheetList"></me-song-sheet>
				  	</van-list>
				  </van-tab>
				</van-tabs>
			</div>
		</div>

		<!--底部-->
		<me-footer-two></me-footer-two>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meFooterTwo from '../components/me-footer-two'
import meSongSheet from '../components/me-song-sheet'
export default {
	components:{
		meFooterTwo, meSongSheet
	},

	data () {
		return {
			sheetList: [],
			currentPage: 0,
			limit: 50,
			loading: false,
      finished: false,
      tabs: [],
      nowTab: 0
		}
	},
	
	computed: {
		...mapGetters([ 'listData' ]),
	},
	
	mounted () {
		this.getCatlist()
	},
	
	methods: {
		async getCatlist () { // 歌单分类
			await this.$get(this.$api.getCatlist).then(async data => {
				this.tabs = data.sub
				this.tabs.unshift({
					name: '全部'
				})
	    })
		},
		
		async getPlaylists () { // 歌单
			await this.$get(this.$api.getPlaylists, {
				limit: this.limit,
				offset: (this.currentPage - 1) * this.limit,
				cat: this.tabs[this.nowTab].name
			}).then(async data => {
				this.loading = false // 加载状态结束
    		if (data.playlists.length == 0) { // 没有更多数据啦
    			this.finished = true
	        return
	      }
		    if (this.currentPage != 0) {
		    	this.sheetList = [...this.sheetList, ...data.playlists]
		    } else {
		    	this.sheetList = data.playlists
		    }
	    })
		},
		
		tabChange () {
			this.currentPage = 0
			document.getElementById('playlist').scrollTop = 0
			this.getPlaylists()
		},
		
		onLoad () {
			this.currentPage++
			this.getPlaylists()
		},
		
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
	color: rgba(1, 1, 1, 1);
	font-size: 14px;
	.page_content{
		flex: 1;
		overflow-y: auto;
		.my-swipe{
			height: 140px;
			.banner_img{
				width: 100%;
			}
		}
		.item_dev{
		}
	}
	.me_top{
		height: 40px;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(0, 0, 0, .05);
	}
}
</style>

