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
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      src="./assets/user.png"
                      class="rounded-circle"
                    >
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
            <div class="mt-1">
              <h3 class="text-center">
                <span class="font-weight-light"> {{users.name + ' ' + users.surname}}, {{new Date().getFullYear() - users.birthdate.substr(0,4)}}</span>
              </h3>
              <div class="h6 text-center font-weight-300">
                <i class="ni location_pin mr-2"></i> {{users.type}} , {{users.gen.toUpperCase()}}
              </div>
              <div class="ml-5 h6 mt-3">
                แผนก : {{users.department}}
              </div>
              <div class="ml-5 h6 mt-3">
                <i class="ni ni-building mr-2"></i> Address : {{users.address}}
              </div>
              <div class="ml-5 h6 mt-3">
                <i class="ni ni-book-bookmark mr-2"></i>Phone : {{users.numberphone}}
              </div>
              <div class="ml-5 h6 mt-3">
                โรคประจำตัว : {{users.disease}}
              </div>
              <div class="ml-5 h6 mt-3">
                ยาที่แพ้ : {{users.medical}}
              </div>
            </div>
            <div class="mt-3 py-3 border-top text-center">
              <div class="row justify-content-center">
                ประสบการณ์การทำงาน : {{users.story}}
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
var editprofile = database.ref("/Users");
export default {
  name: "Editprofile",
  data() {
    return {
      userKey: this.$route.params.key,
      users: {}
    };
  },
  methods: {
    
  },
  mounted () {
    editprofile
      .orderByKey()
      .equalTo(this.userKey)
      .once("child_added", snap => {
        this.users = snap.val();
      });
  }
};
</script>
<style>
</style>
