/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-29 16:40:27
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 16:32:35
 */
export default {
  name: '评优卡片',
  width: 460,
  height: 130,
  left: 100,
  top: 100,
  show: true,
  lock: true,
  sourceType: '静态',
  box: {
    autoplay: false,
    isScroll: false,
    direction: 'row',
    width: 225,
    height: 120,
    multiple: false,
    arrangeNum: 3,
    backgroundColor: 'rgba(244,194,124,.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    selectedPic: '',
    showPic: false
  },
  pic: {
    width: 88,
    height: 120,
    selfAdaption: false
  },
  first: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0
  },
  second: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#eb812a',
    fontSize: 12,
    fontWeight: 'normal',
    letterSpacing: 0,
    firstPic: true,
    selectedPic: require('../../../assets/image/img/map/progressBar/4.png'),
    text: '荣誉'
  },
  third: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#eb812a',
    fontSize: 12,
    fontWeight: 'normal',
    letterSpacing: 0
  },
  data: [
    {
      description: "5亩",
      name: "油菜",
      text: '',
      photo: "https://img1.baidu.com/it/u=3347154019,3451816377&fm=253&fmt=auto&app=138&f=JPEG?w=783&h=500",
      rowid: "84ad7f0b-7316-431e-bc42-8e38bdbcfc9a",
      tags: ['果园', '粮田']
    },
    {
      description: "3.4亩",
      name: "蚕豆",
      text: '',
      photo: "https://img2.baidu.com/it/u=800378504,1094516680&fm=253&fmt=auto&app=138&f=PNG?w=749&h=498",
      rowid: "e4150075-0713-4f89-b006-3dc1fc8f07fe",
      tags: '果园',
    }
  ],
  api: '',
  requestType: "GET",
  requestParams: {
    account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  },
  tagsStyle: {
    show: false,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "left",
    marginTop: 12,
    fontFamily: "Microsoft YaHei",
    color: "#EBCD3D",
    borderRadius: 2,
    backgroundColor: "rgba(235, 205, 61, 0.102)",
    colorArr: [
      {
        txt: '粮田',
        color: 'rgba(83, 195, 255, 1)',
        background: 'rgba(83, 195, 255, 0.102)'
      }
    ]
  },
}