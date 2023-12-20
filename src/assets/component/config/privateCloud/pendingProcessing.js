export default {
    width: 1300,
    height: 100,
    left: 0,
    top: 0,
    name:'待办事项',
    worksheetId:'jczx',
    sourceType: "静态",
    data: [
      {
        title: "待审批",
        subTitle: '50',
        link:'',
      },
      {
        title: "待查看",
        subTitle: '50',
        link:'',
      },
      {
        title: "我发起的",
        subTitle: '50',
        link:'',
      },
      {
        title: "协作套件",
        subTitle: '50',
        link:'',
      },
      {
        title: "待填写",
        subTitle: '50',
        link:'',
      },
     
    ],
    box:{
        imgShow:false,//背景图
        iconShow:true,//图标是否展示
        hoverShow:false,
        addShow:false,//是否展示添加应用
        width:180,
        height:90,
        marginRight:80,
        marginBottom:10,
        borderRadius:10,
        backgroundColor:'rgba(40, 121, 255, 0)', 
        background:require("@/assets/image/common/anbjt.png"),
        style:[
            {
                backgroundColor:'rgba(0, 181, 120, 0)' , 
                color:'#2879FF',
                background:require("@/assets/image/common/1-1.png"),
                src: require("@/assets/image/common/2-1.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' ,  
                color:'#FF8200',
                background:require("@/assets/image/common/1-2.png"),
                src: require("@/assets/image/common/2-2.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' ,  
                color:"#2879FF",
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/2-3.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' , 
                color:"#00B564", 
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/2-4.png"), 
            },
            {
                backgroundColor:'rgba(0, 181, 120, 0)' ,  
                color:"#FF8200", 
                background:require("@/assets/image/common/1-3.png"),
                src: require("@/assets/image/common/2-5.png"), 
            }
        ]
    },
    iconStyle:{
      width:90,
      height:90,
      left:0,
      top: 0,
    },
    iconHoverStyle:{
        width:90,
        height:90,
        left:0,
        top: 0,
      },
    textStyle:{
        width:90,
        // height:25,
        marginTop:17,
        marginLeft:110,
        color: "#1A1A1A",
        fontSize: 16,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'left',
        fontStyle: "normal", //'italic' 倾斜
    },
        textHoverStyle:{
        width:90,
        // height:25,
        marginTop:17,
        marginLeft:110,
        color: "#1A1A1A",
        fontSize: 16,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'left',
        fontStyle: "normal", //'italic' 倾斜
    },
    subText:{
        show:true,
        fontColor:false,
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
  