import axios from '~/plugins/axios'

const actions = {
  state: {
    actions: []
  },
  mutations: {
    setActions(state, actions) {
      state.actions = actions
    },
    deleteAction(state, id) {
      state.actions = state.actions.filter(action => action.id !== id)
    },
  },
  actions: {
    fetchActions({ commit }) {
      axios.get('/actions/all').then(response => commit('setActions', response.data))
    },
    saveAction({ commit }, action) {
      axios.post('/actions', { action }).then(response => {
        console.log(response)
      })
    },
    updateAction({ commit }, action) {
      axios.patch('/actions/' + action.id, { action }).then(response => {
        console.log(response)
      })
    },
    deleteAction({ commit }, action) {
      axios.delete('/actions/' + action.id, { action }).then(response => {
        commit('deleteAction', action.id)
      })
    }
  }
}

export default actions
