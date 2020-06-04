<template>
	<div class="list_page">
		<div class="me_top">
			<van-icon name="arrow-left" @click="goback" />
			<div>推荐</div>
			<van-icon name="search" />
		</div>
		
		<div class="page_content">
			<van-swipe class="my-swipe" :autoplay="10000" :width="375" indicator-color="white">
			  <van-swipe-item v-for="(item, index) in banners" :key="index">
			  	<img v-lazy="item.pic" class="banner_img" />
			  </van-swipe-item>
			</van-swipe>
			<div class="item_dev">
				<div class="item_title" @click="toSheetList()">
					<div>推荐歌单</div>
					<div class="more_btn">
						更多歌单<van-icon name="arrow" />
					</div>
				</div>
				<me-song-sheet :sheetList="sheetList"></me-song-sheet>
			</div>
			
			<div class="item_dev">
				<div class="item_title" @click="toSheetList()">
					<div>新歌速递</div>
					<div class="more_btn">
						更多歌曲<van-icon name="arrow" />
					</div>
				</div>
				<me-list :musicList="musicList"></me-list>
			</div>
		</div>
		

		<!--底部-->
		<me-footer></me-footer>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meList from '../components/me-list'
import meFooter from '../components/me-footer'
import meSongSheet from '../components/me-song-sheet'
export default {
	components:{
		meList, meFooter, meSongSheet
	},

	data () {
		return {
			banners: [],
			sheetList: [],
			musicList: []
		}
	},
	
	computed: {
		...mapGetters([ 'listData' ]),
	},
	
	mounted () {
		this.getBanner()
		this.getPersonalized()
		this.getNewSongs()
	},
	
	methods: {
		async getBanner () {
			var u = navigator.userAgent, app = navigator.appVersion
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
			
			await this.$get(this.$api.getBanner, { type: isAndroid ? 1 : 2 }).then(async data => {
				this.banners = data.banners
	    })
		},
		
		async getPersonalized () {
			await this.$get(this.$api.getPersonalized, { limit: 6 }).then(async data => {
				this.sheetList = data.result
	    })
		},
		
		async getNewSongs () {
			await this.$get(this.$api.getNewSongs, { limit: 6 }).then(async data => {
				this.musicList = data.result
	    })
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
			margin: 15px 0;
			.item_title{
				font-weight: bold;
				padding: 10px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.more_btn{
					color: rgba(0, 0, 0, .6);
					font-size: 13px;
					display: flex;
					align-items: center;
					font-weight: normal;
				}
			}
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

