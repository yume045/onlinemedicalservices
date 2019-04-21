<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div v-if="users === null">Test</div>
      <div class="container" v-else>
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img src="./assets/user.png" class="rounded-circle">
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button type="info" size="sm" class="mr-4">Message</base-button>
                  <base-button type="default" size="sm" class="float-right">Follow</base-button>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">{{users.height}}</span>
                    <span class="description">CM.</span>
                  </div>
                  <div>
                    <span class="heading">{{users.weight}}</span>
                    <span class="description">Kg.</span>
                  </div>
                  <div>
                    <span class="heading">{{users.bloodtype}}</span>
                    <span class="description">Group Blood</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 row justify-content-center mb-4">
              <h3 class="text-center col-12">
                <span class="font-weight-light">
                  {{users.name + ' ' + users.surname}} ,
                  {{new Date().getFullYear() - new Date(users.birthdate).getFullYear()}}
                </span>
              </h3>
              <div class="h6 text-center font-weight-300 col-12">
                <i class="ni location_pin mr-2"></i>
                {{users.type}} , {{users.gen.toUpperCase()}}
              </div>
              <div v-if="users.type !== 'Member'" class="h6 mt-3 col-xs-12 col-sm-10 col-md-7">
                <b>แผนก</b>
                : {{users.department}}
              </div>
              <div class="h6 mt-3 col-xs-12 col-sm-10 col-md-7">
                <i class="ni ni-building mr-2"></i>
                <b>Address</b>
                : {{users.address}}
              </div>
              <div class="h6 mt-3 col-xs-12 col-sm-10 col-md-7">
                <i class="ni ni-book-bookmark mr-2"></i>
                <b>Phone</b>
                : {{users.numberphone}}
              </div>
              <div class="h6 mt-3 col-xs-12 col-sm-10 col-md-7">
                <b>โรคประจำตัว</b>
                : {{users.disease}}
              </div>
              <div class="h6 mt-3 col-xs-12 col-sm-10 col-md-7">
                <b>ยาที่แพ้</b>
                : {{users.medical}}
              </div>
            </div>
            <div
              v-if="users.type !== 'Member'"
              class="mt-3 py-3 border-top border-grey text-center row justify-content-center"
            >
              <div>
                <b>ประสบการณ์การทำงาน</b>
                : {{users.story}}
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var userRef = database.ref("/Users");
export default {
  name: "Editprofile",
  data() {
    return {
      userKey: this.$route.params.key,
      users: {}
    };
  },
  methods: {},
  mounted() {
    userRef.child(this.userKey).once("value", snap => {
      this.users = snap.val();
    });
    console.log(this.users);
  }
};
</script>
<style>
</style>
