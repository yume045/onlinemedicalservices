<template>
  <div class="container">
    <b-card-group>
      <b-card :title="news.title" :img-src="news.img" img-alt="Img" img-top>
          <div class="col-12" v-html="news.content"></div>
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
var newsRef = database.ref("/Homeadmin");
var newsRef1 = database.ref("/Homeadmin");
console.log(this.isLoggedIn);
export default {
  name: "Home",
  subadds: "",
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
