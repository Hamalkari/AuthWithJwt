const logginSuccess = (state, accessToken) => {
  state.accessToken = accessToken;
};

const logoutSuccess = state => {
  state.accessToken = '';
};

export { logginSuccess, logoutSuccess };
