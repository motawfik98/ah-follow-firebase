import Vue from 'vue'
import VueRouter from 'vue-router'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import Login from '@/components/Login'
import Home from '@/components/Home'

const DEFAULT_TITLE = 'التكليفات الوزاريه'

Vue.use(VueRouter)

const routes = [
    {
        path: "*",
        redirect: "/"
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: 'تسجيل دخول'
        }
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true,
            title: 'الرئيسيه'
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
});

router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});


export default router
