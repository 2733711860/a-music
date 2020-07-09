export default [
  {
    path: '/music',
    component: resolve => { require(['@/views/music/music.vue'], resolve) },
    redirect: '/music/homePage',
    children: [
    	{
	      path: '/music/homePage',
	      name: 'music/homePage',
	      component: resolve => {
		      require(['@/views/music/children/music_homePage.vue'], resolve)
		    },
		    meta: {
		    	title: '首页',
		    	aniName: 'move-fade-top-to-bottom',
		    	showTop: true
		    }
	    },
	    {
	      path: '/music/list',
	      name: 'music/list',
	      component: resolve => {
		      require(['@/views/music/children/music_list.vue'], resolve)
		    },
		    meta: {
		    	title: '播放列表',
		    	aniName: 'move-fade-top-to-bottom'
		    }
	    }, {
	      path: '/music/lyric',
	      name: 'music/lyric',
	      component: resolve => {
		      require(['@/views/music/children/music_lyric.vue'], resolve)
		    },
		    meta: {
		    	title: '正在播放',
		    	aniName: 'move-fade-bottom-to-top',
		    	showTop: true
		    }
	    }, {
	      path: '/music/search',
	      name: 'music/search',
	      component: resolve => {
		      require(['@/views/music/children/music_search.vue'], resolve)
		    },
		    meta: {
		    	title: '搜索',
		    	aniName: 'move-fade-top-to-bottom'
		    }
	    }, {
	      path: '/music/rank',
	      name: 'music/rank',
	      component: resolve => {
		      require(['@/views/music/children/music_rank.vue'], resolve)
		    },
		    meta: {
		    	title: '排行榜',
		    	aniName: 'move-fade-top-to-bottom',
		    	showTop: true
		    }
	    }, {
	      path: '/music/rank/detail',
	      name: 'music/rank/detail',
	      component: resolve => {
		      require(['@/views/music/children/music_rank_detail.vue'], resolve)
		    },
		    meta: {
		    	title: '排行榜',
		    	aniName: 'move-fade-top-to-bottom'
		    }
	    }, {
	      path: '/music/sheet',
	      name: 'music/sheet',
	      component: resolve => {
		      require(['@/views/music/children/music_sheet.vue'], resolve)
		    },
		    meta: {
		    	title: '歌单',
		    	aniName: 'move-fade-top-to-bottom'
		    }
	    }
    ]
  }
]
