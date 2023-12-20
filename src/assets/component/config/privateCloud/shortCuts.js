export default {
    width: 600,
    height: 115,
    left: 0,
    top: 0,
    name:'快捷入口',
    worksheetId:'jczx',
    sourceType: "静态",
    data: [
      {
        title: "摄像头列表",
        subTitle: '这是简介内容这是简介内容这是简介内容这是简介内容',
        link:'',
      },
      {
        title: "告警中心",
        subTitle: '这是简介内容这是简介内容这是简介内容这是简介内容',
        link:'',
      },
      {
        title: "人员管理",
        subTitle: '这是简介内容这是简介内容这是简介内容这是简介内容',
        link:'',
      },
      {
        title: "房屋管理",
        subTitle: '这是简介内容这是简介内容这是简介内容这是简介内容',
        link:'',
      },
      {
        title: "设备管理",
        subTitle: '这是简介内容这是简介内容这是简介内容这是简介内容',
        link:'',
      },
      {
        title: "任务管理",
        subTitle: '这是简介内容这是简介内容这是简介内容这是简介内容',
        link:'',
      },
    ],
    box:{
        imgShow:false,//背景图
        iconShow:true,//图标是否展示
        hoverShow:false,
        addShow:false,//是否展示添加应用
        width:180,
        height:46,
        marginRight:20,
        marginBottom:20,
        borderRadius:4,
        backgroundColor:'rgba(40, 121, 255, 0)', 
          background:require("@/assets/image/common/anbjt.png"),
        style:[
            {
                backgroundColor:'rgba(40, 121, 255, 0.05)' , 
                color: "#4B5F88", 
                background:require("@/assets/image/common/1-1.png"),
                src: require("@/assets/image/common/privateCloud1.png"), 
            },
            {
                backgroundColor:'rgba(255, 143, 31, 0.05)' ,  
                color: "#4B5F88",
                background:require("@/assets/image/common/1-2.png"),
                src: require("@/assets/image/common/privateCloud2.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0.05)' ,  
                color: "#4B5F88",
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/privateCloud3.png"), 
            },
            {
                backgroundColor:'rgba(18, 124, 255, 0.05)' ,  
                color: "#4B5F88",
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/privateCloud4.png"), 
            },
            {
                backgroundColor:'rgba(40, 121, 255, 0.05)' ,  
                color: "#4B5F88",
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/privateCloud5.png"), 
            },
            {
                backgroundColor:'rgba(250, 81, 81, 0.05)' ,  
                color: "#4B5F88",
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/privateCloud6.png"), 
            }
        ]
    },
    iconStyle:{
      width:30,
      height:30,
      left:10,
      top:8,
    },
    iconHoverStyle:{
        width:30,
        height:30,
        left:10,
        top:8,
      },
    textStyle:{
        width:120,
        // height:25,
        marginTop:12,
        marginLeft:50,
        color: "#1A1A1A",
        fontSize: 16,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'left',
        fontStyle: "normal", //'italic' 倾斜
    },
    textHoverStyle:{
        width:120,
        // height:25,
        marginTop:12,
        marginLeft:50,
        color: "#1A1A1A",
        fontSize: 16,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'left',
        fontStyle: "normal", //'italic' 倾斜
    },
    subText:{
        show:false,
        sourceType: "静态",
        fontColor:false,
        width:210,
        // height:40,
        color: "#4B5F88",
        fontSize: 14,
        txtNum:1,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'left',
        marginTop:12,
        marginLeft:20,
        fontStyle: "normal", //'italic' 倾斜
    }
  };
  