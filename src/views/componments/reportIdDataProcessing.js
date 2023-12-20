const getChart = (data) => {
  const {
    xaxes,
    xaxes: { options },
    valueMap,
    map,
  } = data;
  // const result = await this[this.config.component]()

  const chartData = options
    .map((item) => {
      const { v = "" } =
        map[0].value.find((ele) => ele.x === item.key) || {};
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
const  getGroupBar = (data) => {
  const chartData = []
  const {xaxes: {controlId, options}, valueMap} = data
  const dataList = data.map.forEach(item => {
      item.value.forEach(ele => {
          chartData.push({
              s: item.key,
              x: valueMap[controlId][ele.x],
              y: ele.v
          })
      })
  })
  
  return chartData
}

const  getMixedLineandBar = (data) => {
  const chartData = []
  const {xaxes: {controlId, options}, valueMap} = data
  const dataList = data.map.forEach(item => {
      item.value.forEach(ele => {
          chartData.push({
              s: item.key,
              x: valueMap[controlId][ele.x],
              y: ele.v
          })
      })
  })
  
  return chartData
}

const  getStackedLine = (data) => {
  const chartData = []
  const {xaxes: {controlId, options}, valueMap} = data
  const dataList = data.map.forEach(item => {
      item.value.forEach(ele => {
          chartData.push({
              s: item.key,
              x: valueMap[controlId][ele.x],
              y: ele.v
          })
      })
  })
  
  return chartData
}

const getPieChart = (data) => {
  const chartData = []
  const {xaxes: {controlId, options}, valueMap} = data
  const dataList = data.map.forEach(item => {
      item.value.forEach(ele => {
          chartData.push({
              id: item.key,
              name: valueMap[controlId][ele.x],
              value: ele.v
          })
      })
  })
  return chartData
}

const numberScroll=(data)=>{
  const reportIdData={
  };
  if(data.map&&data.map.length){
     reportIdData.total =  data.map[0].value[0].v
  }else{
      reportIdData.total=0
  }
  return reportIdData
}

const integrationCenter=(data)=>{
    const reportIdData=[...data]
    reportIdData.forEach(item=>{
      item.title = item.name
      item.subTitle= ''
    })
    return reportIdData
}
const apiDataProcessing = {
  lineChart: (data) => getChart(data),
  barChart: (data) => getChart(data),
  // pieChart: (data) => getChart(data),
  radarChart: (data) => getChart(data),
  groupBar: (data) => getGroupBar(data),
  mixedLineandBar: (data) => getMixedLineandBar(data),
  stackedLine: (data) => getStackedLine(data),
  customLegendPie: (data) => getPieChart(data),
  pieChart: (data) => getPieChart(data),
  numberScroll:(data) => numberScroll(data),
  integrationCenter:(data)=>integrationCenter(data),
};

export default apiDataProcessing;
