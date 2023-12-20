/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-22 16:29:45
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 13:22:43
 */
export default {
  width: 500,
  height: 200,
  left: 100,
  top: 100,
  name: '图层控制框',
  show: true,
  isShowModule: true,
  lock: true,
  box: {
    width: 200,
    height: 40,
    page_name: ''
  },
  search: {
    input: '',
    show: true,
    placeholder: '请输入',
    backgroundColor: 'rgba(29, 92, 180, 0.6)',
    fontColor: '#fff',
    fontSize: 16,
    width: 300,
    height: 30,
    searchField: '全局搜索'
  },
  label: {
    columns: 2,
    width: 150,
    // height: 30,
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0
  },
  icon: {
    backgroundUrl: require('../../../assets/image/img/map/layerControl/3.png'),
    width: 25,
    height: 25
  },
  sourceType: '静态',
  czmObj: {},
  data: [
    {
      sort: 1,
      rowid: '909da2c3-2a2e-40b2-a369-109b62c41097',
      name: '选择框1',
      default_icon: "https://img1.baidu.com/it/u=1716141035,159943263&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      is_selected: 1
    },
    {
      sort: 2,
      rowid: '909da2c3-2a2e-40b2-a369-109b62c41092',
      name: '选择框2',
      default_icon: "https://img1.baidu.com/it/u=1716141035,159943263&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      is_selected: 1
    },
    {
      sort: 3,
      rowid: '909da2c3-2a2e-40b2-a369-109b62c41093',
      name: '选择框3',
      default_icon: "https://img1.baidu.com/it/u=1716141035,159943263&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      is_selected: 1
    },
    {
      sort: 4,
      rowid: '909da2c3-2a2e-40b2-a369-109b62c41094',
      name: '选择框4',
      default_icon: "https://img1.baidu.com/it/u=1716141035,159943263&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      is_selected: 0
    },
    {
      sort: 5,
      rowid: '909da2c3-2a2e-40b2-a369-109b62c41095',
      name: '选择框5',
      default_icon: "https://img1.baidu.com/it/u=1716141035,159943263&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      is_selected: 0
    },
  ],
  api: '',
  requestType: "GET",
  requestParams: {
    account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
    page_name: '大经济'
  }
}