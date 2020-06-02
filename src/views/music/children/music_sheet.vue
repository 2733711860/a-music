<template>
	<div class="list_page">
		<div class="me_top">
			<van-icon name="arrow-left" color="hsla(0,0%,100%,.7)" @click="goback" />
			<div>{{$route.meta.title}}</div>
			<van-icon name="search" color="hsla(0,0%,100%,.7)" />
		</div>
		
		<div class="item_content">
			<div class="item_menu" v-for="(item, index) in sheets" :key="index" @click="toRank(item)">
				<img :src="item.picUrl" />
				<div class="item_desc">{{item.name}}</div>
			</div>
		</div>

		<!--底部-->
		<me-footer-two></me-footer-two>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import meFooterTwo from '../../components/me-footer-two'
export default {
	components:{
		meFooterTwo
	},

	data () {
		return {
		}
	},
	
	computed: {
		...mapGetters([ 'sheets' ]),
	},
	
	methods: {
		goback () {
			history.go(-1)
		},
		
		toRank (item) { // 歌单详情
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
.list_page{
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	.item_content:after{
		content: '';
		flex: auto;
	}
	.item_content{
		flex: 1;
		overflow-y: auto;
		background-color: rgba(255, 255, 255, .2);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 10px;
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