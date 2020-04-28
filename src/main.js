import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const fb = require('./firebaseConfig.js')
import './assets/css/app.css'
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import infiniteScroll from 'vue-infinite-scroll'
import { FormFilePlugin } from 'bootstrap-vue'

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(infiniteScroll)
Vue.use(FormFilePlugin)

import './vee-validator'


Vue.config.productionTip = false

let app;
fb.auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App),
            created() {
                let htmlEl = document.querySelector("html");
                htmlEl.setAttribute('dir', 'rtl');
                htmlEl.setAttribute('lang', 'ar')
            }
        }).$mount('#app')
    }
})

