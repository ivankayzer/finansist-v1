import axios from '~/plugins/axios';

const auth = {
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
        login({ commit }, data) {
            axios.post('/login', data).then((response) => {
                localStorage.setItem('token', response.data.token.token);
                commit('setUser', response.data.user)
            });
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
}

export default auth;