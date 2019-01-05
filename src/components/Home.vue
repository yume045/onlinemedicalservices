<template>
  <div class="hello">
    <div style="margin-left:35%;">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              <div class="col">
                <input
                  class="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Search topics or keywords"
                  v-model="search"
                  @input="filter(search)"
                >
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="news !== ''">{{news}}</div>
    </div>
    <div>
      <br>
    </div>
    <form action>
      <div class="container">
        <div class="row">
          <div
            class="column is-one-third"
            :key="key"
            v-for="(subadd, key) in subadds"
            v-if="!showData.length > 0"
          >
            <div class="col-sm">
              <b-card
                title
                img-src
                v-bind:src="subadd.img"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;margin-left:0%;"
                class="mb-2"
              >
                <p class="card-text">
                  <img v-bind:src="subadd.img" style="width: 250px; height: 250px;">
                </p>
                <b class="card-text h4" >{{subadd.title.slice(0, 50)}}</b>
                <div class="card-text" v-html="subadd.content.slice(0, 50)"></div>
                <b-button
                  @click="select(subadd.title)"
                  variant="primary"
                  class="button is-medium is-info"
                >อ่านเพิ่มเติม</b-button>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </form>
    <form action>
      <div class="container">
        <div class="row">
          <div
            class="column is-one-third"
            :key="key"
            v-for="(subadd, key) in showData"
            v-if="showData.length > 0"
          >
            <div class="col-sm">
              <b-card
                title
                img-src
                v-bind:src="subadd.img"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;margin-left:0%;"
                class="mb-2"
              >
                <p class="card-text">
                  <img v-bind:src="subadd.img" style="width: 250px; height: 250px;">
                </p>
                <p class="card-text">{{subadd.title.slice(0, 50)}}</p>
                <p class="card-text">{{subadd.content.slice(0, 50)}}</p>
                <b-button
                  @click="select(subadd.title)"
                  variant="primary"
                  class="button is-info"
                >อ่านเพิ่มเติม</b-button>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
var database = firebase.database();
var homeadminRef = database.ref("/Homeadmin");
console.log(this.isLoggedIn);
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
      console.log(this.subadds);
    });
  },
  methods: {
    ...mapActions({
      selectNews: "user/selectNews"
    }),
    select(subadd) {
      this.selectNews(subadd);
      this.$router.push("/news");
    },
    filter(Search) {
      if (Search.length > 0) {
        this.showData = this.subadds.filter(user => {
          if (user.title.toString().indexOf(Search) >= 0) {
            return user;
          }
        });
      } else {
        this.showData = [];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.form-control-borderless {
  border: none;
}

.form-control-borderless:hover,
.form-control-borderless:active,
.form-control-borderless:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
</style>
