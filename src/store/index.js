import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {currentUser} from "@/firebaseConfig";

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
        task: null,
        tasks: [],
        followingUsers: [],
        workingOnUsers: [],
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
            commit('setTask', null)
            commit('setTasks', [])
            commit('setFollowingUsers', [])
            commit('setWorkingOnUsers', [])
        },
        clearFlashMessage({commit}) {
            commit('setFlashStatus', null)
            commit('setFlashMessage', null)
            commit('setNonVerifiedUser', null)
        },
        createNewTask({commit}) {
            commit('setTask', {
                isNew: true,
                uid: currentUser.uid
            })
        },
        fetchFollowersUsers({commit}) {
            fetchUsersType(2).then(followingUsers => {
                commit('setFollowingUsers', followingUsers)
            })
        },
        fetchWorkingOnUsers({commit}) {
            fetchUsersType(3).then(workingOnUsers => {
                commit('setWorkingOnUsers', workingOnUsers)
            })
        },
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
        },
        setTasks(state, val) {
            state.tasks = val
        },
        setTask(state, val) {
            state.task = val
        },
        setFollowingUsers(state, val) {
            state.followingUsers = val
        },
        setWorkingOnUsers(state, val) {
            state.workingOnUsers = val
        }
    },
    plugins: [
        createPersistedState({
            paths: ['task', 'followingUsers', 'workingOnUsers']
        })
    ],
    modules: {}
})
export default store


async function fetchUsersType(classification) {
    let users = []
    await firebaseConfig.usersCollection.where("classification", "==", classification)
        .get()
        .then(docs => {
            docs.forEach(doc => {
                let user = doc.data()
                user.uid = doc.id
                users.push(user)
            })
        })
    return users
}