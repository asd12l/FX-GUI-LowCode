export default {
    width: 400,
    height: 240,
    left: 0,
    top: 0,
    name:'集成中心',
    worksheetId:'jczx',
    sourceType: "静态",
    data: [
      {
        title: "云端录像",
        subTitle: '点击查看详情点击查看详情点击查看详情点击查看详情点击查看详情点击查看详情点击查看详情',
        link:'',
      },
      {
        title: "国标级联",
        subTitle: '点击查看详情',
        link:'',
      },
      {
        title: "国标配置",
        subTitle: '点击查看详情',
        link:'',
      }
    ],
    box:{
        imgShow:true,//背景图
        iconShow:false,//图标是否展示
        hoverShow:false,
        addShow:false,//是否展示添加应用
        width:184,
        height:115,
        marginRight:12,
        marginBottom:10,
        borderRadius:0,
        backgroundColor:'rgba(40, 121, 255, 0)' ,  
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
            }
        ]
    },
    iconStyle:{
      width:30,
      height:30,
      left:10,
      top:10,
    },
    iconHoverStyle:{
        width:30,
        height:30,
        left:10,
        top:10,
      },
    textStyle:{
        width:120,
        // height:25,
        marginTop:20,
        marginLeft:20,
        color: "#252F42",
        fontSize: 18,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'bold',
        textAlign:'left',
        fontStyle: "normal", //'italic' 倾斜
    },
    textHoverStyle:{
        width:120,
        // height:25,
        marginTop:20,
        marginLeft:20,
        color: "#252F42",
        fontSize: 18,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'bold',
        textAlign:'left',
        fontStyle: "normal", //'italic' 倾斜
    },
    subText:{
        show:true,
        fontColor:true,
        width:140,
        // height:55,
        txtNum:3,
        color: "#4B5F88",
        fontSize: 14,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'left',
        marginTop:12,
        marginLeft:20,
        fontStyle: "normal", //'italic' 倾斜
    }
  };
  