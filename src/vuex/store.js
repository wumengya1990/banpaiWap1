import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    rightLayerEstate: false,
    token: '',
    userRole: 0,
    haveLogin:false,
    apiUrl: window.localStorage.ApiUrl
  },
  mutations: {
    switch_dialog(state) { //这里的state对应着上面这个state
      state.rightLayerEstate = state.rightLayerEstate ? false : true;
      //你还可以在这里执行其他的操作改变state
    },
    saveApiUrl(state, data) {
      state.apiUrl = data;
      window.localStorage.setItem("ApiUrl", data); //就是这里，保存到了 localStorage 中
      console.log("api写入Store与localStorage中：" + data);
    },
    saveToken(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data); //就是这里，保存到了 localStorage 中
      console.log("token写入Store与localStorage中：" + data);
    },
    saveRole(state, data) {
      state.userRole = data;
      window.localStorage.setItem("userRole", data);
      console.log("userRole写入Store与localStorage中：" + data);
    },
    saveLogin(state, data) {
      state.haveLogin = data;
      window.localStorage.setItem("haveLogin", data);
      console.log("userRole写入Store与localStorage中：" + data);
    }
  },
  actions: {

  }
})

export default store;
