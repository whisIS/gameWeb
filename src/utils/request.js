import axios from "axios";
import { Message } from "element-ui";

const service = axios.create({
  baseURL: '/api',
  timeout: 0
});

service.interceptors.request.use(
  config => {
    const JSESSIONID = sessionStorage.getItem("JSESSIONID");
    if (JSESSIONID) {
      config.headers["JSESSIONID"] = JSESSIONID;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status != "200") {
      Message.closeAll();
      Message({
        message: res._msg,
        type: "error",
        duration: 3 * 1000
      });
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  error => {
    var status;
    try {
      status = error.response.status;
    } catch (error) {
      Message.closeAll();
      Message({
        message: "服务器未知错误",
        type: "error",
        duration: 3 * 1000
      });
      return Promise.reject(error);
    }
    let msg = "";
    switch (status) {
      case 400:
        msg = "错误的请求";
        break;
      case 401:
        msg = "未授权，请重新登录";
        break;
      case 403:
        msg = "拒绝访问";
        break;
      case 404:
        msg = "未找到该接口地址";
        break;
      case 405:
        msg = "请求未被允许";
        break;
      case 408:
        msg = "请求超时";
        break;
      case 500:
        msg = "服务端出错了";
        break;
      case 501:
        msg = "网络未实现";
        break;
      case 502:
        msg = "网络错误";
        break;
      case 503:
        msg = "服务不可用";
        break;
      case 504:
        msg = "网络超时";
        break;
      case 505:
        msg = "http版本不支持";
        break;
      default:
        msg = "连接错误";
        break;
    }
    Message.closeAll();
    Message({
      message: status + msg,
      type: "error",
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);
export default service;
