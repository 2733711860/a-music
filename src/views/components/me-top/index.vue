<template>
	<div class="me_top">
		<van-icon name="arrow-left" color="hsla(0,0%,100%,.7)" @click="goback" />
		<div>{{title}}</div>
		<van-icon name="search" color="hsla(0,0%,100%,.7)" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data () {
		return {
		}
	},

	computed: {
  	...mapGetters(['currentMusic']),

  	title () {
  		return this.$route.path == '/music/lyric' ? 
  			(this.currentMusic && this.currentMusic.name ? this.currentMusic.name : this.$route.meta.title) :
  			this.$route.meta.title
  	}
  },

  mounted () {
  	console.log(this.$route)
  },

  methods: {
  	goback () {
  		history.go(-1)
  	}
  }
}
</script>

<style scoped="scoped">
	.me_top{
		height: 40px;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>