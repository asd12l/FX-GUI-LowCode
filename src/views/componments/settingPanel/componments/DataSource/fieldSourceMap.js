// 滚动表格
const scrollTable = (config) => {
  const data = [];
  const colList = config.otherData.tableHead;
  for (let index = 0; index < colList.length; index++) {
    const d = config.otherData.tableHead[index] || {};
    data.push({
      sourceFiled: d.label || `第${index + 1}列`,
      isMatchComplete: false,
      targetFiled: d.value,
    });
  }
  return data;
};
// 基础表格
const commonTable = (config) => {
  // const colList = config.otherData.tableHead;
  let colList = [...config.otherData.showData];
  let fieldMap = config.fieldMap.map((item) => item.targetFiled) || [];
  let obj = {};
  colList.forEach((d, index) => {
    let seat = fieldMap.indexOf(d.value);
    console.log(fieldMap, d.value, seat, "====fieldMap");
    if (!obj[d.value]) {
      obj[d.value] = {
        sourceFiled: d.label || `第${index + 1}列`,
        isMatchComplete: false,
        targetFiled: seat > -1 ? d.value : "",
        // targetFiled: d.value,
        isSelected: d.seletedType ? true : false,
        location: d.location,
        controlId: seat > -1 ? config.fieldMap[seat].controlId : "",
        type: seat > -1 ? config.fieldMap[seat].type : "",
      };
    }
  });
  const data = Object.values(obj);
  return data;
};

