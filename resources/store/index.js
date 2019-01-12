import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import categories from './categories'
import imports from './import'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        auth,
        categories,
        imports
    }
})

export default store