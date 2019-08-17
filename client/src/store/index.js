import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    auth,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
});

export default Store;
