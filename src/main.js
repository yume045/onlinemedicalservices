import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Argon from "./plugins/argon-kit"
import Vuex from 'vuex'
import store from './store'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2'
import VueChatScroll from 'vue-chat-scroll'
import rate from 'vue-rate';

Vue.use(rate)
Vue.use(VueSweetalert2)
Vue.use(Vuex)
Vue.config.productionTip = false;
Vue.use(Argon)
Vue.use(VueChatScroll)

let storageRef = firebase.storage().ref()
Vue.directive('url', {
  async bind (el, binding) {
    let url = await storageRef.child(binding.value.filename).getDownloadURL()
    el.src = url
    console.log(el.src)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
