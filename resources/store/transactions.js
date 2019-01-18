import axios from '~/plugins/axios'

const transactions = {
  state: {
    transactions: [],
    unformattedCount: null
  },
  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions
    },
    updateTransaction(state, transaction) {
      state.transactions = state.transactions.map(
        transact => (transact.id === transaction.id ? transaction : transact)
      )
    },
    setUnformattedCount(state, count) {
      state.unformattedCount = count
    }
  },
  actions: {
    fetchTransactions({ commit }) {
      axios.get('transactions/all').then(response => {
        commit('setTransactions', response.data)
      })
    },
    fetchUnformattedCount({ commit }) {
      axios.get('transactions/count').then(response => {
        commit('setUnformattedCount', response.data.count)
      })
    },
    updateTransactionCategory({ commit }, { categoryId, id }) {
      axios
        .patch(`transactions/${id}`, { category_id: categoryId })
        .then(response => {
          commit('updateTransaction', response.data)
        })
    },
    updateTransactionIgnored({ commit }, { isIgnored, id }) {
      axios
        .patch(`transactions/${id}`, { is_ignored: isIgnored })
        .then(response => {
          commit('updateTransaction', response.data)
        })
    },
    format({ commit }) {
      axios.get('transactions/format')
    }
  }
}

export default transactions
