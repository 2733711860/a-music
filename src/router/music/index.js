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
		    	mask: true // 是否需要灰色背景
		    }
	    }, {
	      path: '/music/lyric',
	      name: 'music/lyric',
	      component: resolve => {
		      require(['@/views/music/children/music_lyric.vue'], resolve)
		    },
		    meta: {
		    	title: '播放页面',
		    	mask: false // 是否需要灰色背景
		    }
	    }
    ]
  }
]
