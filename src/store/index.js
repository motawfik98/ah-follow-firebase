import Vue from 'vue'
import Vuex from 'vuex'

const firebaseConfig = require('../firebaseConfig')

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: null,
        nonVerifiedUser: null,
        userProfile: {},
        flashStatus: null,
        flashMessage: null,
    },
    actions: {
        fetchUserProfile({commit, state}) {
            firebaseConfig.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        clearData({commit}) {
            commit('setCurrentUser', null)
            commit('setNonVerifiedUser', null)
            commit('setUserProfile', {})
            commit('setPosts', null)
        },
        clearFlashMessage({commit}) {
            commit('setFlashStatus', null)
            commit('setFlashMessage', null)
            commit('setNonVerifiedUser', null)
        }
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setNonVerifiedUser(state, val) {
            state.nonVerifiedUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setFlashStatus(state, val) {
            state.flashStatus = val
        },
        setFlashMessage(state, val) {
            state.flashMessage = val
        },
        setFlash(state, val) {
            state.flashStatus = val.status
            state.flashMessage = val.message
            setTimeout(() => {
                state.flashStatus = null
                state.flashMessage = null
            }, 4000)
        },
        setFlashWithEmailResend(state, val) {
            state.flashStatus = val.status
            state.flashMessage = val.message
            state.nonVerifiedUser = val.nonVerifiedUser

            setTimeout(() => {
                state.flashStatus = null
                state.flashMessage = null
                state.nonVerifiedUser = null
            }, 4000)
        }
    },
    modules: {}
})
