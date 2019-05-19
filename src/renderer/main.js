import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI, {locale})
Vue.use(BootstrapVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

var config = {
    apiKey: "AIzaSyCEMa4FYirvwwdBvA3HGwBF7wwMSnfOZW8",
    authDomain: "study-support.firebaseapp.com",
    databaseURL: "https://study-support.firebaseio.com",
    projectId: "study-support",
    storageBucket: "study-support.appspot.com",
    messagingSenderId: "494439239043"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
