import Vue from 'vue'
import Router from 'vue-router'
//import music from './music'
import new_music from './new_music'
Vue.use(Router)
const router = new Router({
  routes: [
//  ...music,
    ...new_music
  ]
})

router.beforeEach((to, from, next) => {
	let { title } = to.meta;
	document.title = title;
	next();
});

export default router;
