<template>
  <div class="jumbotron jumbotron-fluid">
  <div class="container" :key="key" v-for="(board, key) in news">
    <h1 class="display-4">{{board}}</h1>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var medicnewsRef = database.ref('/Medicenadmin')
console.log(this.isLoggedIn)
export default {
  name: 'Medicnews',
  subadds: '',
  addpicture: '',
  add: '',
  add1: '',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      subadds: '',
      news: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/user',
      Checklogin: 'user/isLoggedIn',
      permission: 'user/Per',
      selectNews: 'user/selectNews'
    })
  },
  mounted () {
    const newsRef3 = medicnewsRef.orderByChild('addmedic').equalTo(this.selectNews)
    newsRef3.on('child_added', snap => {
      this.news = snap.val()
      console.log(this.news)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
