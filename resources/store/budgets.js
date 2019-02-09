import axios from '~/plugins/axios'

const actions = {
  state: {
    budgets: []
  },
  mutations: {
    setBudgets(state, budgets) {
      state.budgets = budgets
    },
    deleteBudget(state, id) {
      state.budgets = state.budgets.filter(budget => budget.id !== id)
    },
  },
  actions: {
    fetchBudgets({ commit }) {
      commit('startLoading')
      axios
        .get('/budgets/all')
        .then(response => {
          commit('setBudgets', response.data)
          commit('stopLoading')
        })
    },
    saveBudget({ commit }, budget) {
      commit('startLoading')
      axios.post('/budgets', { budget }).then(() => commit('stopLoading'))
    },
    deleteBudget({ commit }, id) {
      axios.delete('/budgets/' + id).then(response => {
        commit('deleteBudget', id)
      })
    }
  }
}

export default actions
