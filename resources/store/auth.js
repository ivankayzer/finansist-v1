import axios from '~/plugins/axios';

const auth = {
  state: {
    user: {},
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    removeUser(state) {
      state.user = {};
    },
  },
  actions: {
    login({ commit }, data) {
      commit('startLoading');
      axios.post('/login', data).then(response => {
        localStorage.setItem('token', response.data.token.token);
        commit('setUser', response.data.user);
        commit('stopLoading');
      });
    },
    register({ commit }, data) {
      commit('startLoading');
      axios.post('/register', data).then(response => {
        localStorage.setItem('token', response.data.token.token);
        commit('setUser', response.data.user);
        commit('stopLoading');
      });
    },
    getUser({ commit }, token) {
      commit('startLoading');
      return axios.post('/getUser', token).then(response => {
        commit('setUser', response.data);
        commit('stopLoading');
      });
    },
    logout({ commit }) {
      commit('startLoading');
      commit('removeUser');
      localStorage.removeItem('token');
      commit('stopLoading');
    },
    changeLocale({ commit }, locale) {
      axios.post('/changeLocale', { locale });
    },
  },
};

export default auth;
