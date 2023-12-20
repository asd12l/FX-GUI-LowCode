/**
 * Created by Lzy on 2021/5/19.
 */

import remoteLoad from "./remoteLoad";
const { AMapCDN, AMapUiCDN } = require("@/assets/cdn");

/**
 * 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

/**
 * 深拷贝
 * @param {Object} source
 * @return {Object}
 */
export function deepClone (source) {
  if (typeof source !== "object" || source === null) {
    return new Error("deepClone方法:传入的不是一个对象");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * 数组去重
 * @param {Array} arr
 */
export function uniqueArr (arr) {
  if (!Array.isArray(arr)) {
    console.warn("uniqueArr方法:传入的不是一个数组!");
    return arr;
  }
  return [...new Set(arr)];
}

/**
 * 组件默认展示隐藏判断
 */
export function isShowModuleFunc (config) {
  return config.isShowModule || location.href.includes("#/chart");
}

/**
 * 弹窗组件打开显示背景
 */
export function setModal (param) {
  var modal = document.createElement("div");
  // let modal = document.querySelector('.preview');
  let dom =
    document.querySelector(".preview") ||
    document.querySelector(".content-container");
  dom.appendChild(modal);
  modal.setAttribute(
    "style",
    "pointer-events:all;position:absolute;top:0;left: 0;z-index: 99;display: block;width: 100%;height: 100%;background-color: " +
    param +
    ";"
  );
  modal.setAttribute("class", "dialog-modal");
}

/**
 * 弹窗组件关闭背景
 */
export function removeModal () {
  let modal = document.querySelector(".dialog-modal");
  modal.remove();
}

/**
 * 获取geoJson数据  通过高德获取    递归获取区县geoJson
 * @param  {string} adcode  行政区code
 * @param  {string} childAdcode 区县级行政区code
 * @return {Array}
 */
export function getGeoJson (adcode, childAdcode = "") {
  return new Promise((resolve, reject) => {
    if (window.AMap && window.AMapUI) {
      insideFun(adcode, childAdcode);
    } else {
      remoteLoad(AMapCDN).then(() => {
        if (window.AMap) {
          remoteLoad(AMapUiCDN).then(() => {
            if (window.AMapUI) {
              insideFun(adcode, childAdcode);
            } else {
              console.error("AMapUI获取失败");
            }
          });
        } else {
          console.error("AMap获取失败");
        }
      });
    }
    function insideFun (adcode, childAdcode) {
      // eslint-disable-next-line
      AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          if (Json.length === 0) {
            let parent = areaNode._data.geoData.parent.properties.acroutes;
            insideFun(parent[parent.length - 1], adcode);
            return;
          }

          if (childAdcode) {
            Json = Json.filter((item) => {
              return item.properties.adcode == childAdcode;
            });
          }
          let mapJson = {
            features: Json,
          };
          resolve(mapJson);
        });
      });
    }
  });
}

/***
 * 生成随机id
 ** @param  {string} template  生成随机id的格式
 */
export function guid (template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return template.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 一维数组转变为二维数组
export function changeArr (arr, num) {
  // 一维数组转换为二维数组
  const iconsArr = []; // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num); // 计算该元素为第几个素组内
    if (!iconsArr[page]) {
      // 判断是否存在
      iconsArr[page] = [];
    }
    iconsArr[page].push(item);
  });
  return iconsArr;
}

