/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-20 16:46:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 11:37:05
 */
export default {
  name: '排名进度条',
  width: 430,
  height: 300,
  left: 100,
  top: 100,
  show: true,
  lock: true,
  box: {
    showType: 1,
    arrangeNum: 1,
    name: '文本名称',
    isScroll: false,
    padding: '5px'
  },
  line: {
    height: 30,
    marginRight: 10
  },
  topFont: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 50,
    color: '#EBCD3D',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    marginRight: 10,
  },
  title: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 90,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    marginRight: 10,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  percent: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 50,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    marginRight: 10,
  },
  num: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 40,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    marginRight: 10,
  },
  unit: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    width: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    marginRight: 10,
  },
  progressBar: {
    display: 'block',
    width: 100,
    height: 10,
    marginRight: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(172, 206, 255, 0.1)',
  },
  percentBar: {
    backgroundFront: 'rgba(113, 205, 255, 1)',
    backgroundBehind: 'rgba(27, 126, 242, 1)',
    icon: '',
    iconWidth: 20,
    iconHeight: 20,
    borderRadius: 10,
    top: -5
  },
  sourceType: '静态',
  data: [
    {
      name: '1月',
      per: '80',
      value: 1200,
      unit: '件',
      ranking: 1
    },
    {
      name: '2月',
      per: '80',
      value: 1200,
      unit: '件',
      ranking: 2
    },
    {
      name: '3月',
      per: '80',
      value: 1200,
      unit: '件',
      ranking: 3
    },
    {
      name: '4月',
      per: '80',
      value: 1200,
      unit: '件',
      ranking: 4
    },
    {
      name: '5月',
      per: '80',
      value: 1200,
      unit: '件',
      ranking: 5
    }

  ],
  api: '',
  requestType: "GET",
  requestParams: {
    account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
    type: '1'
  },
  eventAssociatedComponentIds: [],
  eventType: "click",
  movement: "showAndHidden",
  eventList: [{ eventType: "click" }],
  hoverEventList: [],
  clickEventList: [],
}