<template>
	<div class="list_page">
		<div class="rank_all">
			<div class="rank_item" v-for="(item, index) in rankList" :key="index" @click="toRank(item)">
				<div class="rank_item_left">
					<div class="rank_name">{{item.name}}</div>
					<div class="rank_detail" v-for="(itemm, indexx) in item.tracks" :key="'ces' + indexx">
						{{indexx + 1}}.{{itemm.first}} - {{itemm.second}}
					</div>
				</div>
				<div class="rank_item_right">
					<img :src="item.coverImgUrl" />
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
export default {
	components:{
		meFooter
	},

	data () {
		return {
			rankList: []
		}
	},

	computed: {
  	...mapGetters(['playlist']),
  },

  mounted() {
  	this.getRankList()
  },

	methods: {
		async getRankList () { // 获取所有榜单
			await this.$get(this.$api.rank_detail).then(async data => {
				if (data.body.code == 200) {
					this.rankList = data.body.list
				}
	    })
		},

		async toRank (item) {
			this.$router.push({
				path: '/music/rank/detail',
				query: {
					id: item.id
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	.rank_all{
		flex: 1;
		overflow-y: auto;
		.rank_item{
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 10px;
			.rank_item_left{
				flex: 1;
				overflow-y: hidden;
				height: 100%;
				display: flex;
				flex-flow: column;
				justify-content: center;
				background-color: rgba(255, 255, 255, .2);
				border-bottom-left-radius: 5px;
				border-top-left-radius: 5px;
				padding: 0 10px;
				.rank_name{
					font-weight: bold;
					color: #000000;
					line-height: 30px;
				}
				.rank_detail{
					color: rgba(255, 255, 255, 0.6);
					line-height: 20px;
					font-size: 14px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			.rank_item_right{
				max-width: 100px;
				height: 100%;
				img{
					height: 100%;
				}
			}
		}
	}
}
</style>

