/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-07 16:10:56
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 15:59:51
 */
export default {
  name: "轮播图",
  width: 830,
  height: 350,
  isShowModule: true,
  left: 100,
  top: 100,
  show: true,
  lock: true,
  sourceType: "静态",
  box: {
    boxWidth: 400,
    boxHeight: 300,
    autoplay: false,
    direction: "horizontal",
    width: 300,
    height: 200,
    backgroundColor: "rgba(255,255,255,0.1)",
    cardNum: 2,
    arrangeNum: 2,
    interval: 5,
    txtWidth: 400,
    txtHeight: 300,
  },
  title: {
    content: "",
    display: "block",
    fontFamily: "微软雅黑",
    fontStyle: "normal",
    textAlign: "left",
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    letterSpacing: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  description: {
    content: "",
    display: "-webkit-box",
    fontFamily: "微软雅黑",
    fontStyle: "normal",
    textAlign: "left",
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    letterSpacing: 0,
    // overflow: "hidden",
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
  },
  data: [
    {
      rowid: 1,
      name: '数据一',
      desc: '---------decsription----------',
      photo: ['https://t7.baidu.com/it/u=860330160,4117395242&fm=193&f=GIF', 'https://t7.baidu.com/it/u=289562621,657690689&fm=193&f=GIF']
    },
    {
      rowid: 2,
      name: '数据二',
      desc: '---------decsription----------',
      photo: ['https://t7.baidu.com/it/u=4127536459,3471889489&fm=193&f=GIF']
    },
    {
      rowid: 3,
      name: '数据三',
      desc: '---------decsription----------',
      photo: ['https://t7.baidu.com/it/u=1340524541,2382325266&fm=193&f=GIF']
    }
  ],
  api: '',
  requestType: "GET",
  requestParams: {
    account_id: "eb71dac7-a4dc-4cbb-9022-251c93acca1e",
  },
  direction: {
    direction: "column",
    width: 380,
    height: "auto",
    txtNum: 3, //控制描述几行出现省略号
  },
  time: {
    content: "发布时间：",
    display: "block",
    fontFamily: "微软雅黑",
    fontStyle: "normal",
    textAlign: "left",
    color: "#ccc",
    fontSize: 18,
    fontWeight: "normal",
    letterSpacing: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
};
