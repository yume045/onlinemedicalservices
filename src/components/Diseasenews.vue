<template>
  <div class="container">
    <b-card-group>
      <b-card :title="news.adddisease" :img-src="news.addpicturedisease" img-alt="Img" img-top>
        <div class="col-12" v-html="news.adddisease2"></div>
        <div slot="footer">
          <small class="text-muted">Author : Admin</small>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var diseaseadminRef = database.ref('/Diseaseadmin')
var diseaseadminRef1 = database.ref('/Diseaseadmin')
console.log(this.isLoggedIn)
export default {
  name: 'Diseasenews',
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
    diseaseadminRef.on('value', snap => {
      this.subadds = snap.val()
      console.log(this.subadds)
    })
    const diseaseadminRef2 = diseaseadminRef1.orderByChild('adddisease').equalTo(this.selectNews)
    diseaseadminRef2.on('child_added', snap => {
      this.news = snap.val()
      console.log(this.news)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
