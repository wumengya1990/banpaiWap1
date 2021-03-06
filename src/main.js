// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index'
import router from './router'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui'
import Mint from 'mint-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import './assets/css/main.css'
import store from "./vuex/store.js"
import VueScroller from 'vue-scroller'
require('./assets/fonts/iconfont.css')
import 'vant/lib/index.css';



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Mint);
Vue.use(Vant);
Vue.use(VueScroller);

Vue.prototype.$axios = axios

// 处理ajax请求
// 引用API文件
import api from "./http.js";
// 将API方法绑定到全局
Vue.prototype.$api = api;

//清空字符串前后的空格
String.prototype.Trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}
import {
  Notify,
  Toast
} from 'vant';

//使用mint-ui右侧滑动显示按钮组件
import { CellSwipe } from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe);


//判断是否为空
let isNullOrEmpty = function (value) {
  if (value == null || value == undefined || value.toString().Trim() == "") {
    return true;
  } else {
    return false;
  }
}
//判断是否为空或0
let isNullOrZero = function (value) {
  if (value == null || value == undefined || value.toString().Trim() == "" || value == 0) {
    return true;
  } else {
    return false; 
  }
}
//加载loading数据
let vload = function (msg, timeOut) {
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

// 注册公共，并放置相关属性
let bus = new Vue();
Vue.prototype.bus = bus;
// Vue.prototype.devId = process.env.NODE_ENV==='production'?window.jsobj.getDevId():'b622dc9bce3b4100'

//vue初始化
let initVue = function () {
  new Vue({
    el: '#index',
    router,
    store,
    components: {
      index
    },
    mounted() {
      console.log("开始初始化Vue");
      this.$store.commit("saveApiUrl", Vue.prototype.apiUrl); //保存 ApiUrl
    },
    template: '<index/>'
  });
}

//app初始化(首先读取配置信息)
let initApp = function () {
  console.log("开始初始化app");
  let nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === 'production') { //生产环境
    if (window.localStorage.ApiUrl != "" && window.localStorage.ApiUrl != undefined) {
      let apiUrl = window.localStorage.ApiUrl;
      console.log("读取localStorage中的api:" + apiUrl);
      Vue.prototype.apiUrl = apiUrl;
      initVue();
    } else {
      //获取配置文件中的地址
      axios.get('/static/appConfig.json').then((res) => {
        let apiUrl = res.data.ApiUrl;
        console.log("读取配置文件中的api:" + apiUrl);
        Vue.prototype.apiUrl = apiUrl;
        initVue();
      }).catch((err) => {
        console.log("配置文件读取失败:" + err);
        let apiUrl = process.env.API_ROOT;
        console.log("读取process中的api:" + apiUrl);
        Vue.prototype.apiUrl = apiUrl;
        initVue();
      });
    }
  } else { //开发环境直接读取
    let apiUrl = process.env.API_ROOT;
    console.log("开发环境直接读取process中的api:" + apiUrl);
    Vue.prototype.apiUrl = apiUrl;
    initVue();
  }
}

initApp();
