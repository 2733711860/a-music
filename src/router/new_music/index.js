export default [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: resolve => {
      require(['@/pages/music/index.vue'], resolve)
    },
    meta: {
    	title: '首页',
    	aniName: 'move-fade-top-to-bottom'
    }
  }
]
