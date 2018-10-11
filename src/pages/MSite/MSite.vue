<template>
  <section class="msite">
    <!--首页头部-->
    <TopHeader :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </TopHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>

      <ShopList/>
    </div>
  </section>
</template>
<script>
  import Swiper from 'swiper'
  import {mapState} from 'vuex'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {

    data () {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },

    mounted () {
      // 异步获取商家列表
      this.$store.dispatch('getShops')
      // 异步获取商品分类列表
      this.$store.dispatch('getCategorys')


    },

    computed: {
      ...mapState(['address', 'categorys']),

      // 产生一个二维数组, 小数组中元素的最大个数为8
      categorysArr () {
        const {categorys} = this
        const arr = [] // 二维数组
        let smallArr = [] // 小数组

        // 遍历categorys
        categorys.forEach(c => {

          // 当小数组为空数组时, 将小数组保存到大数组
          if(smallArr.length===0) {
            arr.push(smallArr)
          }

          // 将当前分类对象保存到小数组
          smallArr.push(c)

          // 一旦小数组满了, 准备一个新的小数组
          if(smallArr.length===8) {
            smallArr = []
          }
        })

        return arr
      }
    },

    watch: {
      // 注意: 状态数据变化后, 更新对应的界面是异步进行的
      categorys (value) { // categorys状态数据更新了立即

        /*setTimeout(() => {
          // 初始化列表显示之后执行
          new Swiper('.swiper-container', {
            loop: true, // 循环模式
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        }, 200)*/

        // 必须在状态数据更新之后执行
        this.$nextTick(() => { // 回调函数在界面更新之后立即执行
          // 初始化列表显示之后执行
          new Swiper('.swiper-container', {
            loop: true, // 循环模式
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },

    components: {
      ShopList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>