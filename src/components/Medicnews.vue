<template>
  <div class="container">
    <b-card-group>
      <b-card :title="news.addmedic" :img-src="news.addpicturemedic" img-alt="Img" img-top>
        <div class="col-12" v-html="news.addmedic2"></div>
        <div slot="footer">
          <small class="text-muted">Author : Admin</small>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var medicnewsRef = database.ref("/Medicenadmin");
console.log(this.isLoggedIn);
export default {
  name: "Medicnews",
  subadds: "",
  addpicture: "",
  add: "",
  add1: "",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      subadds: "",
      news: ""
    };
  },
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn",
      permission: "user/Per",
      selectNews: "user/selectNews"
    })
  },
  mounted() {
    const newsRef3 = medicnewsRef
      .orderByChild("addmedic")
      .equalTo(this.selectNews);
    newsRef3.on("child_added", snap => {
      this.news = snap.val();
      console.log(this.news);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
