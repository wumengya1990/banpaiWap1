// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui'
import Mint from 'mint-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import './assets/css/main.css'
// import './../static/css/main.css'
import axios from 'axios'
import store from "./vuex/store.js"
import VueScroller from 'vue-scroller'
require('./assets/fonts/iconfont.css')
// import './../static/fonts/iconfont.css'



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Mint);
Vue.use(Vant);
Vue.use(VueScroller);

// 处理ajax请求
// axios.defaults.baseURL = process.env.NODE_ENV==='production'?'':'/api/api'
Vue.prototype.$ajax = axios
// 引用API文件
import api from "./http.js";
// 将API方法绑定到全局
Vue.prototype.$api = api;

import {
  Notify,
  Toast
} from 'vant';
//判断是否为空
var isNullOrEmpty = function (value) {
  if (value == null || value == undefined || value == "") {
    return true;
  } else {
    return false;
  }
}
//判断是否为空或0
var isNullOrZero = function (value) {
  if (value == null || value == undefined || value == "" || value == 0) {
    return true;
  } else {
    return false;
  }
}
//加载loading数据
var vload = function (msg, timeOut) {
  let defMsg = "加载中...";
  if (!isNullOrEmpty(msg)) {
    defMsg = msg;
  }
  let defTimeOut = 0;
  if (!isNullOrEmpty(timeOut)) {
    defTimeOut = timeOut;
  }
  const toast = Toast.loading({
    duration: defTimeOut, // 持续展示 toast
    mask: true, // 是否显示背景蒙层
    message: defMsg
  });
  return toast;
}
Vue.prototype.$isNull = isNullOrEmpty;
Vue.prototype.$isZero = isNullOrZero;
Vue.prototype.$vloading = vload;
//全局通知方法
Vue.prototype.$vnotify = function (msg, timeOut, bgColor, color) {
  if (isNullOrEmpty(msg)) {
    return;
  }
  let defTimeOut = 3000;
  if (!isNullOrEmpty(timeOut)) {
    defTimeOut = timeOut;
  }
  let defBgColor = "#1989fa";
  if (!isNullOrEmpty(bgColor)) {
    defBgColor = bgColor;
  }
  let defColor = "#fff";
  if (!isNullOrEmpty(color)) {
    defColor = color;
  }
  Notify({
    message: msg,
    duration: defTimeOut,
    color: defColor,
    background: defBgColor
  });
};

//配置文件读取demo
axios.get(process.env.Config_Path).then((result) => {
  localStorage.setItem('bkPCUrl', result.data.bkPCUrl);
  console.log(localStorage.getItem('bkPCUrl'));
}).catch((error) => {
  console.log(error)
});

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
