const misc = {
  state: {
    loading: true,
  },
  mutations: {
    stopLoading(state) {
      state.loading = false;
    },
    startLoading(state) {
      state.loading = true;
    },
    init(state) {
      state.loading = false;
    },
  },
};

export default misc;
