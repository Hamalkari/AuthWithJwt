import ApiService from '../../services/api.service';
import { TokenService } from '../../services/storage.service';

// eslint-disable-next-line
async function register({ commit }, data) {
  try {
    const res = await ApiService.post('auth/register', data);
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

// eslint-disable-next-line
async function login({ commit }, data) {
  try {
    const res = await ApiService.post('auth/login', data);

    TokenService.saveToken(res.data.accessToken);
    TokenService.saveRefreshToken(res.data.refreshToken);

    ApiService.setHeader();
    ApiService.mount401Interceptor();

    commit('logginSuccess', res.data.accessToken);

    this.$router.push({ name: 'Home' });

    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

function logout({ commit }) {
  TokenService.removeToken();
  TokenService.removeRefreshToken();

  ApiService.removeHeader();
  ApiService.unmount401Interceptor();

  commit('logoutSuccess');
  this.$router.push({ name: 'Login' });
}

async function refreshToken({ commit }) {
  const refresh_token = TokenService.getRefreshToken();

  try {
    const response = await ApiService.post('auth/refresh-token', {
      refreshToken: refresh_token,
    });

    TokenService.saveToken(response.data.accessToken);
    TokenService.saveRefreshToken(response.data.refreshToken);

    ApiService.setHeader();

    commit('logginSuccess', response.data.accessToken);
  } catch (error) {
    throw new Error(error.reponse.data.message);
  }
}

export { register, login, logout, refreshToken };
