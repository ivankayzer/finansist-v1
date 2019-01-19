import axios from '~/plugins/axios'

const reports = {
  state: {
    min: null,
    max: null,
    keys: [],
    values: []
  },
  mutations: {
    setDates(state, { min, max }) {
      state.min = new Date(min)
      state.max = new Date(max)
    },
    setReportData(state, { keys, values }) {
      state.keys = keys
      state.values = values
    },
    clearReport(state) {
      state.keys = []
      state.values = []
    }
  },
  actions: {
    getDateRangeForReport({ commit }) {
      axios.get('/reports/dates').then(response => {
        commit('setDates', response.data)
      })
    },
    generateReport({ commit }, data) {
      axios
        .post('/reports/generate', data)
        .then(response => commit('setReportData', response.data))
    }
  }
}

export default reports
