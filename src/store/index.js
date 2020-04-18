import Vue from 'vue'
import Vuex from 'vuex'

const firebaseConfig = require('../firebaseConfig')

Vue.use(Vuex)

firebaseConfig.auth.onAuthStateChanged(user => {
    if (user) {
        firebaseConfig.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('setUserProfile', doc.data())
        })
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')
    }
})


const store = new Vuex.Store({
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
                let documentData = res.data();
                commit('setUserProfile', documentData)
                let classification = documentData.classification;
                if (classification !== null) {
                    if (classification === 1)
                        state.userProfile.stringClassification = "الوزير"
                    else if (classification === 2)
                        state.userProfile.stringClassification = "متابع"
                    else if (classification === 3)
                        state.userProfile.stringClassification = "قائم به"
                }
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
export default store