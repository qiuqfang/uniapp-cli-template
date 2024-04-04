import Request from "luch-request"; // 下载的插件

const http = new Request();

/* config 为默认全局配置 */
http.setConfig((config) => {
  config.baseURL =
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_PROXY
      : import.meta.env.VITE_REQUEST_HOST; /* 根域名 */
  return config;
});

http.interceptors.request.use(
  (config) => {
    console.log(config, "config");

    // 可使用async await 做异步操作
    config.header = {
      ...config.header,
    };
    return config;
  },
  (config) => {
    // 可使用async await 做异步操作
    return Promise.reject(config);
  }
);

http.interceptors.response.use(
  (response) => {
    /* 对响应成功做点什么 可使用async await 做异步操作*/
    console.log(response, "resolve");
    return response;
  },
  (response) => {
    /*  对响应错误做点什么 （statusCode !== 200）*/
    console.log(response, "reject");
    if (response.data.code == 40100) {
      uni.clearStorageSync();
      uni.navigateTo({
        url: "/pages/login/login",
      });
    }
    return Promise.reject(response);
  }
);

export default http;
