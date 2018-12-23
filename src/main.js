// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(Buefy)

Vue.config.productionTip = false

let storageRef = firebase.storage().ref()
Vue.directive('url', {
  async bind (el, binding) {
    let url = await storageRef.child(binding.value.filename).getDownloadURL()
    el.src = url
    console.log(el.src)
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
