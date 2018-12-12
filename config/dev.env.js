'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/beike"', //本地请求前缀
  Config_Path: '"/api/config"' //开发环境读取配置文件
})
