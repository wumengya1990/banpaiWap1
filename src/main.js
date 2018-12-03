// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index'
import router from './router'
import vuex from 'vuex'
import ElementUI from 'element-ui'
import Mint from 'mint-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import './assets/css/main.css'
import axios from 'axios'
import store from "./vuex/store.js"
require('./assets/fonts/iconfont.css')

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(vuex);
Vue.use(Mint);

// 处理ajax请求
// axios.defaults.baseURL = process.env.NODE_ENV==='production'?'':'/api/api'
Vue.prototype.$ajax = axios
// 引用API文件
import api from "./http.js";
// 将API方法绑定到全局
Vue.prototype.$api = api;


// 注册公共，并放置相关属性
var bus = new Vue();
Vue.prototype.bus = bus;
// Vue.prototype.devId = process.env.NODE_ENV==='production'?window.jsobj.getDevId():'b622dc9bce3b4100'


new Vue({
  el: '#index',
  router,
  store,
  components: {
    index
  },
  template: '<index/>'
})
