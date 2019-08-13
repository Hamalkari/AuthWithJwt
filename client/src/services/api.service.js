import axios from 'axios';
import { TokenService } from './storage.service';

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
};

export default ApiService;
