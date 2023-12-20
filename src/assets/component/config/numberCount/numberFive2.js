export default {
  width: 750,
  height: 275,
  left: 0,
  top: 0,
  name: "数值五",
  show: true,
  lock: true,
  worksheetId: "szwzj",
  series: {
    type: "",
  },
  sourceType: "静态",
  data: [
    {
      "name": "数值一",
      "camera_info": {
        "total": 4,
        "online": 4
      }
    },
    {
      "name": "数值二",
      "camera_info": {
        "total": 0,
        "online": 0
      },
    },
    {
      "name": "数值三",
      "camera_info": {
        "total": 0,
        "online": 0
      },
    },
    {
      "name": "数值四",
      "camera_info": {
        "total": 0,
        "online": 0
      },

    },
    {
      "name": "数值五",
      "camera_info": {
        "total": 0,
        "online": 0
      },
    },
    {
      "name": "数值六",
      "camera_list": [],
      "camera_info": {
        "total": 0,
        "online": 0
      }
    },
    {
      "name": "数值七",
      "camera_info": {
        "total": 0,
        "online": 0
      }
    },

    {

      "name": "数值八",
      "camera_info": {
        "total": 0,
        "online": 0
      },
    }

  ],
  contain: {
    width: 160,
    height: 220,
    contain:'/',
    marginRight: 10,
    arrangeNum: 4,
    scroll: true,
    borderColor: "#63FFCE",
    time: 10,
    show: true, //背景图
    background: require("@/assets/component/img/camera_list.png"),
    backgroundColor: "",
  },
  textTitle: {
    show: true,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
    marginTop: 5,
  },
  txtRowOne: {
    show: true,
    color: "rgb(154,255,245)",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
    marginTop: 15,
  },
  txtRowtwo: {
    show: true,
    // height:40,
    color: "#fff",
    colorLeft: "rgb(154,255,245)",
    colorRight: "#fff",
    fontSize: 18,
    fontSizeLeft: 16,
    fontSizeRight: 16,
    marginTop: 15,
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
  },
  txtRowthree: {
    show: true,
    color: "#fff",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
  },
  txtRowImg: {
    show: true,
    width: 77,
    height: 77,
    marginTop: 10,
    marginLeft: 40,
  },
  txtRowImgs: [
    {
      background: require("@/assets/component/img/icon1.png"),
    },
    {
      background: require("@/assets/component/img/icon1.png"),
    },
    {
      background: require("@/assets/component/img/icon1.png"),
    },
    {
      background: require("@/assets/component/img/icon1.png"),
    },
    {
      background: require("@/assets/component/img/icon1.png"),
    },
  ],
};
