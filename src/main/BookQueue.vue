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
        <div class="col-10 card" v-for="(data, hkey) in showData" :key="hkey">
          <caption><user-by-key :userKey="hkey"></user-by-key></caption>
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
              <tr v-for="(val, key, index) in data" :key="key" :hostKey="key">
                <td>{{index + 1}}</td>
                <td>{{new Date(val.date).toDateString()}}</td>
                <td>{{val.time}}</td>
                <td>{{usersData[val.user]}}</td>
                <td>
                  <base-button
                    v-if="val.user === profile.userKey"
                    type="success"
                    size="sm"
                    icon="ni ni-check-bold"
                    @click="removeQueue(key, hkey)"
                  ></base-button>
                  <base-button
                    v-else-if="val.user !== 'N/A'"
                    type="danger"
                    size="sm"
                    disabled
                    icon="ni ni-fat-remove"
                  ></base-button>
                  <base-button
                    v-else
                    type
                    size="sm"
                    icon="ni ni-fat-add"
                    @click="addQueue(key, hkey)"
                  ></base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <h6>หมายเหตุ :</h6>
        <div class="col-12 mb-2">
          <base-button type="success" size="sm" icon="ni ni-check-bold"></base-button>: จองคิวแล้ว
        </div>
        <div class="col-12 mb-2">
          <base-button type="danger" size="sm" disabled icon="ni ni-fat-remove"></base-button>: คิวถูกจอง
        </div>
        <div class="col-12">
          <base-button type size="sm" icon="ni ni-fat-add"></base-button>: คิวว่าง
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
var queueRef = database.ref("/Queues");
var userRef = database.ref("/Users");
var chatRef = database.ref("/Chats");

export default {
  name: "BookQueue",
  data() {
    return {
      showData: {},
      result: "",
      usersData: {}
    };
  },
  components: {
    UserByKey
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {
    removeQueue: function(key, hkey) {
      queueRef.child(hkey + "/" + key).update({
        user: "N/A"
      });
      chatRef.child(key).remove()
    },
    addQueue: function(key, hkey) {
      queueRef.child(hkey + "/" + key).update({
        user: this.profile.userKey,
      });
      chatRef.child(key).set({
        doctor: hkey,
        user: this.profile.userKey,
      });
    }
  },
  mounted(){
    queueRef.on("value", snap => {
      this.showData = snap.val();
    });
    userRef.on("child_added", snap => {
      this.usersData[snap.key] = snap.val().name + " " + snap.val().surname;
    });
  },
  created() {
    queueRef.on("value", snap => {
      this.showData = snap.val();
    });
    userRef.on("child_added", snap => {
      this.usersData[snap.key] = snap.val().name + " " + snap.val().surname;
    });
  }
};
</script>
<style>
</style>
