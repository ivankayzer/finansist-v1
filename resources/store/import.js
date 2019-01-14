import axios from '~/plugins/axios'

const imports = {
  state: {
    transactions: [],
    filename: null,
    importSuccess: false,
  },
  mutations: {
    setTransactions(state, output) {
      state.transactions = output
    },
    setFilename(state, filename) {
      state.filename = filename
    },
    setImportSuccess(state, status) {
      state.importSuccess = status
    }
  },
  actions: {
    uploadCsv({ commit }, file) {
      let formData = new FormData()
      formData.append('csv', file)

      axios.post('/imports/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        commit('setTransactions', response.data.output.data)
        commit('setFilename', response.data.filename)
      })
    },
    importTransactions({ commit }, { columns, filename }) {
      axios.post('/imports/transactions', { columns, filename }).then(response => {
        commit('setImportSuccess', true)
        commit('setTransactions', [])
      });
    }
  }
}

export default imports
