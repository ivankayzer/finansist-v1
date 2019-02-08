import axios from '~/plugins/axios'

const actions = {
  state: {
    budgets: []
  },
  mutations: {
    setBudgets(state, budgets) {
      state.budgets = budgets
    }
  },
  actions: {
    saveBudget({ commit }, budget) {
      commit('startLoading')
      axios.post('/budgets', { budget }).then(() => commit('stopLoading'))
    },
  }
}

export default actions
