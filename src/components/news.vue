<template>
  <div class="jumbotron jumbotron-fluid">
  <div class="container" :key="key" v-for="(subadd, key) in subadds">
    <h1 class="display-4">{{subadd.add}}</h1>
    <p class="lead">{{subadd.add1}}</p>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var newsRef = database.ref('/Homeadmin')
console.log(this.isLoggedIn)
export default {
  name: 'Home',
  subadds: '',
  addpicture: '',
  add: '',
  add1: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      subadds: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/user',
      Checklogin: 'user/isLoggedIn',
      permission: 'user/Per'
    })
  },
  isLoggedIn () {
    return this.$store.getters.isLoggedIn
  },
  user () {
    return this.$store.getters.user
  },
  mounted () {
    newsRef.on('value', snap => {
      this.subadds = snap.val()
      console.log(this.subadds)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