// 处理样式
export function setStyleObj (d) {
  let data = {};
  d.width && (data.width = d.width === "auto" ? "auto" : d.width + "px");
  d.height && (data.height = d.height === "auto" ? "auto" : d.height + "px");
  d.minHeight &&
    (data.minHeight = d.minHeight === "auto" ? "auto" : d.minHeight + "px");
  d.left && (data.left = d.left + "px");
  d.top && (data.top = d.top + "px");
  d.bottom && (data.bottom = d.bottom + "px");
  d.fontSize && (data.fontSize = d.fontSize + "px");
  d.letterSpacing && (data.letterSpacing = d.letterSpacing + "px");
  d.lineHeight && (data.lineHeight = d.lineHeight + "px");
  d.marginLeft && (data.marginLeft = d.marginLeft + "px");
  d.marginRight && (data.marginRight = d.marginRight + "px");
  d.marginTop && (data.marginTop = d.marginTop + "px");
  d.marginBottom && (data.marginBottom = d.marginBottom + "px");
  d.paddingLeft && (data.paddingLeft = d.paddingLeft + "px");
  d.paddingRight && (data.paddingRight = d.paddingRight + "px");
  d.paddingTop && (data.paddingTop = d.paddingTop + "px");
  d.paddingBottom && (data.paddingBottom = d.paddingBottom + "px");
  d.textIndent && (data.textIndent = d.textIndent + "px");
  d.fontFamily && (data.fontFamily = d.fontFamily);
  d.fontStyle && (data.fontStyle = d.fontStyle);
  d.fontWeight && (data.fontWeight = d.fontWeight);
  d.textAlign && (data.textAlign = d.textAlign);
  d.color && (data.color = d.color);
  d.borderWidth && (data.borderWidth = d.borderWidth + "px");
  d.borderStyle && (data.borderStyle = d.borderStyle);
  d.borderColor && (data.borderColor = d.borderColor);
  d.borderRadius && (data.borderRadius = d.borderRadius + "px");
  if (d.background) {
    if (d.background.includes("#") || d.background.includes("rgba")) {
      data.background = d.background;
    } else {
      data.background = `url(${d.background}) 0% 0% / 100% 100% no-repeat`;
      // data.backgroundSize = "cover";
    }
  }
  if (d.backgroundImg) {
    data.background = `url(${d.backgroundImg}) 0% 0% / 100% 100% no-repeat`;
  }
  if (d.padding) {
    let padding = d.padding.split(",").map((item) => {
      item = item > 0 ? item + "px" : item;
      return item;
    });
    data.padding = padding.join(",").replace(/,/g, " ");
  }
  if (d.margin) {
    let margin = d.margin.split(",").map((item) => {
      item = item > 0 ? item + "px" : item;
      return item;
    });
    data.margin = margin.join(",").replace(/,/g, " ");
  }
  return data;
}
// rgba转换为十六进制
export function rgbaToHex (color) {
  var values = color
    .replace(/rgba?\(/, "")
    .replace(/\)/, "")
    .replace(/[\s+]/g, "")
    .split(",");
  var a = parseFloat(values[3] || 1),
    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return (
    "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2)
  );
}
// 十六进制转为rgba
export function hexToRgba (hexColor) {
  // 移除 # 号并提取颜色值
  var hex = hexColor.replace("#", "");
  // 将颜色值拆分成 R、G、B 三个部分
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  // 转换为 RGBA 格式并添加透明度
  var rgb = `rgba(${r}, ${g}, ${b}`;
  return rgb;
}

import Vue from "vue";

const clickDown = Vue.directive("clickDown", {
  inserted (el, binding, vnode) {
    let clickTimer = null;

    // 单击
    el.addEventListener("click", () => {
      if (clickTimer) {
        window.clearTimeout(clickTimer);
        clickTimer = null;
      }
      clickTimer = setTimeout(() => {
        vnode.context[binding.value.clickFun](binding.value.clickFunType);
      }, 300);
    });

    // 双击
    el.addEventListener("dblclick", () => {
      if (clickTimer) {
        window.clearTimeout(clickTimer);
        clickTimer = null;
      }

      vnode.context[binding.value.dblclickFu](binding.value.dblclickFuType);
    });
  },
});

// 调用接口
import { loadCustomApiData, getFilterRows } from "@/utils/api";
import apiDataProcessing from "../views/componments/apiDataProcessing.js";
export async function toLoadData (config, type) {
  config.requestParams.pageIndex = config.requestParams.page;
  if (config.sourceType === "api") {
    const { data } = await loadCustomApiData({
      api: config.api,
      type: config.requestType,
      data: {
        ...config.requestParams,
      },
    });
    let componentData;
    if (config.isShowDataFilter && config.datafilterFunc) {
      const datafilterFunc = eval(config.datafilterFunc);
      componentData = datafilterFunc(data);
    } else {
      componentData = await apiDataProcessing[type](data, config);
    }
    return componentData;
  } else if (config.sourceType === "工作表") {
    console.log(config.requestParams, "===requestParams");
    const { data } = await getFilterRows({
      appKey,
      sign,
      viewId: config.viewId,
      worksheetId: config.worksheetId,
      pageSize: (config.requestParams && config.requestParams.pageSize) || 100,
      pageIndex: config.requestParams.pageIndex,
      filters: config.requestParams.filters,
    });
    let rows = datafilterFunc(config.fieldMap, data.rows);
    return { rows, total: data.total };
  }
}

// 调用获取图片接口
import { appKey, sign } from "@/utils/const.js";
export async function getImgData (config) {
  let { data } = await getFilterRows({
    appKey: appKey,
    sign: sign,
    worksheetId: config.worksheetId,
    pageSize: 500,
    pageIndex: 1,
  });
  return data;
}

