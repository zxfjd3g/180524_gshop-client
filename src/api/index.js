/*
包含n个接口请求函数的模块
 */

import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax('/api/position/'+geohash)

// 2. 获取食品分类列表
export const reqFoodCategorys = () => ajax('/api/index_category')

// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax('/api/shops', {latitude, longitude})

/**
 * 4. 账号密码登录
 */
export const reqPwdLogin = ({name, pwd, captcha}) => ajax('/api/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax('/api/sendcode', {phone})

/**
 * 手机号验证码登录
 */
export const reqSmsLogin = (phone, code) => ajax('/api/login_sms', {phone, code}, 'POST')

/**
 * 获取用户信息(根据会话)
 */
export const reqUser = () => ajax('/api/userinfo')

