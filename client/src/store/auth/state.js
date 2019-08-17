import { TokenService } from '../../services/storage.service';

export default {
  accessToken: TokenService.getToken(),
};
