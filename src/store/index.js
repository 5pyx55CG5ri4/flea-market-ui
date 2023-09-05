import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: {},
        userInfo: {}
    },
    getters: {},
    mutations: {
        setToken(state, newSetToken) {
            state.token = newSetToken
        },
        setUserInfo(state, newUserInfo) {
            state.userInfo = newUserInfo
        },
    },
    actions: {},
    modules: {}
})
