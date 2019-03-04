<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h4>Login</h4>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="ชื่อผู้ใช้"
                  addon-left-icon="ni ni-circle-08"
                  type="text"
                  v-model="username"
                ></base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="รหัสผ่าน"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                ></base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" v-on:click="loginWeb()">Login</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="/" class="text-light">
                <small>หน้าหลัก</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <router-link to="/Register" class="text-light">
                <small>สมัครสมาชิก</small>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      username: "",
      password: "",
      hasprofile: {},
      users: ""
    };
  },
  methods: {
    ...mapActions({
      signIn: "user/signIn"
    }),
    async loginWeb(e) {
      const dbRefObject = await firebase
        .database()
        .ref()
        .child("User");
      const dbReflist = await dbRefObject.child(this.username);
      dbReflist.on("child_added", snap => {
        this.hasprofile = snap.val();
        console.log(this.hasprofile);
      });
      console.log("data -> ", this.hasprofile);
      if (this.hasprofile !== null) {
        console.log(this.hasprofile.username, this.hasprofile.password);
        if (
          this.hasprofile.username === this.username &&
          this.hasprofile.password === this.password
        ) {
          const userSet = this.hasprofile.username;
          const Per = this.hasprofile.Permistion;
          console.log(userSet, Per);
          this.signIn({ userSet, Per });
          if (this.hasprofile.Permistion === 3) {
            this.$router.push("/Homeadmin");
            alert("welcome back Administrator");
          }
          if (this.hasprofile.Permistion === 2) {
            this.$router.push("/Question");
            alert("welcome back Doctor");
          }
          if (this.hasprofile.Permistion === 1) {
            this.$router.push("/Question");
            alert("welcome to Online-medical-service");
          }
        } else alert("Username Or Password incorrect");
      } else {
      }
      this.hasprofile = {};
      this.username = "";
      this.password = "";
    }
  },
  computed: {
    ...mapGetters({
      user: "users"
    }),
    isLoggedIn() {
      return 0;
      //  return this.$store.getters.isLoggedIn
    },
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    const dbRefObject = firebase
      .database()
      .ref()
      .child("User");
    console.log(dbRefObject);
    dbRefObject.on("value", snap => {
      this.users = snap.val();
      console.log("boom");
      console.log(this.user);
    });
  }
};
</script>
<style>
</style>
