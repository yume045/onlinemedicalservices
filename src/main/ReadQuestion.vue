<template>
  <div class="ReadQuestion">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="jumbotron bg-secondary container mt--300 shadow rounded">
      <div class="card shadow rounded">
        <div class="row">
          <div class="col-3 border-right text-center">
            <div height="80px" width="80px">
              <h5>
                <i class="ni ni-send float-right text-primary"></i>
              </h5>
              <img src="./assets/users.svg" height="80px" width="80px" class="doctor">
              <br>
              <h6 class="text-center mb-4">
                <user-by-key :userKey="showData.users"></user-by-key>
                <small
                  class="bottom-time"
                >{{new Date(showData.timestamp).toLocaleTimeString('en-US')}} {{new Date(showData.timestamp).toLocaleDateString('en-US')}}</small>
              </h6>
            </div>
          </div>
          <div class="col-9 mt-2">
            <h6>คำถาม ?</h6>
            {{showData.message}}
            <br>
            <h6 class="mt-3">เอกสารที่แนบมา</h6>
            <img :src="showData.img" height="250px">
          </div>
        </div>
      </div>

      <div class="card" v-for="(answer, key) in showData.ans" :key="key">
        <div class="row">
          <div class="col-3 border-right text-center">
            <div height="80px" width="80px">
              <h5>
                <i class="ni ni-curved-next float-right text-danger"></i>
              </h5>
              <img src="./assets/users.svg" height="80px" width="80px" class="doctor">
              <br>
              <h6 class="text-center mb-4">
                <user-by-key :userKey="answer.users"></user-by-key>
              </h6>
              <small
                class="bottom-time"
              >{{new Date(answer.timestamp).toLocaleTimeString('en-US')}} {{new Date(answer.timestamp).toLocaleDateString('en-US')}}</small>
            </div>
          </div>
          <div class="col-9">
            <h6>ตอบกลับ</h6>
            {{answer.message}}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="row Answer mt-2">
          <div class="col-3 border-right text-center">
            <div height="80px" width="80px">
              <h5>
                <i class="ni ni-curved-next float-right text-danger"></i>
              </h5>
              <img src="./assets/users.svg" height="80px" width="80px" class="doctor">
              <br>
              <h6 class="text-center">
                <user-by-key :userKey="profile.userKey"></user-by-key>
              </h6>
            </div>
          </div>
          <div class="col-9">
            <textarea
              class="form-control form-control mb-1"
              rows="3"
              placeholder="ตอบกลับ"
              v-model="data.message"
            ></textarea>
            <base-button type="danger" class="mb-3 float-right" v-on:click="sendAnswer(key)">ตอบกลับ</base-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import UserByKey from "@/main/components/UserByKey";
var database = firebase.database();
var questionRef = database.ref("/Question");
export default {
  name: "ReadQuestion",
  data() {
    return {
      showData: {},
      data: {}
    };
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  components: {
    UserByKey
  },
  methods: {},
  mounted() {
    questionRef.child(this.$route.params.key).on("value", snap => {
      console.log(snap.val());
      this.showData = snap.val();
    });
  }
};
</script>
<style>
</style>
