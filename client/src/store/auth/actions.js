import ApiService from '../../services/api.service';

// eslint-disable-next-line
async function register({ commit }, data) {
  try {
    const res = await ApiService.post('auth/register', data);
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export { register };