// 数值一
const numberCount = () => {
  return [
    {
      sourceName: "数值",
      sourceFiled: "per",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "名称",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "说明",
      sourceFiled: "txt",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

//事件列表
const eventList = () => {
  let arr = [
    {
      sourceName: "名称",
      sourceFiled: "event_name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "时间",
      sourceFiled: "alarm_time",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "地址",
      sourceFiled: "address",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "标签一",
      sourceFiled: "alarm_source",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "标签二",
      sourceFiled: "alarm_status",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "图片",
      sourceFiled: "alarm_img",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
  return arr;
};

const checkboxGroup = () => {
  return [
    {
      sourceName: "默认是否选中",
      sourceFiled: "is_selected",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "图片",
      sourceFiled: "img",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "名称",
      sourceFiled: "text",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

// 按钮组
const buttonGroup = () => {
  return [
    {
      sourceName: "文本",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

//视频组件
const importCamera = () => {
  return [
    {
      sourceName: "主通道号",
      sourceFiled: "master_channel",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "主国标号",
      sourceFiled: "national_num",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

//数值五
const numberFive = () => {
  return [
    {
      sourceName: "名称",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值一",
      sourceFiled: "numTotal",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值二(左侧)",
      sourceFiled: "numleft",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值二(右侧)",
      sourceFiled: "numRight",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const numberScroll = () => {
  return [
    {
      sourceName: "数值",
      sourceFiled: "total",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const numberThree = () => {
  return [
    {
      sourceName: "标题",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "第一行",
      sourceFiled: "line1",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "第二行",
      sourceFiled: "line2",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "第三行",
      sourceFiled: "line3",
      isMatchComplete: false,
    },
    {
      sourceName: "第四行",
      sourceFiled: "line4",
      isMatchComplete: false,
    },
  ];
};

// 数值六
const numberSix = () => {
  return [
    {
      sourceName: "图标",
      sourceFiled: "icon",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "名称",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值",
      sourceFiled: "num",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "单位",
      sourceFiled: "unit",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "标签",
      sourceFiled: "tags",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

// 导航
const navigation = () => {
  return [
    {
      sourceName: "名称",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "路由",
      sourceFiled: "route",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

// 多屏查看
const splitCameraScreen = () => {
  return [
    // {
    //   sourceName: "所属部门",
    //   sourceFiled: "group_name",
    //   isMatchComplete: false,
    //   targetFiled: "",
    // },
    {
      sourceName: "设备名称",
      sourceFiled: "device_name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "设备状态",
      sourceFiled: "device_status",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "设备类型",
      sourceFiled: "camera_type",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "设备组织架构",
      sourceFiled: "camera_group",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "主通道号",
      sourceFiled: "master_channel",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "主国标号",
      sourceFiled: "national_num",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "是否重点监控",
      sourceFiled: "is_emphasis",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const appraisingCard = () => {
  return [
    {
      sourceName: "图片",
      sourceFiled: "photo",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "标题",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "第二行文本",
      sourceFiled: "text",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "第三行文本",
      sourceFiled: "description",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "标签",
      sourceFiled: "tags",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const statistic = () => {
  return [
    {
      sourceName: "标题",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "单位",
      sourceFiled: "unit",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值",
      sourceFiled: "value",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const carouselPic = () => {
  return [
    {
      sourceName: "图片",
      sourceFiled: "photo",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "标题",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "时间",
      sourceFiled: "time",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "描述",
      sourceFiled: "desc",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const numberSteering = () => {
  return [
    {
      sourceName: "名称",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值",
      sourceFiled: "value",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "总量",
      sourceFiled: "total",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const progressBar = () => {
  return [
    {
      sourceName: "名称",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值",
      sourceFiled: "value",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "比值",
      sourceFiled: "per",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "单位",
      sourceFiled: "unit",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "排名",
      sourceFiled: "ranking",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const powerBarChart = () => {
  return [
    {
      sourceName: "名称",
      sourceFiled: "name",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "数值",
      sourceFiled: "satisfied",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "总量",
      sourceFiled: "total",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};
const billBoard = () => {
  return [
    {
      sourceName: "行记录id",
      sourceFiled: "rowid",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "坐标",
      sourceFiled: "positions",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "标题",
      sourceFiled: "title",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "副标题",
      sourceFiled: "subtitle",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const polygonArea = () => {
  return [
    {
      sourceName: "行记录id",
      sourceFiled: "rowid",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "范围",
      sourceFiled: "positions",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "线颜色",
      sourceFiled: "lineColor",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "线宽度",
      sourceFiled: "lineWidth",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "区域颜色",
      sourceFiled: "areaColor",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "区域透明度",
      sourceFiled: "areaColorOpacity",
      isMatchComplete: false,
      targetFiled: "",
    },
  ];
};

const integrationCenter = () => {
  return [
    {
      sourceName: "主标题",
      sourceFiled: "title",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "副标题",
      sourceFiled: "subTitle",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "跳转链接",
      sourceFiled: "link",
      isMatchComplete: false,
      targetFiled: "",
    },
  ]
}

const basicText = () => {
  return [
    {
      sourceName: "文本内容",
      sourceFiled: "text",
      isMatchComplete: false,
      targetFiled: "",
    }
  ]
}
const LatestAnnouncement = () => {
  return [
    {
      sourceName: "标题",
      sourceFiled: "title",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "时间",
      sourceFiled: "time",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "内容",
      sourceFiled: "contant",
      isMatchComplete: false,
      targetFiled: "",
    },
    {
      sourceName: "跳转链接",
      sourceFiled: "link",
      isMatchComplete: false,
      targetFiled: "",
    },
  ]
}
const fieldMap = {
  scrollTable: (config) => scrollTable(config),
  commonTable1: (mapData, config) => commonTable(mapData, config),
  numberCount: (config) => numberCount(config),
  eventList: (config) => eventList(config),
  checkboxGroup: (config) => checkboxGroup(config),
  layerControl: (config) => checkboxGroup(config),
  buttonGroup: (config) => buttonGroup(config),
  importCamera: (config) => importCamera(config),
  numberSix: (config) => numberSix(config),
  navigation: (config) => navigation(config),
  splitCameraScreen: (config) => splitCameraScreen(config),
  numberFive2: (config) => numberFive(config),
  numberScroll: (config) => numberScroll(config),
  numberThree: (config) => numberThree(config),
  appraisingCard: (config) => appraisingCard(config),
  statistic: (config) => statistic(config),
  carouselPic: (config) => carouselPic(config),
  numberSteering: (config) => numberSteering(config),
  progressBar: (config) => progressBar(config),
  powerBarChart: (config) => powerBarChart(config),
  billBoard: (config) => billBoard(config),
  integrationCenter: (config) => integrationCenter(config),
  basicText: (config) => basicText(config),
  richEditor: (config) => basicText(config),
  LatestAnnouncement: (config) => LatestAnnouncement(config),
  polygonArea: (config) => polygonArea(config),
};

export default fieldMap;
