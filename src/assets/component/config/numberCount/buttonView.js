export default {
    width:220,
    height: 150,
    left: 0,
    top: 0,
    name:'按钮-切换视角',
    show: true,
    sourceType: '静态',
    worksheetId:'buttonView',
    angleViewID:'angleView',
    data: [
      {
          name:'视角名称1',
          rowid:1
      },{
          name:'视角名称2',
          rowid:2
      },{
        name:'视角名称3',
        rowid:3
    },{
        name:'视角名称4',
        rowid:4
    }
   ],
    buttonStyle:{
       hoverShow:true,
       imgShow:true,
       txtShow:false,
       txt:'社区管理',
       color:'#fff',
       fontSize:24,
       lineHeight:65,
       fontFamily:'Microsoft YaHei',
    },
    hoverStyle:{
      txt:'视角',
      color:'#fff',
      fontSize:14,
      lineHeight:30,
      width:80,
      height: 30,
      bottom:160,
      fontFamily:'Microsoft YaHei',
      background: require("@/assets/image/xiaokunshan/img1.png"),
    },
    //下拉框样式
    optionStyle:{
      optionShow:true,
       width:150,
       height: 240,
       background:'rgba(14, 39, 70, 0.95)',
       borderColor:'#1b7ef2',
       color:'#fff',
       fontSize:'14',
       bottom:160,
       src: require("@/assets/image/xiaokunshan/icon4.png"),
       span:{
        height: 30,
        textIndent:5,
        background: 'rgba(69, 162, 255, 0.3)',
        backgroundClick:'#1b7ef2',
        srcWidth:15,
        srcHeight:15,
        marginLeft:5,
        marginRight:5
       }
    },
    text:{
        width:390,
        height:55,
        color:'#ffe6c3',
        fontSize:20,
        textIndent:54,
        lineHeight:55,
        isBacagroundImg:true,
        marginBottom:5,
    },
    backgroundImg:{
        width:89,
        height: 76,
        background:require("@/assets/image/xiaokunshan/view.png"),
    },
    backgroundActive:{
        width:110,
        height: 104,
        background:require("@/assets/image/xiaokunshan/view-active.png"),
    },
    //添加视角文字样式
    addView:{
        txt:'+ 添加视角',
        height:30,
        color: '#9ECAFF',
        background: 'rgba(36, 156, 255, 0.102)',
        fontSize: 12,
        fontfamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        textAlign:'center',
    },
    //输入框样式
    input:{
        height:30,
        background: 'rgba(36, 156, 255, 0.1)',
        borderColor:'#249CFF',
        color:'#fff'
    }
  };
  