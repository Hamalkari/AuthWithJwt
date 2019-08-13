import { serverUrl } from '../store/urls';
import ApiService from '../services/api.service';
import { TokenService } from '../services/storage.service';

export default () => {
  ApiService.init(serverUrl);

  if (TokenService.getToken()) {
    ApiService.setHeader();
  }
};
