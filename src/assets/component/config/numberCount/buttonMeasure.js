export default {
    width:220,
    height: 100,
    left: 0,
    top: 0,
    name:'按钮-测量',
    show: true,
    sourceType: '静态',
    worksheetId:'buttonView',
    data: [
      {
          name:'面积',
          width:15,
          height:15,
          marginLeft:5,
          marginRight:11
      },{
          name:'高度',
          width:15,
          height:15,
          marginLeft:5,
          marginRight:11
      },{
        name:'角度',
        width:15,
        height:15,
        marginLeft:5,
        marginRight:11
    },{
        name:'距离',
        width:15,
        height:15,
        marginLeft:5,
        marginRight:11
    }
   ],
    img:{
      0:require("@/assets/image/xiaokunshan/area.png"),
      1:require("@/assets/image/xiaokunshan/height.png"),
      2: require("@/assets/image/xiaokunshan/angle.png"),
      3:require("@/assets/image/xiaokunshan/distance.png"),
    },
    buttonStyle:{
       hoverShow:true,
       imgShow:true,
       txtShow:false,
       txt:'',
       color:'#fff',
       fontSize:24,
       lineHeight:65,
       fontFamily:'Microsoft YaHei',
    },
    hoverStyle:{
      txt:'工具',
      color:'#fff',
      fontSize:14,
      lineHeight:30,
      width:80,
      height: 30,
      bottom:110,
      fontFamily:'Microsoft YaHei',
      background: require("@/assets/image/xiaokunshan/img1.png"),
    },
    //下拉框样式
    optionStyle:{
      optionShow:true,
       width:90,
       height: 164,
       background:'rgba(14, 39, 70, 0.95)',
       borderColor:'#1b7ef2',
       color:'#fff',
       fontSize:'14',
       bottom:110,
       span:{
        height: 30,
        background: 'rgba(69, 162, 255, 0.3)',
        backgroundClick:'#1b7ef2',
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
        // lineHeight:30,
        textAlign:'center',
    },
    cleanBtn:{
       width:60,
       height:24,
       background: '#249CFF',
       fontSize: 12,
       color: '#143452',
    }
  };
  