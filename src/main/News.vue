<template>
  <div class="News">
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
        <img :src="news.img" style="height: 30rem;margin-left:0%;" class="card-img">
        <div class="card-body">
          <h5 class="card-title">{{news.title}}</h5>
          <p class="card-text" v-html="news.content"></p>
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
var newsRef = database.ref("/Homeadmin");
var newsRef1 = database.ref("/Homeadmin");
export default {
  name: "News",
  subadds: [],
  img: "",
  title: "",
  content: "",
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
    newsRef.on("value", snap => {
      this.subadds = snap.val();
      console.log(this.subadds);
    });
    const newsRef2 = newsRef1.orderByChild("title").equalTo(this.selectNews);
    newsRef2.on("child_added", snap => {
      this.news = snap.val();
      console.log(this.news);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
