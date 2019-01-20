import axios from '~/plugins/axios'

const transactions = {
  state: {
    transactions: [],
    unformatted: []
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
    setUnformatted(state, transactions) {
      state.unformatted = transactions
    }
  },
  actions: {
    fetchTransactions({ commit }) {
      axios.get('transactions/all').then(response => {
        commit('setTransactions', response.data)
      })
    },
    fetchUnformatted({ commit }) {
      axios.get('transactions/unformatted').then(response => {
        commit('setUnformatted', response.data)
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
    format({ dispatch }) {
      axios.get('transactions/format').then(() => {
        dispatch('fetchTransactions')
        dispatch('fetchUnformatted')
      })
    }
  }
}

export default transactions
