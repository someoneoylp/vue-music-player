// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.HOST = '/api'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})