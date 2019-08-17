const loggedIn = state => {
  return !!state.accessToken;
};

export { loggedIn };
