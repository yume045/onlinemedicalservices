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
      <h1 class="mb-3">ข่าวประชาสัมพันธ์</h1>
      <div class="row mb-5 justify-content-end">
        <div class="col-xl-8 col-lg-8 col-md-10 col-sm-12">
          <base-input
            alternative
            placeholder="Search topic or keyword"
            addon-left-icon="fa fa-search"
            v-model="search"
            @input="filter(search)"
          ></base-input>
        </div>
      </div>
      <div class="row mainNews">
        <div
          class="col-xl-4 col-lg-4 col-md-6 col-sm-12"
          :key="key"
          v-for="(subadd, key) in showData"
          v-if="showData.length > 0"
        >
          <div class="card mb-3 card-lift--hover shadow border-1">
            <img :src="subadd.img" style="height: 15rem;margin-left:0%;" class="card-img">
            <div class="card-body">
              <h5 class="card-title">{{subadd.title.slice(0, 50)}}</h5>
              <p class="card-text" v-html="subadd.content.slice(0, 150)"></p>
              <p class="card-text">
                <small class="text-muted">
                  <base-button
                    outline
                    type="default"
                    size="sm"
                    v-on:click="select(subadd.title)"
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
var homeadminRef = database.ref("/Homeadmin");
export default {
  name: "Home",
  subadds: "",
  img: "",
  data() {
    return {
      subadds: [],
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
    homeadminRef.on("value", snap => {
      var data = [];
      snap.forEach(ss => {
        var item = ss.val();
        item.key = ss.key;
        data.push(item);
      });
      this.subadds = data;
      this.showData = data;
      console.log(this.showData)
    });
  },
  methods: {
    ...mapActions({
      selectNews: "user/selectNews"
    }),
    select(subadd) {
      this.selectNews(subadd);
      this.$router.push("/News");
    },
    filter(Search) {
      if (Search.length > 0) {
        this.showData = this.subadds.filter(user => {
          if (user.title.toString().indexOf(Search) >= 0) {
            return user;
          }
        });
      } else {
        this.showData = this.subadds;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
