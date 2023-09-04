import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { store } from './store'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://restaurant-api.dicoding.dev'

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
