<template>
	<div class="list_page">
		<me-search-top @onsearch="onsearch"></me-search-top>

		<div class="melist">
			<div class="hot_list" v-if="musicList.length==0">
				<div class="hot_title">热搜列表</div>
				<van-cell center title-class="vanCell" v-for="(item, index) in hotList" :key="index + 'hot'">
				  <template #title>
				  	<div class="item_left">
				  		<div class="sort_in">
				  			<div>{{index + 1}}</div>
				  		</div>
				  		<div class="item_left_right">
				  			<div>{{item.searchWord}}</div>
				  			<div class="item_left_right_desc">{{item.content}}</div>
				  		</div>
				  	</div>
				  </template>
				</van-cell>
			</div>
			
			<!--<div class="search_hot_l">
				<van-tag class="item_hot" round size="large" color="rgba(255, 255, 255, .2)" v-for="(item, index) in hotList" :key="index" @click="onsearch(item.first)">{{item.first}}</van-tag>
			</div>-->

			<van-list
				v-if="musicList.length>0"
			  v-model="loading"
			  :finished="finished"
			  finished-text="--我也是有底线的--"
			  :immediate-check=false
			  @load="onLoad">
				<me-list-three :musicList="musicList"></me-list-three>
			</van-list>
		</div>

		<!--底部-->
		<me-footer-two></me-footer-two>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meListThree from '../components/me-list-three'
import meFooterTwo from '../components/me-footer-two'
import meSearchTop from '../components/me-search-top'
import {formatNewSongs} from '@/utils/song'
export default {
	components:{
		meListThree, meFooterTwo, meSearchTop
	},

	data () {
		return {
			keyword: '', // 搜索关键字
			page: 1, // 页码
			musicList: [],
			loading: false,
      finished: false,
      hotList: []
		}
	},

	mounted () {
		this.getHotSearch()
	},

	methods: {
		async getHotSearch () { // 热搜查询
			await this.$get(this.$api.searchHot).then(async data => {
				this.hotList = data.data
	    })
		},

		async onsearch (val) { // 确定搜索
			this.keyword = val
			this.page = 1
			this.search()
		},

		async search () { // 搜索接口
			let param = {
				keywords: this.keyword,
				limit: 30,
				offset: (this.page - 1) * 30,
				type: 1 // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
			}
  		await this.$get(this.$api.search, param).then(async data => {
  			this.loading = false // 加载状态结束
    		if (!data.result.songs) { // 没有更多数据啦
    			this.finished = true
	        return
	      }
		    if (this.page != 1) {
		    	this.musicList = [...this.musicList, ...formatNewSongs(data.result.songs)]
		    } else {
		    	this.musicList = await formatNewSongs(data.result.songs)
		    }
	    })
		},

		onLoad () {
			this.page++
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
		.search_hot_l{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			background-color: rgba(0, 0, 0, .1);
			.item_hot{
				margin: 10px;
			}
		}
		.search_hot_l:after{
			content: '';
			flex: 1;
		}
		.hot_list{
			.hot_title{
				color: rgba(0, 0, 0, 1);
				padding: 20px 20px 10px 20px;
				font-weight: bold;
			}
			.musicLoading {
				height: 15px !important;
				width: 20px;
			}
			.vanCell{
				padding: 0 12px;
			}
			.item_left{
				display: flex;
				align-items: center;
				.sort_in{
					width: 30px;
					display: flex;
					justify-content: center;
				}
				.item_left_left{
					img{
						width: 50px;
						border-radius: 5px;
					}
				}
			}
			.item_left_right{
				display: flex;
				flex-flow: column;
				margin-left: 15px;
				.item_left_right_desc{
					font-size: 12px;
					color: rgba(0, 0, 0, .6);
				}
			}
		}
	}
}
</style>

<style>
.hot_list .van-cell.van-cell--center .icon.van-icon{
	color: rgba(0, 0, 0, .8);
}
.hot_list .van-cell{
	font-size: 13px;
	padding: 8px 10px;
}
</style>