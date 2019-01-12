import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import categories from './categories'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        auth,
        categories
    }
})

export default store