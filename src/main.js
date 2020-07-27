import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueGeolocation from 'vue-browser-geolocation'
import VueSkyCons from 'vue-skycons'

Vue.config.productionTip = false

Vue.use(VueSkyCons)
Vue.use(VueGeolocation);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

