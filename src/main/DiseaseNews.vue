<template>
  <div class="MedicNews">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <div class="col-lg-8 col-xl-8 col-md-12 col-sm-12 mt--300 container">
      <div class="card mb-3 shadow border-1">
        <img :src="news.addpicturedisease" style="height: 30rem;margin-left:0%;" class="card-img">
        <div class="card-body">
          <h5 class="card-title">{{news.adddisease}}</h5>
          <p class="card-text" v-html="news.adddisease2"></p>
          <p class="card-text">
            <small class="text-muted"></small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var diseaseadminRef = database.ref('/Diseaseadmin')
var diseaseadminRef1 = database.ref('/Diseaseadmin')
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
