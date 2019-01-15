import axios from '~/plugins/axios'

const transactions = {
  state: {
    transactions: []
  },
  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions
    },
    updateTransaction(state, transaction) {
      state.transactions = state.transactions.map(transact => transact.id === transaction.id ? transaction : transact)
    }
  },
  actions: {
    fetchTransactions({ commit }) {
      axios.get('transactions/all').then(response => {
        commit('setTransactions', response.data)
      })
    },
    updateTransactionCategory({ commit }, { categoryId, id }) {
      axios.patch(`transactions/${id}`, { category_id: categoryId }).then(response => {
        commit('updateTransaction', response.data)
      })
    },
    updateTransactionIgnored({ commit }, { isIgnored, id }) {
      axios.patch(`transactions/${id}`, { is_ignored: isIgnored }).then(response => {
        commit('updateTransaction', response.data)
      })
    }
  }
}

export default transactions
