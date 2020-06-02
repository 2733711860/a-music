<template>
	<div class="sheet_page">
		<div class="page_content">
			<div class="item_dev">
				<div class="item_title">
					<div>推荐歌单</div>
					<van-icon name="arrow" />
				</div>
				<div class="item_content">
					<div class="item_menu" v-for="(item, index) in sheetList" :key="index" @click="toRank(item)">
						<img :src="item.picUrl" />
						<div class="item_desc">{{item.name}}</div>
					</div>
				</div>
			</div>

			<div class="item_dev">
				<div class="item_title">
					<div>新歌速递</div>
					<van-icon name="arrow" />
				</div>
				<div class="item_song">
					<me-list :musicList="musicList"></me-list>
				</div>
			</div>
		</div>

		<!--底部-->
		<me-footer></me-footer>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meFooter from '../../components/me-footer'
import { createNewSong } from '@/utils/song'
import meList from '../../components/me-list'
export default {
	components: {
		meFooter, meList
	},

	data () {
		return {
			sheetList: [],
			musicList: []
		}
	},

	mounted () {
		this.getSheetType()
		this.getNewMusic()
	},

	methods: {
		async getSheetType () { // 推荐歌单
			await this.$get(this.$api.sheet_advise, { limit: 6 }).then(async data => {
				if (data.body.code == 200) {
					this.sheetList = data.body.result
				}
	    })
		},

		async getNewMusic () { // 新歌速递
			await this.$get(this.$api.music_new).then(async data => {
				if (data.body.code == 200) {
					this.musicList = await this._formatSongs(data.body.data.slice(0, 5)) // 设置播放列表
				}
	    })
		},

		_formatSongs(list) { // 歌曲数据处理
      let ret = []
      list.forEach(item => {
        const musicData = item
        if (musicData.id) {
          ret.push(createNewSong(musicData))
        }
      })
      return ret
    },

    async toRank (item) {
			this.$router.push({
				path: '/music/rank/detail',
				query: {
					id: item.id,
					type: 2
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.sheet_page{
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	.page_content{
		flex: 1;
		overflow-y: auto;
		.item_dev{
			margin: 15px 0;
			.item_title{
				font-weight: bold;
				padding: 10px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.item_content{
				background-color: rgba(255, 255, 255, .2);
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.item_menu{
					width: 100px;
					margin: 10px 0;
					img{
						width: 100%;
						height: 100px;
						border-radius: 5px;
					}
					.item_desc{
						line-height: 20px;
						font-size: 15px;
						text-align: center;
						overflow: hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-line-clamp: 2;
				    -webkit-box-orient: vertical;
					}
				}
			}
			.item_song{
				background-color: rgba(255, 255, 255, .2);
			}
		}
	}
}
</style>