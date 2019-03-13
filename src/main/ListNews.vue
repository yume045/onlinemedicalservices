<template>
  <div class="Home">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="jumbotron bg-secondary container mt--300">
      <h1 v-if="$route.name === 'News'" class="mb-3">ข่าวประชาสัมพันธ์</h1>
      <h1 v-if="$route.name === 'Medicine'" class="mb-3">ยา</h1>
      <h1 v-if="$route.name === 'Disease'" class="mb-3">โรค</h1>
      <div class="row mb-5 justify-content-end">
        <div class="col-xl-8 col-lg-8 col-md-10 col-sm-12">
          <base-input
            alternative
            placeholder="Search topic or keyword"
            addon-left-icon="fa fa-search"
            v-model="search"
            @input="filter()"
          ></base-input>
        </div>
      </div>
      <div class="row mainNews">
        <div
          class="col-xl-4 col-lg-4 col-md-6 col-sm-12"
          :key="key"
          v-for="(news, key) in showData"
        >
          <div class="card mb-3 card-lift--hover shadow border-1">
            <img :src="news.img" style="height: 15rem;margin-left:0%;" class="card-img">
            <div class="card-body">
              <h5 class="card-title">{{news.title.slice(0, 50)}}</h5>
              <p class="card-text" v-html="news.content.slice(0, 150)"></p>
              <p class="card-text">
                <small class="text-muted">
                  <base-button
                    outline
                    type="default"
                    size="sm"
                    v-on:click="select(key)"
                  >อ่านเพิ่มเติม</base-button>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
var database = firebase.database();
var homeadminRef = database.ref("/News");
export default {
  name: "ListNews",
  subadds: "",
  img: "",
  data() {
    return {
      search: "",
      news: "",
      showData: []
    };
  },
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn",
      permission: "user/Per"
    })
  },
  isLoggedIn() {
    return this.$store.getters.isLoggedIn;
  },
  user() {
    return this.$store.getters.user;
  },
  mounted() {
    homeadminRef.orderByChild("type").equalTo(this.$route.name).on("value", snap => {
      this.showData = snap.val();
      console.log(this.showData)
    });
  },
  methods: {
    ...mapActions({
      selectNews: "user/selectNews"
    }),
    select(key) {
      this.selectNews(key);
      this.$router.push("/News/" + key);
    },
    filter() {
      this.showData = []
      if (this.search.length > 0) {
        homeadminRef.orderByChild("type").equalTo(this.$route.name).on("child_added", snap => {
          var val = snap.val();
          if (val.title.toString().search(this.search) >= 0 || 
            val.content.toString().search(this.search) >= 0 || 
            val.tag.toString().search(this.search) >= 0
          ) {
            this.showData.push(val);
          }
        })
      } else {
        homeadminRef.orderByChild("type").equalTo(this.$route.name).on("value", snap => {
          this.showData = snap.val()
        })
      }
      console.log(this.showData)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
