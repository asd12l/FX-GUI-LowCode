/**
 * Created by Lzy on 2021/5/17.
 */

import axios from "axios";
import { message } from "element-ui";
import qs from "qs";

const service = axios.create({
  // baseURL: '/xks' || process.env.VUE_APP_BASE_API,
  // baseURL: '/mdy' || process.env.VUE_APP_BASE_API,
  // baseURL:  process.env.VUE_APP_BASE_API,
  timeout: 60000, // 请求超时时间
});

window.baseURL = "";

// 请求拦截
// 所有的网络请求都会走这个方法,可以在请求添加自定义内容
service.interceptors.request.use(
  function (config, data) {
    console.log("API_SERVER::::", process.env.API_SERVER, process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      if (config.url.includes("xiaokunshan")) {
        config.baseURL = "/xks";
        // } else if (config.url.includes("api/v2")) {
        //   config.baseURL = "/mdy";
      } else {
        config.baseURL = window.baseURL;
      }
    } else {
      config.baseURL = location.origin;
    }

    const cookies = document.cookie.split(";");
    const authorizationCookie = cookies.find((item) =>
      item.includes("md_pss_id")
    );
    config.headers = { ...config.headers, ...config.header };
    config.headers.Authorization = authorizationCookie
      ? authorizationCookie.replace("=", " ")
      : "";
    // md_pss_id 0400050fd0680b20f90480aa0f10d70c60b900c0ed0b20af
    // config.headers.Authorization =
    //   "md_pss_id 06e0650d10ce0420a70c50b50cc08c0bd08f0300eb0920c0";
    // "md_pss_id 0a00f50d90e00e302f0360820dd0de08f0e10970e90230fd";
    // "md_pss_id 0e600a0280fe0850f606b0040970f60140a900c0a207901b"; // 请求头添加token值
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (err) {
    return Promise.request(err);
  }
);

// 响应拦截
// 此处可以根据服务器返回的状态码做相应的数据
// instance.interceptors.response.use(
//   function (response) {
//       const res = response
//       if (res.status === 500) {
//           MessageBox.alert('系统未登录，请重新登录', '错误', {
//               confirmButtonText: '确定',
//               type: 'error'
//           }).then(() => {
//               store.dispatch('FedLogOut').then(() => {
//                   location.reload()
//               })
//           })
//           return Promise.reject('error')
//       } else if (res.errno === 502) {
//           MessageBox.alert('系统内部错误，请联系管理员维护', '错误', {
//               confirmButtonText: '确定',
//               type: 'error'
//           })
//           return Promise.reject('error')
//       }
//   },
//   function (err) {
//       return Promise.request(err)
//   }
// )

//请求
service.interceptors.request.use((config) => {
  //  if (store.getters.token) {
  //    config.headers['authorization'] = store.getters.token;
  //  }
  return config;
});

//响应
service.interceptors.response.use((response) => {
  const data = response.data;
  if (data.code === 200 || data.code === 1) {
    return Promise.resolve(response);
  } else {
    message.error(response.data.message || "");
    return Promise.reject(response);
  }
});

let http = {};

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.get = function (url, params = null, header = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params, header })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

http.post = function (url, params, header = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params, header)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export default http;
