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
                <small>Login</small>
                <br />
                <img :src="require('../assets/logo.png')" height="40px" />
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="ชื่อผู้ใช้"
                  addon-left-icon="ni ni-circle-08"
                  type="text"
                  v-model="username"
                  v-on:keyup.enter="loginWeb()"
                ></base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="รหัสผ่าน"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  v-on:keyup.enter="loginWeb()"
                ></base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="loginWeb()">Login</base-button>
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
      username: "",
      password: "",
      hasprofile: {},
      users: ""
    };
  },
  methods: {
    ...mapActions({
      signIn: "user/signIn",
      setKey: "user/setKey",
      save: "user/save"
    }),
    async loginWeb() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel
      });
      const dbRefObject = firebase
        .database()
        .ref()
        .child("Users");
      await dbRefObject.child(this.username).once("value", snap => {
        const val = snap.val();
        if (val !== null) {
          if (val.password === this.password) {
            const userSet = val.username;
            const userKey = snap.key;
            const status = val.Permistion;
            this.signIn({ userSet, status, val });
            this.setKey({ userKey });
            this.save();
            firebase
              .database()
              .ref("/stats/viewer")
              .push({
                user: this.username,
                timestamp: Date.now()
              });
            loader.hide();
            if (val.Permistion === "Admin") {
              this.$router.push("/Home");
              alert("welcome back Administrator");
            }
            if (val.Permistion === "Doctor") {
              this.$router.push("/Home");
              alert("welcome back Doctor");
            }
            if (val.Permistion === "Member") {
              this.$router.push("/Home");
              alert("welcome to Online-medical-service");
            }
          } else {
            loader.hide();
            alert("incorrect password !!");
          }
        } else {
          loader.hide();
          alert("incorrect username !!");
        }
        this.hasprofile = {};
        this.username = "";
        this.password = "";
      });
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
  }
};
</script>
<style>
</style>
