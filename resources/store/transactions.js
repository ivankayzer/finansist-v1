import axios from '~/plugins/axios'

const transactions = {
  state: {
    transactions: []
  },
  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions;
    }
  },
  actions: {
    fetchTransactions({ commit }) {
      axios.get('transactions/all').then(response => {
        commit('setTransactions', response.data)
      })
    }
  }
}

export default transactions
