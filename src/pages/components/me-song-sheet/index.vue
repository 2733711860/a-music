<template>
	<div class="item_content">
		<div class="item_menu" v-for="(item, index) in sheetList" :key="index" @click="toRank(item)">
			<img :src="item.picUrl" />
			<div class="item_desc">{{item.name}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		sheetList: {
			type: Array,
			default: () => []
		}
	}
}
</script>

<style scoped="scoped" lang="less">
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