import Vue from 'vue'
import Vuex from 'vuex'
import axios from '~/plugins/axios';

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        removeUser(state) {
            state.user = {};
        }
    },
    actions: {
        login(context, data) {
            axios.post('/login', data);
        },
        register({ commit }, data) {
            axios.post('/register', data).then((response) => {
                localStorage.setItem('token', response.data.token.token);
                commit('setUser', response.data.user)
            })
        },
        getUser({ commit }, token) {
            axios.post('/getUser', token).then((response) => {
                commit('setUser', response.data)
            })
        },
        logout({ commit }) {
            commit('removeUser');
            localStorage.removeItem('token');
        }
    }
})

export default store