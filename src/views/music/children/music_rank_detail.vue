<template>
	<div class="rank_detail_page">
		<div class="me_top">
			<van-icon name="arrow-left" color="hsla(0,0%,100%,.7)" @click="goback" />
			<div>{{rankDetail.name ? rankDetail.name : '排行榜'}}</div>
			<van-icon name="search" color="hsla(0,0%,100%,.7)" />
		</div>

		<div class="rankList">
			<div class="rank_top">
				<img :src="rankDetail.coverImgUrl" />
				<div class="rank_msg">
					<div class="rank_name">{{rankDetail.name}}</div>
					<div class="rank_time">最近更新：{{ rankDetail.updateTime | dateFormatFun }}</div>
					<div class="rank_time">创建日期：{{ rankDetail.createTime | dateFormatFun }}</div>
					<div class="rank_time">{{rankDetail.description}}</div>
				</div>
			</div>

			<me-list :musicList="musicList" class="music_list"></me-list>
		</div>

		<!--底部-->
		<me-footer-two></me-footer-two>

		<!--背景设置-->
		<div class="dd_bg_pic" :style="{ backgroundImage: picUrl }"></div>
    <div class="dd_bg_mask"></div>
	</div>
</template>

<script>
import { dateFormatFun } from '@/utils/commonFunction.js'
import { createTopList } from '@/utils/song'
import meList from '../../components/me-list'
import meFooterTwo from '../../components/me-footer-two'
export default {
	components:{
		meList, meFooterTwo
	},

	data () {
		return {
			rankDetail: {},
			musicList: []
		}
	},

	filters: {
    // 时间戳转日期
    dateFormatFun
  },

	computed: {
		picUrl() {
      return this.rankDetail.coverImgUrl
      	? `url(${this.rankDetail.coverImgUrl}?param=300y300)`
      	: "url("+require('../../../assets/image/bg.jpg')+")"
    },
	},

	mounted () {
		if (this.$route.query.type == 1) { // 排行
			this.getRankDetail()
		} else if (this.$route.query.type == 2) { // 歌单
			this.getSheetDetail()
		}
	},

	methods: {
		async getRankDetail () {
			let param = { idx: this.$route.query.id }
			await this.$get(this.$api.rank_topList, param).then(async data => {
				if (data.body.code == 200) {
					this.rankDetail = data.body.playlist
					this.musicList = await this._formatSongs(data.body.playlist.tracks) // 设置播放列表
				}
	    })
		},

		async getSheetDetail () { // 歌单详情没登陆只能获取部分，登陆获取全部
			let param = { id: this.$route.query.id }
			await this.$get(this.$api.sheet_detail, param).then(async data => {
				if (data.body.code == 200) {
					this.rankDetail = data.body.playlist
					this.musicList = await this._formatSongs(data.body.playlist.tracks) // 设置播放列表
				}
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
.rank_detail_page{
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
	.rankList{
		flex: 1;
		overflow-y: auto;
		.music_list{
			background-color: rgba(0, 0, 0, .6);
		}
		.rank_top{
			height: 160px;
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
					font-size: 14px;
					color: rgba(255, 255, 255, .7);
					line-height: 18px;
					overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
				}
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
</style>