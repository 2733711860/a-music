<template>
	<div class="list_page">
		<div class="me_top">
			<van-icon name="arrow-left" @click="goback" />
			<div>列表</div>
			<van-icon name="search" />
		</div>
		
		<div class="rankList">
			<div class="rank_top" v-if="this.$route.query.type != '1'">
				<div class="rank_top_top">
					<img :src="playlist.coverImgUrl" />
					<div class="rank_msg">
						<div class="rank_name">{{playlist.name}}</div>
						<div class="rank_time">最近更新：{{ playlist.updateTime | dateFormatFun }}</div>
						<div class="rank_time">创建日期：{{ playlist.createTime | dateFormatFun }}</div>
						<div class="rank_time">{{playlist.description}}</div>
					</div>
				</div>
				<div class="rank_top_btn">
					<div class="item_btn">
						<span class="icon iconfont foszzx">&#xe870;</span>
						<div>分享</div>
					</div>
					<div class="item_btn">
						<span class="icon iconfont foszzx">&#xe870;</span>
						<div>下载</div>
					</div>
					<div class="item_btn">
						<span class="icon iconfont foszzx">&#xe891;</span>
						<div>评论(1246)</div>
					</div>
					<div class="item_btn">
						<span class="icon iconfont foszzx">&#xe870;</span>
						<div>收藏(1246)</div>
					</div>
				</div>
				
				<!--背景设置-->
				<div class="dd_bg_pic" :style="{ backgroundImage: picUrl }"></div>
		    <div class="dd_bg_mask"></div>
			</div>

			<me-list :musicList="musicList" class="music_list"></me-list>
		</div>

		<!--底部-->
		<me-footer-two></me-footer-two>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meList from '../components/me-list'
import meFooterTwo from '../components/me-footer-two'
import meSongSheet from '../components/me-song-sheet'
import { createTopList, dateFormatFun } from '@/utils'
export default {
	components:{
		meFooterTwo, meSongSheet, meList
	},

	data () {
		return {
			playlist: {},
			musicList: []
		}
	},
	
	computed: {
		picUrl() {
      return this.playlist.coverImgUrl
      	? `url(${this.playlist.coverImgUrl}?param=300y300)`
      	: "url("+require('@/assets/image/bg.jpg')+")"
    }
	},
	
	filters: {
    // 时间戳转日期
    dateFormatFun
  },
	
	mounted () {
		if (this.$route.query.type && this.$route.query.type == '1') { // 首页音乐列表
			this.getTopList()
		} else if(this.$route.query.type && this.$route.query.type == '2') { // 排行榜音乐列表
			this.getListDetail()
		} else { // 歌单音乐列表
			this.getListDetail()
		}
	},
	
	methods: {
		async getTopList() { // 获取歌曲列表
  		await this.$get(this.$api.getTop_list, { idx: '26' }).then(async data => {
  			data = data.playlist.tracks.slice(0,100)
		  	this.musicList = await this._formatSongs(data) // 设置播放列表
	    })
  	},
		
		async getListDetail () { // 歌单详情
			await this.$get(this.$api.getListDetail, { id: this.$route.query.id }).then(async data => {
				this.playlist = data.playlist
				this.getSongDetail(data.playlist)
	    })
		},
		
		async getSongDetail (playlist) { // 歌曲详情
			const trackIds = playlist.trackIds.map(({ id }) => id)
			await this.$get(this.$api.getSongDetail, { ids: trackIds.join(',') }).then(async data => {
				this.musicList = await this._formatSongs(data.songs)
	    })
		},
		
		_formatSongs(list) { // 歌曲数据处理
      let ret = []
      list.forEach(item => {
        const musicData = item
        if (musicData.id) {
          ret.push(createTopList(musicData))
        }
      })
      return ret
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
	.rankList{
		flex: 1;
		overflow-y: auto;
		.music_list{
			background-color: rgba(0, 0, 0, .6);
		}
		.rank_top{
			height: 200px;
			display: flex;
			flex-flow: column;
			justify-content: center;
			position: relative;
			color: rgba(255, 255, 255, .9);
			.rank_top_btn{
				display: flex;
				justify-content: space-around;
				margin-top: 15px;
				.item_btn{
					font-size: 12px;
					text-align: center;
					.foszzx{
						font-size: 22px;
						display: inline-block;
						margin-bottom: 5px;
					}
				}
			}
			.rank_top_top{
				display: flex;
				align-items: center;
				padding: 0 10px;
				img{
					width: 110px;
					height: 110px;
					border-radius: 5px;
				}
				.rank_msg{
					flex: 1;
					padding: 0 10px;
					height: 110px;
					display: flex;
					flex-flow: column;
					justify-content: space-between;
					.rank_name{
						line-height: 25px;
					}
					.rank_time{
						color: rgba(255, 255, 255, .6);
						font-size: 13px;
						line-height: 16px;
						overflow: hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-line-clamp: 2;
				    -webkit-box-orient: vertical;
					}
				}
			}
			/*背景*/
			.dd_bg_pic, .dd_bg_mask{
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: -2;
			}
			.dd_bg_pic{
				z-index: -2;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: 50%;
				transition: all 0.8s;
				-webkit-transition: all 0.8s;
				filter: blur(12px);
				-webkit-filter: blur(12px);
				opacity: .8;
			}
			.dd_bg_mask{
				opacity: .5;
				filter: none;
				background-color: rgba(46, 48, 48, 1);
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

