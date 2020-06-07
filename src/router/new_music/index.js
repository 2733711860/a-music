export default [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: "*",
    component: () => import("@/pages/music/NotFound")
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
  },
  {
    path: '/sheet',
    name: 'sheet',
    component: resolve => {
      require(['@/pages/music/sheet.vue'], resolve)
    },
    meta: {
    	title: '歌单',
    	aniName: 'move-fade-top-to-bottom'
    }
  },
  {
    path: '/list',
    name: 'list',
    component: resolve => {
      require(['@/pages/music/list.vue'], resolve)
    },
    meta: {
    	title: '列表',
    	aniName: 'move-fade-top-to-bottom'
    }
  },
  {
    path: '/lyric',
    name: 'lyric',
    component: resolve => {
      require(['@/pages/music/lyric.vue'], resolve)
    },
    meta: {
    	title: '播放',
    	aniName: 'move-fade-top-to-bottom'
    }
  },
  {
    path: '/rank',
    name: 'rank',
    component: resolve => {
      require(['@/pages/music/rank.vue'], resolve)
    },
    meta: {
    	title: '榜单',
    	aniName: 'move-fade-top-to-bottom'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: resolve => {
      require(['@/pages/music/search.vue'], resolve)
    },
    meta: {
    	title: '搜素',
    	aniName: 'move-fade-top-to-bottom'
    }
  }
]
