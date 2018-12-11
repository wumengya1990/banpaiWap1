import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    rightLayerEstate: false,
    token: '',
    rootUrl: 'https://localhost:44336'
  },
  mutations: {
    switch_dialog(state) { //这里的state对应着上面这个state
      state.rightLayerEstate = state.rightLayerEstate ? false : true;
      //你还可以在这里执行其他的操作改变state
    },
    saveToken(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data); //就是这里，保存到了 localStorage 中
    }
  },
  actions: {

  }
})

export default store;
