import axios from '~/plugins/axios'

const reports = {
  state: {
    min: null,
    max: null
  },
  mutations: {
    setDates(state, { min, max }) {
      state.min = new Date(min)
      state.max = new Date(max)
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
        .then(response => console.log(response))
    }
  }
}

export default reports
