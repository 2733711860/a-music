import Vue from "vue";
// import "vant/lib/index.css";
import App from "./App.vue";
import router from "./router/index";
// import "@/assets/style/font/iconfont.css";
import "@/assets/style/index.less";
import mixin from "./mixin/index";
import $ from 'jquery';

import "@/components/Vant";
// rem
import "amfe-flexible";

// 接口请求
import {post,get,patch,put} from './api/http.js'
import api from './api'
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$api=api;

import store from './store'; // vuex

Vue.mixin(mixin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
