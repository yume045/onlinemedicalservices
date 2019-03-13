<template>
  <div class="Medicine">
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
      <h1 class="mb-3">โรค</h1>
      <div class="row justify-content-end">
        <div class="col-xl-8 col-lg-8 col-md-10 col-sm-12">
          <base-input
            alternative
            placeholder="Search topic or keyword"
            addon-left-icon="fa fa-search"
            v-model="search"
            @input="filter(search)"
            @keyup.enter.native="insertUser()"
          ></base-input>
        </div>
      </div>
      <div class="row mb-5 justify-content-end">
        <div class="col-7">
          <small class="float-left mr-2">คำค้นหา : </small>
          <div class="mr-2 float-left" :key="key" v-for="(hit, key) in show">
           <badge type="default">{{hit.search}}</badge>
          </div>
        </div>
      </div>
      <div class="row mainNews">
        <div
          class="col-xl-4 col-lg-4 col-md-6 col-sm-12"
          :key="key"
          v-for="(val, key) in showData"
          v-if="showData.length > 0"
        >
          <div class="card mb-3 card-lift--hover shadow border-1">
            <img
              :src="val.addpicturedisease"
              style="height: 15rem;margin-left:0%;"
              class="card-img"
            >
            <div class="card-body">
              <h5 class="card-title">{{val.adddisease.slice()}}</h5>
              <p class="card-text" v-html="val.adddisease2.slice(0,150)"></p>
              <p class="card-text">
                <small class="text-muted">
                  <base-button
                    outline
                    type="default"
                    size="sm"
                    v-on:click="selectDis(val.adddisease)"
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
var diseaseadminRef = database.ref("/Diseaseadmin");
var diseaseadminRef1 = database.ref("/Poppulardisease");
var diseaseadminRef2 = database.ref("/Poppulardisease");
export default {
  name: "Disease",
  data() {
    return {
      add: "",
      add1: "",
      subadds: [],
      addpicturedisease: "",
      subadddiseases: "",
      adddisease: "",
      adddisease2: "",
      showData: [],
      search: "",
      show: "",
      show1: ""
    };
  },
  methods: {
    ...mapActions({
      selectNews: "user/selectNews"
    }),
    insertMedic() {
      let tmp = {
        adddisease: this.adddisease,
        adddisease2: this.adddisease2,
        addpicturedisease: this.addpicturedisease
      };
      diseaseadminRef.push(tmp);
      this.adddisease = "";
      this.adddisease2 = "";
      this.addpicturedisease = "";
    },
    selectDis(adddisease) {
      this.selectNews(adddisease);
      this.$router.push("/DiseaseNews");
    },
    filter(Search) {
      if (Search.length > 0) {
        this.showData = this.subadds.filter(val => {
          if (
            val.adddisease.toString().indexOf(Search) >= 0 ||
            val.type.toString().indexOf(Search) >= 0
          ) {
            return val;
          }
        });
      } else {
        this.showData = this.subadds;
      }
    },
    insertUser() {
      let getkey = "";
      let getsearch = "";
      const dbReflist = diseaseadminRef1
        .orderByChild("search")
        .equalTo(this.search);
      dbReflist.on("child_added", snap => {
        getsearch = snap.val();
        getkey = snap.key;
        console.log(getsearch);
      });
      if (getsearch === "") {
        console.log("showif");
        let tmp = {
          search: this.search,
          count: 1
        };
        diseaseadminRef1.push(tmp);
        this.search = "";
      } else {
        let update = getsearch.count + 1;
        diseaseadminRef1
          .child(getkey)
          .child("count")
          .set(update);
      }
      this.search = "";
    }
  },
  mounted() {
    diseaseadminRef.on("value", snap => {
      var data = [];
      snap.forEach(ss => {
        var item = ss.val();
        item.key = ss.key;
        data.push(item);
      });
      this.subadds = data;
      this.showData = data;
    });
    diseaseadminRef1
      .orderByChild("count")
      .limitToLast(5)
      .on("value", snap => {
        this.show = snap.val();
        console.log(this.show);
      });
    diseaseadminRef2.on("value", snap => {
      this.show1 = snap.val();
      console.log(this.show1);
    });
  },
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
