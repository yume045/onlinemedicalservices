<template>
  <div class="jumbotron jumbotron-fluid">
  <div class="tile is-ancestor">
  <div class="tile is-3 is-vertical is-parent">
    <div class="tile is-child box">
      <p class="title">{{news.add}}</p>
      <img v-bind:src= "news.addpicture">
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title">ข้อมูลเพิ่มเติม</p>
      <p>{{news.add1}}</p>
    </div>
  </div>
</div>
</div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var newsRef = database.ref('/Homeadmin')
var newsRef1 = database.ref('/Homeadmin')
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
    newsRef.on('value', snap => {
      this.subadds = snap.val()
      console.log(this.subadds)
    })
    const newsRef2 = newsRef1.orderByChild('add').equalTo(this.selectNews)
    newsRef2.on('child_added', snap => {
      this.news = snap.val()
      console.log(this.news)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
