/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-10-25 10:42:15
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-23 10:12:46
 */
import { datafilterFunc } from "@/utils/index.js";

// 滚动表格
const scrollTable = (mapData, config, changeData) => {
  const otherData = config.otherData;
  for (let index = 0; index < mapData.length; index++) {
    otherData.tableHead[index].value = mapData[index].targetFiled;
  }

  changeData("otherData", otherData);
  return datafilterFunc(mapData, config.data);
};

const commonTable = (mapData, config, changeData) => {
  const otherData = config.otherData;
  for (let index = 0; index < mapData.length; index++) {
    otherData.showData[index].value = mapData[index].targetFiled;
  }
  changeData("showData", otherData.showData);
  let tableData = datafilterFunc(mapData, config.data.tableData);
  return { tableData, total: config.data.total };
};

const getDataRows = (mapData, config) => {
  return datafilterFunc(mapData, config.data.rows);
};

// 数值一
const numberCount = (mapData, config) => {
  return datafilterFunc(mapData, config.data.rows || config.data);
};
// 事件列表
const eventList = (mapData, config) => {
  let data = config.data.rows ? config.data.rows : config.data;
  return datafilterFunc(mapData, data);
};
const getCheckboxGroup = (mapData, config) => {
  let data = config.data.rows ? config.data.rows : config.data;
  data = data.map((item) => {
    return {
      ...item,
      is_selected: item.is_selected === "是" ? 1 : 0,
    }
  })
  return datafilterFunc(mapData, data);
};

const getDataList = (mapData, config) => {
  let data = config.data.rows ? config.data.rows : config.data;
  return datafilterFunc(mapData, data);
};

const basicText = (mapData, config) => {
  let data = config.data.rows ? config.data.rows : config.data;
  return datafilterFunc(mapData, data);
};

const splitCameraScreen = (mapData, config) => {
  let rows = datafilterFunc(mapData, config.data.rows || config.data);
  return { rows, isChangeTree: true };
};

const getDillBoardData = (mapData, config) => {
  return datafilterFunc(mapData, config.data.rows);
};

const getPolygonAreaData = (mapData, config) => {
  return datafilterFunc(mapData, config.data.rows);
};

const fieldMap = {
  scrollTable: (mapData, config, changeData) =>
    scrollTable(mapData, config, changeData),
  commonTable1: (mapData, config, changeData) =>
    commonTable(mapData, config, changeData),
  numberCount: (mapData, config, changeData) =>
    numberCount(mapData, config, changeData),
  numberSix: (mapData, config, changeData) =>
    numberCount(mapData, config, changeData),
  eventList: (mapData, config, changeData) =>
    eventList(mapData, config, changeData),
  buttonGroup: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  importCamera: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  navigation: (mapData, config, changeData) =>
    numberCount(mapData, config, changeData),
  splitCameraScreen: (mapData, config, changeData) =>
    splitCameraScreen(mapData, config, changeData),
  checkboxGroup: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  numberFive2: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  appraisingCard: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  statistic: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  layerControl: (mapData, config, changeData) =>
    getCheckboxGroup(mapData, config, changeData),
  carouselPic: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  numberSteering: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  progressBar: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  powerBarChart: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  integrationCenter: (mapData, config, changeData) =>
    getDataList(mapData, config, changeData),
  billBoard: (mapData, config, changeData) =>
    getDillBoardData(mapData, config, changeData),
  basicText: (mapData, config, changeData) => basicText(mapData, config, changeData),
  richEditor: (mapData, config, changeData) => basicText(mapData, config, changeData),
  LatestAnnouncement: (mapData, config, changeData) => getDataList(mapData, config, changeData),
  polygonArea: (mapData, config, changeData) => getPolygonAreaData(mapData, config, changeData),
};

export default fieldMap;
