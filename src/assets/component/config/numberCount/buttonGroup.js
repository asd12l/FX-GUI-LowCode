/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-29 16:40:27
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 13:12:26
 */
export default {
  width: 420,
  height: 320,
  left: 0,
  top: 0,
  name: '按钮组',
  show: true,
  lock: true,
  isShowModule: true,
  series: {
    type: '',
  },
  sourceType: '静态',
  worksheetId: 'anzzj',
  data: [
    {
      "rowid": "b157f5cc-f1c4-4c9f-b18c-2d2e7a60d828",
      "name": "按钮1"
    },
    {
      "rowid": "4acd761e-b5ce-42e1-9c89-e3e5c72c1c98",
      "name": "按钮2",
    },
    {
      "rowid": "1c774146-03bb-4c97-85ee-afb7b637181b",
      "name": "按钮3",
    },
    {
      "rowid": "bf8bb588-469f-480b-8654-2fed5c13b876",
      "name": "按钮4",
    },
    {
      "rowid": "b5bb82b8-285e-4648-be42-ec3963bb2a00",
      "name": "按钮5",
    }
  ],
  text: {
    width: 390,
    height: 55,
    color: '#ffe6c3',
    fontSize: 20,
    textIndent: 54,
    lineHeight: 55,
    isBacagroundImg: true,
    marginBottom: 5,
  },
  backgroundImg: {
    background: require("@/assets/component/img/bg.png"),
  },
  backgroundActive: {
    background: require("@/assets/component/img/bg-active.png"),
  },
  backgroundColors: {
    backgroundColor: 'rgba(255,217,164,0.1)',
    borderColor: 'rgba(255,217,164,0.15)',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  backgroundColorsActive: {
    backgroundColor: 'rgba(255,217,164,0.4)',
    borderColor: 'rgba(255,217,164,0.45)',
  },
  txtFamily: {
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "left",
    fontFamily: "Microsoft YaHei",
  },

};
