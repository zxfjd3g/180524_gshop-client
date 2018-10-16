/*
自定义过滤器的模块
 */
import Vue from 'vue'
import moment from 'moment'

// 定义全局过滤器(处理日期)
Vue.filter('date-format', function (value, format='YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(format)
})
