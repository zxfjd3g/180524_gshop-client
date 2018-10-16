/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
/*

import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
*/

// 一旦使用import()加载一个模块, 那个模块就会被单独打包
// 配置的组件是一个函数, 只有当请求对应path时才会执行
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'


import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true // 标识需要显示footer
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    },

    {
      path: '/',
      redirect: '/msite'
    },

    {
      path: '/a',
      component: A
    },
    {
      path: '/b',
      component: B,
      children: [
        {
          path: '/b/b1',
          component: B1
        },
        {
          path: '/b/b2',
          component: B2
        },
      ]
    },
  ]
})

// 定义全局前置守卫
  /*
  to: 目标路由对象
  from: 当前路由对象
  next: 用来控制路由跳转函数
   */
router.beforeEach((to, from, next) => {
  console.log('global beforeEach', to, from)
  // 当用户请求的是/b或/a时, 如果没有登陆, 自动跳转到/login
  if(to.path==='/a' || to.path==='/b') {
    if(!Vue.store.state.user._id) {
      return next('/login')
    }
  }

  // 放行
  next()

})

export default router