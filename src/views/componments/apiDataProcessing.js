/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-03 14:43:04
 * @LastEditors: ydl
 * @LastEditTime: 2023-11-06 16:53:41
 */

const getChart = (data) => {
  const {
    xaxes,
    xaxes: { controlId, options },
    valueMap,
    map,
  } = data;
  const chartData = options
    .map((item) => {
      const { v = "" } = map[0].value.find((ele) => ele.x === item.key) || {};
      return {
        ...item,
        name: item.value,
        value: v,
        id: item.index,
      };
    })
    .filter((item) => !item.isDeleted);
  return chartData;
};

const getNavigation = (data, config) => {
  let d = [];
  data.forEach((item) => {
    if (
      item.route != "camera" &&
      item.route != "operation" &&
      item.route != "eventDetail"
    ) {
      d.push(item);
    }
  });
  return d;
};

const getNumberCount = (data, config) => {
  let d = [];
  data.forEach((item) => {
    let obj = {
      name: item.name,
      per: item.per ? item.per : item.value,
    };
    d.push(obj);
  });
  return d;
};

const getResultDataList = (data, config) => {
  return data.list;
};

const getTableData = (data, config) => {
  config.data.tableData = data.list || [];
  config.data.total = data.total || 0;
  return config.data;
};
const getScrollTableData = (data, config) => {
  return data.list;
};
const getSerieData = (data, config) => {
  // console.log(data, config);
  if (config.type === "stackedBar") {
    config.data = data.data;
  } else {
    config.data = data;
  }
  return config.data;
};

const getResultData = (data, config) => {
  return data;
};

const getCheckboxGroup = (data, config) => {
  return data;
};

const apiDataProcessing = {
  lineChart: (data) => getChart(data),
  barChart: (data) => getChart(data),
  pieChart: (data) => getChart(data),
  radarChart: (data) => getChart(data),
  navigation: (data, config) => getNavigation(data, config),
  numberCount: (data, config) => getNumberCount(data, config),
  importCamera: (data, config) => getResultDataList(data, config),
  splitCameraScreen: (data, config) => getResultData(data, config),
  layerControl: (data, config) => getResultData(data, config),
  checkboxGroup: (data, config) => getCheckboxGroup(data, config),
  progressBar: (data, config) => getResultData(data, config),
  powerBarChart: (data, config) => getResultData(data, config),
  statistic: (data, config) => getResultData(data, config),
  eventList: (data, config) => getResultDataList(data, config),
  numberScroll: (data, config) => getResultData(data, config),
  buttonGroup: (data, config) => getResultData(data, config),
  numberThree: (data, config) => getResultData(data, config),
  appraisingCard: (data, config) => getResultDataList(data, config),
  switchList: (data, config) => getResultData(data, config),
  commonTable: (data, config) => getTableData(data, config),
  commonTable1: (data, config) => getTableData(data, config),
  commonTable2: (data, config) => getTableData(data, config),
  scrollTable: (data, config) => getScrollTableData(data, config),
  barChart: (data, config) => getSerieData(data, config),
  numberFive: (data, config) => getResultDataList(data, config),
  carouselPic: (data, config) => getResultDataList(data, config),
  personnelHouse: (data, config) => getResultDataList(data, config),
};

export default apiDataProcessing;