// 滤镜效果处理
export function getFilterStyles ({ filterObj, openFilter }) {
  if (!filterObj || !openFilter) return {};
  const { opacity, saturate, contrast, hueRotate, brightness } = filterObj;
  return {
    opacity: opacity,
    filter: `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`,
  };
}

// 获取指定应用的 appkey和sign
export function getAppInfo (appName) {
  const appkeyList = localStorage.getItem("appkeyList");
  if (appkeyList) {
    const appInfo = JSON.parse(appkeyList).find(
      (item) => item.app_name === appName
    );
    return {
      app_key: appInfo.app_key,
      sign: appInfo.sign,
    };
  } else {
    return {};
  }
}

// 判断一个字符串是不是可以使用JSON.parse()转换的字符串
export function isJSON (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    // 转换出错，抛出异常
    return false;
  }
  return true;
}

// 数据过滤
export function datafilterFunc (fieldMap, data) {
  const filterData = [];
  if (typeof data === 'string') {
    filterData.push({
      text: data
    })
    return filterData
  }
  for (let index = 0; index < data.length; index++) {
    let filterDataObj = data[index];
    for (let inx = 0; inx < fieldMap.length; inx++) {
      if (fieldMap[inx].type === "附件") {
        let value = data[index][fieldMap[inx].targetFiled];
        let isJson = isJSON(value);
        let file = value;
        if (isJson) {
          let d = JSON.parse(value);
          if (d.length > 1) {
            file = file =
              value && d.length > 0 ? d.map((item) => item.DownloadUrl) : [];
          } else {
            file = file =
              value && d.length > 0 ? (d[0] ? d[0]["DownloadUrl"] : "") : "";
          }
        }
        filterDataObj[fieldMap[inx].targetFiled] = file;
        filterDataObj[fieldMap[inx].sourceFiled] = file;
      } else {
        filterDataObj[fieldMap[inx].sourceFiled] =
          data[index][fieldMap[inx].targetFiled];
      }
    }
    filterData.push(data[index]);
  }
  return filterData;
}

// 处理滚动表格和基础表格工作表字段映射数据
export function changeTableData(targetData, config) {
  let t;
  if (config.component === "commonTable1") {
    t = [...config.otherData.showData];
    targetData.forEach((item, i) => {
      let type = item.type;
      let seletedType;
      switch (type) {
        case "日期和时间":
          seletedType = "dateTimePicker";
          break;
        case "单选":
        case "等级":
          seletedType = "select";
          break;
        case "文本框":
        case "自动编号":
          seletedType = "search";
          break;
        default:
          seletedType = "search";
          break;
      }
      if (t.length === 0) {
        t.push({
          label: item.sourceFiled,
          value: item.targetFiled,
          seletedType: item.isSelected ? seletedType : "",
          type: item.isSelected ? item.type : "",
          location: item.location,
          controlId: item.controlId,
        });
      } else {
        t.forEach((v, j) => {
          if (!targetData[j]) {
            t.splice(j, 1);
          } else if (!t[i]) {
            t.push({
              label: item.sourceFiled,
              value: item.targetFiled,
              seletedType: item.isSelected ? seletedType : "",
              type: item.isSelected ? item.type : "",
              location: item.location,
              controlId: item.controlId,
            });
          } else {
            if (i === j) {
              t[j].label = targetData[i].sourceFiled;
              t[j].value = targetData[i].targetFiled;
              t[j].location = targetData[i].location;
              t[j].seletedType = targetData[i].isSelected ? seletedType : "";
              t[j].type = targetData[i].isSelected ? targetData[i].type : "";
              t[j].controlId = targetData[i].controlId;
            }
          }
        });
      }
    });
  } else {
    t = [...config.otherData.tableHead];
    targetData.forEach((item, i) => {
      if (t.length === 0) {
        t.push({
          label: item.sourceFiled,
          value: item.targetFiled,
          color: "#fff",
          width: "",
          colorData: [],
        });
      } else {
        t.forEach((v, j) => {
          if (!targetData[j]) {
            t.splice(j, 1);
          } else if (!t[i]) {
            t.push({
              label: item.sourceFiled,
              value: item.targetFiled,
              color: "#fff",
              width: "",
              colorData: [],
            });
          } else {
            if (i === j) {
              t[j].label = targetData[i].sourceFiled;
              t[j].value = targetData[i].targetFiled;
            }
          }
        });
      }
    });
  }
  return t;
}
