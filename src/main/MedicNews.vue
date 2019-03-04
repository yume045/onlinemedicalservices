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
        <img :src="news.addpicturemedic" style="height: 30rem;margin-left:0%;" class="card-img">
        <div class="card-body">
          <h5 class="card-title">{{news.addmedic}}</h5>
          <p class="card-text" v-html="news.addmedic2"></p>
          <p class="card-text">
            <small class="text-muted"></small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var medicnewsRef = database.ref("/Medicenadmin");
export default {
  name: "MedicNews",
  subadds: "",
  addpicture: "",
  add: "",
  add1: "",
  data() {
    return {
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
