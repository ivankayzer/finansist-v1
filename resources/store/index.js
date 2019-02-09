import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import categories from './categories'
import imports from './import'
import transactions from './transactions'
import actions from './actions'
import reports from './reports'
import misc from './misc'
import budgets from './budgets'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      categories,
      imports,
      transactions,
      actions,
      reports,
      misc,
      budgets
    }
  })

export default store
