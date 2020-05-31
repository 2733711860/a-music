export default [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    component: resolve => { require(['@/views/music/music.vue'], resolve) },
    redirect: '/music/list',
    children: [
	    {
	      path: '/music/list',
	      name: 'music/list',
	      component: resolve => {
		      require(['@/views/music/children/music_list.vue'], resolve)
		    },
		    meta: {
		    	title: '播放列表',
		    	aniName: 'move-fade-top-to-bottom',
		    	showTop: true
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
	    }
    ]
  }
]
