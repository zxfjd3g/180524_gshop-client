/*
包含n个用于直接更新状态数据方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'

export default {

  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER] (state, {user}) {
    state.user = user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(food.count) {
      food.count++
    } else { // 第一次增加, 没有count属性
      // 给food添加一个新的属性count, 值为1
      // food.count = 1   // 界面不会更新, 因为新添加的属性, 没有数据绑定
      Vue.set( food, 'count', 1) // 新添加的属性有数据绑定 ==>界面会更新
      // 将新的food添加到购物车中
      state.cartFoods.push(food)
    }

  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count) {
      food.count--
      // 如果减为0, 需要将food从购物车中移除
      if(food.count===0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }

  },
}



/*
1. 2个引用变量指向同个对象, 通过一个引用变量改变对象内部的数据, 另一个引用变量看到的新的
2. 2个引用变量指向同个对象, 让一个引用变量指向一个新的对象, 另一个引用变量看到的还是原来的对象
 */
/*

const a = {m: 1}
const b = a
a.m++
console.log(b.m) // 2

let a = {m: 1}
let b = a
a = {m: 2}
console.log(b.m) // 1

function fn(a) {
  a = {m: 3}
  // a.m = 4
}
fn(b)
console.log(b.m) // 1
*/
