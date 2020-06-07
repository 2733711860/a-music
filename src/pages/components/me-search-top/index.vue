<template>
	<div class="me_top">
		<van-search
	    v-model="value"
	    shape="round"
	    :placeholder="placeholder"
	    show-action
	    @search="onSearch"
	    @cancel="onCancel"
	  />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data () {
		return {
			value: '',
			placeholder: '许嵩'
		}
	},

	computed: {
  },

  mounted () {
  },

  methods: {
  	onSearch () {
  		let keyword = this.value == '' ? this.placeholder : this.value
  		this.$emit('onsearch', keyword)
  	},
  	
  	onCancel () {
  		history.go(-1)
  	}
  }
}
</script>

<style scoped="scoped">
	.me_top{
		height: 40px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

<style lang="less">
	.me_top{
		.van-search{
			width: 100%;
			padding: 0;
			background-color: rgba(255, 255, 255, 1);
			.van-search__action{
				color: rgba(0, 0, 0, .9);
			}
			.van-search__content{
				background-color: #f7f8fA;
				.van-cell{
					color: rgba(0, 0, 0, .9);
					padding: 5px 10px !important;
					.van-field__control{
						color: rgba(0, 0, 0, .9);
					}
				}
			}
		}
	}
</style>