import axios from '~/plugins/axios'

const imports = {
  state: {
    imported: [],
    filename: null,
    importSuccess: false,
  },
  mutations: {
    setImported(state, output) {
      state.imported = output
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
      commit('startLoading')
      let formData = new FormData()
      formData.append('csv', file)

      axios.post('/imports/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        commit('setImported', response.data.output.data)
        commit('setFilename', response.data.filename)
        commit('stopLoading')
      })
    },
    importTransactions({ commit }, { columns, filename }) {
      commit('startLoading')
      axios.post('/imports/transactions', { columns, filename }).then(response => {
        commit('setImportSuccess', true)
        commit('setImported', [])
        commit('stopLoading')
      });
    }
  }
}

export default imports
