import axios from "axios";
import router from "@/router";
import ElementUI from "element-ui";

// axios.defaults.baseURL = "http://localhost:8081";

// 创建axios实例
const request = axios.create({
  //设置超时时间
  timeout: 5000,
  //设置json对象
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

//请求的拦截器
request.interceptors.request.use(config => {
  //每一次请求
  config.headers["authorization"] = localStorage.getItem("token")
  return config
});

//响应的拦截器
request.interceptors.response.use(response => {
  /**
   * code为非20000是抛错 可结合自己业务进行修改
   */
  const res = response.data;

  if (res.code == 200) {//成功

    return response;

  } else {

    ElementUI.Message.error({
      message: !res.msg ? "系统异常" : res.msg,
      type: "error"
    });

    //拒绝这这次相应响应
    return Promise.reject(res.msg);

  }
},

    error => {
      //判断返回的数据是否为空
      if (error.response.data){//系统内部异常
        error.message = error.response.data.msg
      }
// ==============================================================================
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求';
            break;
          case 401:
            error.message = '未授权，请重新登录';
            router.push({
              path:'/login'
            })
            break;
          case 403:
            error.message = '拒绝访问';
            break;
          case 404:
            error.message = '请求错误,未找到该资源';
            break;
          case 405:
            error.message = '请求方法未允许';
            break;
          case 408:
            error.message = '请求超时';
            break;
          case 500:
            error.message = '服务器端出错';
            break;
          case 501:
            error.message = '网络未实现';
            break;
          case 502:
            error.message = '网络错误';
            break;
          case 503:
            error.message = '服务不可用';
            break;
          case 504:
            error.message = '网络超时';
            break;
          case 505:
            error.message = 'http版本不支持该请求';
            break;
          default:
            error.message = `未知错误${error.response.status}`;
        }
      } else {
        error.message = "连接到服务器失败";
      }
// ==================================================================================
      ElementUI.Message.error({
        message:error.message,
        type:'error',
        duration:3000//弹窗秒数
      })

      //拒绝这这次相应响应
      return Promise.reject(error);
    }
);

export default request;
