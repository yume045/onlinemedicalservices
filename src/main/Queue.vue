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
    <section class="jumbotron bg-secondary container mt--300 shadow rounded">
      <div class="row">
        <h3>จัดการคิว - กำหนดคิว</h3>
      </div>
      <div class="row mt-5 justify-content-center">
        <div class="col-sm-12 col-md-4">
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
        <div class="col-sm-6 col-md-3">
          <base-input
            addon-left-icon="ni ni-watch-time"
            alternative
            class="mb-3"
            type="time"
            v-model="payload.time"
          ></base-input>
        </div>
        <div class="col-sm-6 col-md-3">
          <base-input
            addon-left-icon="ni ni-watch-time"
            alternative
            class="mb-3"
            type="time"
            v-model="payload.totime"
          ></base-input>
        </div>
        <div class="col-sm-4 col-md-4">
          <base-input
            placeholder="Minutes:Queue"
            addon-left-icon="ni ni-watch-time"
            alternative
            class="mb-3"
            type="number"
            v-model="payload.minutesperqueqe"
          ></base-input>
        </div>
        <div class="col-sm-4 col-md-4">
          <base-input
            placeholder="Break Time / เวลาพัก"
            addon-left-icon="ni ni-watch-time"
            alternative
            class="mb-3"
            type="number"
            v-model="payload.breakTime"
          ></base-input>
        </div>
        <div class="col-sm-6 col-md-2">
          <base-button @click="addQueue()" block type="primary" icon="ni ni-fat-add"></base-button>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-10 card table-responsive">
          <table width="100%" class="table table-hover">
            <thead class="thead-light">
              <tr class="text-center">
                <th>ลำดับ</th>
                <th>วันที่นัด</th>
                <th>เวลา</th>
                <th>ผู้ป่วย</th>
                <th>ลบคิว</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(val, key, index) in showData" :key="key">
                <td>{{index + 1}}</td>
                <td>{{new Date(val.date).toLocaleDateString('it-IT')}}</td>
                <td>{{parseInt(val.time) | moment('HH:mm')}} - {{parseInt(val.totime) | moment('HH:mm')}}</td>
                <td>{{usersData[val.user]}}</td>
                <td>
                  <base-button
                    @click="deleteQueue(key)"
                    type="danger"
                    size="sm"
                    icon="ni ni-fat-remove"
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
import flatPicker from "vue-flatpickr-component";
import UserByKey from "@/main/components/UserByKey";
import moment from "moment";
import "flatpickr/dist/flatpickr.css";
var database = firebase.database();
var queueRef = database.ref("/Queues");
var userRef = database.ref("/Users");
var chatRef = database.ref("/Chats");
export default {
  name: "Queue",
  data() {
    return {
      payload: {
        date: new Date(),
        time: "08:00",
        totime: "11:00",
        minutesperqueqe: null,
        breakTime: null
      },

      showData: {},
      usersData: {}
    };
  },
  methods: {
    addQueue() {
      var start = moment(
        this.payload.date.toString() + " " + this.payload.time
      ).format("x");
      var end = moment(
        this.payload.date.toString() + " " + this.payload.totime
      ).format("x");
      let finish = parseInt(start) + this.payload.minutesperqueqe * 60 * 1000;
      if (this.checkTime(start)) {
        while (finish <= end) {
          queueRef.child(this.profile.userKey).push({
            date: this.payload.date,
            user: "N/A",
            rate: 0,
            time: start,
            totime: finish
          });
          start = finish + this.payload.breakTime * 60 * 1000;
          finish = parseInt(start) + this.payload.minutesperqueqe * 60 * 1000;
        }
      } else {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "กำหนดวันเวลาไม่ถูกต้อง โปรดตรวจสอบวันเวลาของท่าน"
        });
      }
      this.payload = {
        date: new Date(),
        time: "08:00",
        totime: "11:00",
        minutesperqueqe: 30,
        breakTime: null,
        rate: 0
      };
    },
    checkTime(date) {
      let result = false;
      if (date >= moment(new Date()).format("x")) {
        result = true;
      }
      return result;
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
          queueRef
            .child(this.profile.userKey)
            .child(key)
            .remove();
          chatRef.child(key).remove();
        }
      });
    },
    convertToTimeString(time) {
      var hour = parseInt(time) < 10 ? "0" + parseInt(time) : parseInt(time);
      var minute = (time % 1) * 60 == 0 ? "00" : Math.round((time % 1) * 60);
      var timeToString = hour + ":" + minute;
      return timeToString;
    }
  },
  components: { flatPicker, UserByKey },
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
    userRef.on("child_added", snap => {
      this.usersData[snap.key] = snap.val().name + " " + snap.val().surname;
    });
    queueRef
      .child(this.profile.userKey)
      .orderByChild("time")
      .on("value", snap => {
        this.showData = snap.val();
      });
  }
};
</script>
<style>
</style>
