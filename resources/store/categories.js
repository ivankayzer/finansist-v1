import axios from '~/plugins/axios';

const auth = {
  state: {
    categories: [],
  },
  mutations: {
    addCategory(state, category) {
      state.categories = [...state.categories, category];
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    deleteCategory(state, id) {
      state.categories = state.categories.filter(
        category => category.id !== id
      );
    },
  },
  actions: {
    getCategories({ commit }) {
      axios.get('/categories').then(response => {
        commit('setCategories', response.data);
      });
    },
    addCategory({ commit }, data) {
      axios.post('/categories/add', data).then(response => {
        commit('addCategory', response.data);
      });
    },
    removeCategory({ commit }, { id }) {
      axios.delete(`/categories/${id}`).then(() => {
        commit('deleteCategory', id);
      });
    },
  },
  getters: {
    categories: state => state.categories,
  },
};

export default auth;
