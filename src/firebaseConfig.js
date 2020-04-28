// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions"
import "firebase/storage"

const config = {
    apiKey: "AIzaSyA98Ljx4QiOJQn1g6r61-TzE-wBzReQBXU",
    authDomain: "ah-follow-firebase.firebaseapp.com",
    databaseURL: "https://ah-follow-firebase.firebaseio.com",
    projectId: "ah-follow-firebase",
    storageBucket: "ah-follow-firebase.appspot.com",
    messagingSenderId: "769070952222",
    appId: "1:769070952222:web:ab88f563707b7c1854a30f",
    measurementId: "G-GYSSBB7ERW"
};
firebase.initializeApp(config);

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const functions = firebase.functions()
const storage = firebase.storage().ref()

// firebase collections
const usersCollection = db.collection('users')
const tasksCollection = db.collection('tasks')
const followingUsersTasksCollection = db.collection('followingUsersTasks')
const workingOnUsersTasksCollection = db.collection('workingOnUsersTasks')
const notificationsCollection = db.collection('notifications')
const devicesTokensCollection = db.collection('devicesTokens')
const filesCollection = db.collection('files')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    tasksCollection,
    followingUsersTasksCollection,
    workingOnUsersTasksCollection,
    notificationsCollection,
    devicesTokensCollection,
    filesCollection,
    functions,
    storage
}