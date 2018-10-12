/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'  // 得到是js对象

/*mock提供goods数据接口*/
Mock.mock('/goods',  {code: 0, data: data.goods})
/*mock提供ratings数据接口*/
Mock.mock('/ratings',  {code: 0, data: data.ratings})
/*mock提供info数据接口*/
Mock.mock('/info',  {code: 0, data: data.info})

// 向外暴露什么?  不需要
console.log('mockserver 运行了')
