import axios, { type AxiosRequestConfig, type Method } from 'axios';

export interface serviceConfig<D = any> {
  url: string,
  method?: Method,
  data?: D,
}

const defaultParams: AxiosRequestConfig = {
  url: '',
  method: 'get',
  baseURL: 'http://rest.apizza.net/mock/c93fdfb30dab4ca2008a92a4497f29eb',
  headers: {},
}
const service = <D, T>(requestConfig: serviceConfig<D>): Promise<T> => {
  const config = Object.assign(defaultParams, requestConfig);
  let _url = config.url;

  // get
  if (config.method === 'get') {
    if (config.data) {
      const queryArr = [];
      for (const key in config.data) {
        if (Object.prototype.hasOwnProperty.call(config.data, key)) {
          queryArr.push(`${key}=${config.data[key]}`);
        }
      }
      const queryStr = queryArr.join('&');
      if (_url.includes('?')) {
        _url = _url + '&' + queryStr;
      } else {
        _url = _url + '?' + queryStr;
      }
    }
  }
  config.url = _url;
  return axios(config).then(res => {
    // 只返回data，其他的数据 业务层不需要知道，在拦截器里使用
    return res.data;
  });
}

axios.interceptors.response.use(
  res => {
    // 拦截器里不要改返回数据的类型，axios的类型定义里，规定了onFullfilled的参数和返回值是一致的
    return res;
  },
  err => {
    return err;
  }
)

export default service;