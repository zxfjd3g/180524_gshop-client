<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="typesUl">
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index===currentIndex}" @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
  /*
  1. 滑动右侧列表, 左侧列表的当前分类同步变化
  2. 点击左侧某个分类项, 右侧列表滑动到对应位置
  3. 完善1的功能: 使用左侧当前分类总是可见


  currentIndex: 当前分类的下标
     右侧列表Y轴方向滑动的坐标: scrollY
     右侧分类li的top值组成的数据: tops

  tops: 列表显示之后统计, 后面不会再变化了
  scrollY: 在右侧滑动过程中不断更新
   */

  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import Food from 'components/Food/Food.vue'

  export default {
    data() {
      return {
        scrollY: 0, // 右侧列表Y轴方向滑动的坐标
        tops: [], // 右侧分类li的top值组成的数据
        food: {}, // 当前需要显示的food
      }
    },

    computed: {
      ...mapState(['goods']),

      // 当前分类的下标
      currentIndex () {
        const {scrollY, tops} = this

        // scrollY大于或等于当前top && 小于下一个top
        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])

        if(this.index!=index) {// 只有当当前分类下标发生改变才去执行
          this.index = index
          // 让右侧滚动到index所对应的位置
          if(this.leftScroll) {
            this.leftScroll.scrollToElement(this.$refs.typesUl.children[index], 200)
          }
        }
        return index

      }
    },

    mounted() {
      this.$store.dispatch('getGoods', () => { // 状态数据变化了
        this.$nextTick(() => { // 列表界面更新显示后执行

          // 初始化滚动对象
          this._initScroll()
          // 初始化tops数据
          this._initTops()

        })
      })
    },

    methods: {
      _initScroll () {
        // 左侧列表滚动对象
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true // 会派发点击事件
        })
        // 右侧列表滚动对象
        this.rightScroll = new BScroll('.foods-wrapper', {
          click: true,
          probeType: 1  // 非实时回调, 非触摸滑动不会回调
        })

        // 绑定scroll的监听
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', x, y)

          // 更新scrollY
          this.scrollY = Math.abs(y)
        })

        // 绑定滚动结束的监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', x, y)

          // 更新scrollY
          this.scrollY = Math.abs(y)
        })

      },

      _initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        // 得到所有分类li的伪数组
        const lis = this.$refs.foodsUl.querySelectorAll('.food-list-hook')
        lis.forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 更新状态
        this.tops = tops
        console.log('tops=', tops)
      },

      // 选择左侧某个分类项
      selectItem (index) {
        // 得到index对应的目标位置的y坐标
        const y = -this.tops[index]
        // 立即更新scrollY
        this.scrollY = -y
        // 让右侧列表滚动到此处
        this.rightScroll.scrollTo(0, y, 300)
      },

      // 显示food详情
      showFood (food) {
        // 更新food数据
        this.food = food
        // 显示food组件界面
        /*在父组件中得到子组件对象, 并调用它的方法*/
        this.$refs.food.toggleShow()
      }
    },

    components: {
      Food
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
