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
    replaceAction(state, { idToReplace, action }) {
      state.actions = state.actions.map(
        oldAction =>
          oldAction.internal_id === idToReplace ? action : oldAction
      )
    }
  },
  actions: {
    fetchActions({ commit }) {
      commit('startLoading')
      axios
        .get('/actions/all')
        .then(response => {
          commit('setActions', response.data)
          commit('stopLoading')
        })
    },
    saveAction({ commit }, action) {
      axios.post('/actions', { action }).then(response => {
        commit('replaceAction', response.data)
      })
    },
    updateAction({ commit }, action) {
      axios.patch('/actions/' + action.id, { action })
    },
    deleteAction({ commit }, action) {
      axios.delete('/actions/' + action.id, { action }).then(response => {
        commit('deleteAction', action.id)
      })
    }
  }
}

export default actions
