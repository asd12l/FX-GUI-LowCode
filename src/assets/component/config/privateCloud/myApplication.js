export default {
    width: 800,
    height: 280,
    left: 0,
    top: 0,
    name:'我的应用',
    worksheetId:'jczx',
    sourceType: "静态",
    data: [
      {
        title: "人员管理",
        subTitle: '50',
        link:'',
      },
      {
        title: "设备管理",
        subTitle: '50',
        link:'',
      },
      {
        title: "AI配置",
        subTitle: '50',
        link:'',
      },
      {
        title: "告警中心",
        subTitle: '50',
        link:'',
      },
      {
        title: "业务流程",
        subTitle: '50',
        link:'',
      },
      {
        title: "全要素",
        subTitle: '50',
        link:'',
      },
      {
        title: "工贸区数字化应用",
        subTitle: '50',
        link:'',
      },
      {
        title: "添加应用",
        subTitle: "",
        link: "",
      }
    ],
    box:{
        imgShow:false,//背景图
        iconShow:true,//图标是否展示
        hoverShow:true,//鼠标滑过样式是否展示
        addShow:true,//是否展示添加应用
        width:150,
        height:120,
        marginRight:50,
        marginBottom:10,
        borderRadius:10,
        backgroundColor:'rgba(248, 249, 251, 0.1)', 
        background:require("@/assets/image/common/anbjt.png"),
        style:[
            {
                backgroundColor:'rgba(0, 181, 120, 0)' , 
                color:'#2879FF',
                background:require("@/assets/image/common/1-1.png"),
                src: require("@/assets/image/common/ai1.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' ,  
                color:'#FF8200',
                background:require("@/assets/image/common/1-2.png"),
                src: require("@/assets/image/common/ai2.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' ,  
                color:"#2879FF",
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/ai3.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' , 
                color:"#00B564", 
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/ai1.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' ,  
                color:"#FF8200", 
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/ai1.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' , 
                color:"#00B564", 
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/ai1.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' ,  
                color:"#FF8200", 
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/ai1.png"), 
            },
            {
              backgroundColor: "rgba(255, 143, 31, 0)",
              color: "#4B5F88",
              background: require("@/assets/image/common/1-2.png"),
              src: require("@/assets/image/common/add.png"),
            }
        ]
    },
    iconStyle:{
      width:68,
      height:68,
      left:40,
      top: 15,
    },
    iconHoverStyle:{
        width:68,
        height:68,
        left:40,
        top: 8,
      },
    textStyle:{
        width:150,
        // height:25,
        marginTop:90,
        marginLeft:0,
        color: "#666666",
        fontSize: 16,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'center',
        fontStyle: "normal", //'italic' 倾斜
    },
    textHoverStyle:{
        width:150,
        // height:25,
        marginTop:80,
        marginLeft:0,
        color: "rgba(40, 121, 255, 1)",
        fontSize: 16,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'center',
        fontStyle: "normal", //'italic' 倾斜
    },
    subText:{
        show:false,
        fontColor:true,
        width:90,
        // height:40,
        txtNum:1,
        color: "#4B5F88",
        fontSize: 28,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'bold',
        textAlign:'left',
        marginTop:12,
        marginLeft:110,
        fontStyle: "normal", //'italic' 倾斜
    }
  };
  