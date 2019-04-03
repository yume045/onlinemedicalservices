<template>
  <div class="Queue">
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
        <h3>จัดการคิว</h3>
      </div>
      <div class="row mt-5">
        <div class="col-2 mt-3">กำหนดคิว : </div>
        <div class="col-6">
          <base-input alternative addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker
              slot-scope="{focus, blur}"
              @on-open="focus"
              @on-close="blur"
              :config="{allowInput: true}"
              class="form-control datepicker"
              v-model="payload.date"
            ></flat-picker>
          </base-input>
        </div>
        <div class="col-3">
          <base-input 
            addon-left-icon="ni ni-watch-time"
            alternative
            class="mb-3"
            type="time"
            placeholder="ส่วนสูง"
            v-model="payload.time"
          ></base-input>
        </div>
        <div class="col-1">
          <base-button @click="addQueue()" type="primary" icon="ni ni-fat-add"></base-button>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-10 card table-responsive">
          <table width="100%" class="table table-hover">
            <thead class="thead-light">
            <tr>
              <th>ลำดับ</th>
              <th>วัน/เดือน/ปี ที่นัด</th>
              <th>เวลา</th>
              <th>ผู้ป่วย</th>
              <th>ลบคิว</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(val, key, index) in showData" :key="key">
              <td>{{index + 1}}</td>
              <td>{{new Date(val.date).toDateString()}}</td>
              <td>{{val.time}}</td>
              <td>{{usersData[val.user]}}</td>
              <td>
                <base-button @click="deleteQueue(key)" type="danger" size="sm" icon="ni ni-fat-remove">
                </base-button>
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
var database = firebase.database();
var queueRef = database.ref("/Queues");
var userRef = database.ref("/Users");
export default {
  name: "Queue",
  data() {
    return {
      payload: {
        date: Date.now(),
        time: '08:00',
        user: 'N/A',
      },
      showData: {},
      usersData: {}
    };
  },
  methods: {
    addQueue() {
      queueRef.child(this.profile.userKey).push(this.payload)
      this.payload = {
        date: Date.now(),
        time: '08:00',
        user: 'N/A'
      }
    },
    deleteQueue(key) {
      this.$swal({
        title: "คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่?",
        text: "Delelte it ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5e72e4",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted!", "ลบข้อมูลสำเร็จแล้ว", "success");
          queueRef.child(this.profile.userKey).child(key).remove()
        }
      });
    }
  },
  components: { flatPicker },
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn",
      permission: "user/status",
      getUser: "user/getuser",
      profile: "user/profile"
    })
  },
  mounted() {
    queueRef.child(this.profile.userKey).orderByChild("time").on("value", snap => {
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
