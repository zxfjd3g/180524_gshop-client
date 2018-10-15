import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import TopHeader from './components/TopHeader/TopHeader.vue'
import CartControl from './components/CartControl/CartControl.vue'

import 'swiper/dist/css/swiper.min.css'
import './mock/mockServer'


// 注册全局组件
Vue.component('TopHeader', TopHeader)
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button) // mt-button

/* eslint-disable no-new */
new Vue({
  el: '#app',

  /* components: { App },
   template: '<App/>'
   */
  /*render: function (createElement) {  // 函数返回的标签会被渲染到el中
    return createElement(App)   // '<App/>'
  }*/
  render: h => h(App),

  router,
  store,
})
