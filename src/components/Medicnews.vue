<template>
  <div class="jumbotron jumbotron-fluid">
  <div class="tile is-ancestor">
  <div class="tile is-3 is-vertical is-parent">
    <div class="tile is-child box">
      <p class="title">{{news.addmedic}}</p>
      <img v-bind:src= "news.addpicturemedic">
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title">ข้อมูลเพิ่มเติม</p>
      <p>{{news.addmedic2}}</p>
    </div>
  </div>
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
