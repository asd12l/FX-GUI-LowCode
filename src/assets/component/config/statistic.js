/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-20 16:46:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 13:21:23
 */
export default {
  width: 400,
  height: 300,
  left: 100,
  top: 100,
  name: '统计数量',
  show: true,
  lock: true,
  box: {
    isScroll: false,
    direction: 'column',
    width: 300,
    height: 80
  },
  title: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 150,
    height: 30,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    marginRight: 10,
    iconWidth: 20,
    iconHeight: 20,
    iconUrl: require('../../../assets/image/img/map/statistic/2.png')
  },
  num: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 40,
    height: 50,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    iconWidth: 40,
    iconHeight: 40,
    iconUrl: require('../../../assets/image/img/map/statistic/3.png')
  },
  unit: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 90,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
  },
  sourceType: '静态',
  data: [
    {
      name: '1月',
      value: 1200,
      unit: '(单位：件)'
    },
    {
      name: '2月',
      value: 1200,
      unit: '(单位：件)'
    },
    {
      name: '3月',
      value: 1200,
      unit: '(单位：件)'
    },
    {
      name: '4月',
      value: 1200,
      unit: '(单位：件)'
    },
    {
      name: '5月',
      value: 1200,
      unit: '(单位：件)'
    }
  ],
  api: '',
  requestType: "GET",
  requestParams: {
    account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
    page: '大建管'
  }
}