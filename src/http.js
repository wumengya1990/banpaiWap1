import router from './router'
import axios from 'axios'
// 配置API接口地址
var nodeEnv = process.env.NODE_ENV;
var root = getApiUrl();


//配置文件读取
function GetApiFromConfig() {
  let that = this;
  let url = axios.get(process.env.Config_Path).then((result) => {
    localStorage.setItem('bkPCUrl', result.data.bkPCUrl);
    // that.$store.commit("saveApiUrl", result.data.ApiUrl); //保存 ApiUrl
    localStorage.setItem('ApiUrl', result.data.ApiUrl);
    console.log(localStorage.getItem('bkPCUrl'));
    console.log(localStorage.getItem('ApiUrl'));
    return result.data.ApiUrl;
  }).catch((error) => {
    console.log(error)
    return process.env.API_ROOT;
  });
  console.log("cfgUrl:" + url);
  return url;
}

//获取API接口地址
function getApiUrl() {
  if (nodeEnv === 'production') { //生产环境
    if (window.localStorage.ApiUrl != "" && window.localStorage.ApiUrl != undefined) {
      let apiUrl = window.localStorage.ApiUrl;
      console.log("读取localStorage中的api:" + apiUrl);
      return apiUrl;
    } else {
      //获取配置文件中的地址
      GetApiFromConfig().then((res) => {
        let apiUrl = res;
        console.log("读取配置中的api:" + apiUrl);
        return res;
      });
    }
  } else { //开发环境直接读取
    let apiUrl = process.env.API_ROOT;
    console.log("开发环境直接读取api:" + apiUrl);
    GetApiFromConfig();
    return apiUrl;
  }
}

// 引用axios
// var axios = require("axios");
// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (window.localStorage.Token) { //store.state.token 获取不到值
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer " + window.localStorage.Token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.localStorage.setItem("Token", "");
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/
//接口访问
function apiAxios(method, url, params, success, failure) {
  if (params) {
    params = filterNull(params);
  }
  if (root == undefined || root == "") {
    root = window.localStorage.ApiUrl;
  }
  axios({
      method: method,
      url: url,
      data: method === "POST" || method === "PUT" ? params : null,
      params: method === "GET" || method === "DELETE" ? params : null,
      baseURL: root,
      // `headers` 是即将被发送的自定义请求头
      withCredentials: false
    })
    .then(res => {
      success(res.data);
    })
    .catch(err => {
      if (failure == undefined) {
        if (err.hasOwnProperty("response")) {
          let res = err.response;
          if (err.hasOwnProperty("status")) {
            console.log("Api接口错误, HTTP CODE: " + res.status);
          }
          console.log(res);
        } else {
          console.log(err);
        }
      } else {
        failure(err);
      }
    });
}
//上传文件
function axiosFile(url, params, success, failure) {
  let formParam = new FormData();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      formParam.append(key, params[key]);
    }
  }
  axios({
      method: 'post',
      url: url,
      data: formParam,
      baseURL: root,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: false
    })
    .then(res => {
      success(res.data);
    })
    .catch(err => {
      if (failure == undefined) {
        if (err.hasOwnProperty("response")) {
          let res = err.response;
          if (err.hasOwnProperty("status")) {
            console.log("Api接口错误, HTTP CODE: " + res.status);
          }
          console.log(res);
        } else {
          console.log(err);
        }
      } else {
        failure(err);
      }
    });
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios("GET", url, params, success, failure);
  },
  post: function (url, params, success, failure) {
    return apiAxios("POST", url, params, success, failure);
  },
  put: function (url, params, success, failure) {
    return apiAxios("PUT", url, params, success, failure);
  },
  delete: function (url, params, success, failure) {
    return apiAxios("DELETE", url, params, success, failure);
  },
  uploadFile: function (url, params, success, failure) {
    return axiosFile(url, params, success, failure);
  }
};
