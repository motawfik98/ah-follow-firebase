import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/app.css'
import { ValidationObserver, ValidationProvider } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver)

import './vee-validator'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let htmlEl=document.querySelector("html");
    htmlEl.setAttribute('dir','rtl');
    htmlEl.setAttribute('lang','ar')
  }
}).$mount('#app')
