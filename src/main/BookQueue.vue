<template>
  <div class="BookQueue">
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
      <div class="row">
        <h3>จองคิวหมอ</h3>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-10 card" v-for="(data, key) in showData" :key="key">
          <caption>{{userByKey(key)}}</caption>
          <table width="100%" class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th>ลำดับ</th>
                <th>วัน/เดือน/ปี ที่นัด</th>
                <th>เวลา</th>
                <th>ผู้ป่วย</th>
                <th>จองคิว</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(val, key, index) in data" :key="key">
                <td>{{index + 1}}</td>
                <td>{{new Date(val.date).toDateString()}}</td>
                <td>{{val.time}}</td>
                <td>{{val.user}}</td>
                <td>
                  <base-button
                    v-if="val.user !== 'N/A'"
                    type="danger"
                    size="sm"
                    disabled
                    icon="ni ni-fat-remove"
                  ></base-button>
                  <base-button
                    v-if="val.user === 'NA'"
                    type="success"
                    size="sm"
                    icon="ni ni-check-bold"
                  ></base-button>
                  <base-button
                    v-else
                    type=""
                    size="sm"
                    icon="ni ni-fat-add"
                  ></base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var queueRef = database.ref("/Queues");
var userRef = database.ref("/Users");
export default {
  name: "BookQueue",
  data() {
    return {
      showData: {},
      result: ""
    };
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {
    userByKey(key) {
      console.log(key)
      userRef.child(key).once("value", snap => {
        this.result = snap.val().name + ' ' + snap.val().surname
      });
      return this.result
    }
  },
  mounted() {
    queueRef.on("value", snap => {
      this.showData = snap.val();
      console.log(this.showData);
    });
  }
};
</script>
<style>
</style>
