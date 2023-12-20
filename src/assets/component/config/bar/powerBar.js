/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-29 16:40:27
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 11:19:48
 */
export default {
  name: '电量柱状图',
  // width: 500,
  // height: 300,
  // left: 100,
  // top: 100,
  grid: {
    left: 60,
    top: 50,
    right: 70,
    bottom: 40,
  },
  show: true,
  isShowModule: true,
  lock: true,
  scrollNum: 8,
  series: {
    type: 'powerBar',
    barWidth: 20,
    label: {
      show: true,
      color: '#fff',
      fontSize: 18
    }
  },
  data: [
    { name: "星期一", total: "89", satisfied: "42" },
    { name: "星期二", total: "18", satisfied: "12" },
    { name: "星期三", total: "96", satisfied: "76" },
    { name: "星期四", total: "95", satisfied: "31" },
    { name: "星期五", total: "70", satisfied: "58" },
    { name: "星期六", total: "95", satisfied: "31" },
    { name: "星期天", total: "70", satisfied: "58" }
  ],
  api: '',
  requestType: "GET",
  requestParams: {
    account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e'
  }
}