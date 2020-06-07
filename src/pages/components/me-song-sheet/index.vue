<template>
	<div class="item_content">
		<div class="item_menu" v-for="(item, index) in sheetList" :key="index" @click="toRank(item)">
			<div class="item_sheet_num">
				<van-icon name="service-o" />
				<div>{{item.playCount | addChineseUnit}}</div>
			</div>
			<img :src="item.picUrl ? item.picUrl : item.coverImgUrl" />
			<div class="item_desc">{{item.name}}</div>
		</div>
	</div>
</template>

<script>
import { addChineseUnit } from '@/utils/commonFunction.js'
export default {
	props: {
		sheetList: {
			type: Array,
			default: () => []
		}
	},
	
	filters: {
		addChineseUnit
	},
	
	methods: {
		toRank (item) {
			this.$router.push({
				path: '/list',
				query: {
					id: item.id
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.item_content:after{
	content: '';
	width: 100px;
}
.item_content{
	background-color: rgba(255, 255, 255, .2);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 10px;
	.item_menu{
		width: 100px;
		margin: 10px 0;
		position: relative;
		.item_sheet_num{
			position: absolute;
			top: 0;
			width: 100%;
			height: 25px;
			padding: 0 5px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background-image: linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, 0));
			color: rgba(255, 255, 255, .9);
			font-size: 12px;
		}
		img{
			width: 100%;
			height: 100px;
			border-radius: 5px;
		}
		.item_desc{
			line-height: 20px;
			font-size: 12px;
			color: rgba(0, 0, 0, .8);
			overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
		}
	}
}
</style>