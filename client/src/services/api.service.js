import axios from 'axios';
import { TokenService } from './storage.service';
import store from '../store'; //eslint-disable-line

const ApiService = {
  init(baseUrl) {
    axios.defaults.baseURL = baseUrl;
  },
  setHeader() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${TokenService.getToken()}`;
  },
  removeHeader() {
    axios.defaults.headers.common = {};
  },
  get(url) {
    return axios.get(url);
  },
  post(url, data) {
    return axios.post(url, data);
  },
  put(url, data) {
    return axios.put(url, data);
  },
  delete(url) {
    return axios.delete(url);
  },
  customRequest(opt) {
    return axios(opt);
  },
  _401interceptor: null,

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (error.response.status == 401) {
          try {
            await store.dispatch('auth/refreshToken');

            return this.customRequest({
              method: error.config.method,
              url: error.config.url,
              data: error.config.data,
            });
          } catch (error) {
            store.dispatch('auth/logout');

            throw error;
          }
        }
      },
    );
  },
  unmount401Interceptor() {
    axios.interceptors.response.eject(this._401interceptor);
  },
};

export default ApiService;
