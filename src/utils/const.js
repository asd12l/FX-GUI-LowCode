const systemInfo = localStorage.getItem("systemInfo");
console.log("systemInfo:::::", systemInfo);
export const appKey = systemInfo
  ? JSON.parse(systemInfo).app_key
  : "250c85839c7fc253";
// export const sign = "Yzg1NDU3MWJhZjUwOTQ1NTY0OThmZjM0NjAzOGZkNGY3MWEzOWJiMjQ4NmZhNmMyMDlhZTk1N2QwYTI5NzM5ZQ"
export const sign = systemInfo
  ? JSON.parse(systemInfo).sign
  : "MzQ3NDM2ZGVmMTgyNTA0OWE2ZTMxNzc0YTk3MDMyYzA2YmEzNWQ2ODRhZWNkYjU4Yjg4YTY3MjYyY2Y1NGUxMQ==";

export const multieventComList = [
  "numberCount",
  // "eventList",
  "buttonGroup",
  "layerControl",
  "numberScroll",
  "numberThree",
  "numberFour",
  "carouselPic",
  "navigation",
  "statistic",
  "tabPanel",
  "numberSix",
  "checkboxGroup"
];

// 业务弹窗组件
export const businessComList = ["eventDetail", "singleCamera", "eventDetailParticular"]

// 需要特殊处理的组件
export const formFiled = ["dateTimePicker", "selectBox", "searchBox"];

// 容器组件
export const containerCom = ['container', 'popupBox']


// 图表组件类型
export const chartTypeList = ["groupBar", "mixedLineandBar"]

// 图表类型与后台对应关系
export const chartReportTypeMap = {
  "groupBar": 1,
  "mixedLineandBar": 1,
  "stackedLine": 2,
  "numberScroll": 10,
  "customLegendPie": 3,
  "pieChart": 3,
  "integrationCenter":4,
}



// chartReportTypeMap = {
//   0: {
//     "groupBar": 1,
//     "mixedLineandBar": 1,
//     "stackedLine": 2,
//     "numberScroll": 10,
//     "customLegendPie": 3,
//     "pieChart": 3,
//     "integrationCenter":4,
//   }
// }


// export const projectId = "2f688cc5-f79f-4468-a165-89aed3dc2740"
export const projectId = "8ba5af5f-ad6e-4441-aaa1-cab1b3ee6464" // sass
