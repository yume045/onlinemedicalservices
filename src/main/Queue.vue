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
        <div class="col-sm-12 col-md-6">
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
        <div class="col-sm-12 col-md-6">
          <base-input alternative addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker
              slot-scope="{focus, blur}"
              @on-open="focus"
              @on-close="blur"
              :config="{allowInput: true}"
              class="form-control datepicker"
              v-model="payload.toDate"
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
        <div class="col-sm-4 col-md-3">
          <base-input
            placeholder="Minutes:Queue"
            addon-left-icon="ni ni-watch-time"
            alternative
            class="mb-3"
            type="number"
            v-model="payload.minutesperqueqe"
          ></base-input>
        </div>
        <div class="col-sm-4 col-md-3">
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
              <tr
                class="text-center"
                v-for="(val, key) in showData"
                :key="key"
                v-if="key < page * 10 && key >= page * 10 - 10"
              >
                <td>{{key + 1}}</td>
                <td>{{(val.value.date) | moment('DD/MM/Y')}}</td>
                <td>{{parseInt(val.value.time) | moment('HH:mm')}} - {{parseInt(val.value.totime) | moment('HH:mm')}}</td>
                <td>{{usersData[val.value.user]}}</td>
                <td>
                  <base-button
                    @click="deleteQueue(val.key)"
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
      <div class="col-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" @click="page--" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              :class="(val === page)?'page-item active':'page-item'"
              v-for="val in totalPage"
              :key="val"
            >
              <a class="page-link" @click="page = val">{{val}}</a>
            </li>
            <li class="page-item">
              <a class="page-link" @click="page++" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
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
        toDate: new Date(),
        time: "08:00",
        totime: "11:00",
        minutesperqueqe: null,
        breakTime: null
      },
      page: 1,
      totalPage: [1],
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
      var startDate = parseInt(moment(this.payload.date).format("x"));
      var toDate = parseInt(moment(this.payload.toDate).format("x"));
      var finishDate = startDate;
      console.log("todate", toDate);
      if (this.checkTime(start)) {
        while (finishDate <= toDate) {
          start = moment(
            this.payload.date.toString() + " " + this.payload.time
          ).format("x");
          end = moment(
            this.payload.date.toString() + " " + this.payload.totime
          ).format("x");
          finish = parseInt(start) + this.payload.minutesperqueqe * 60 * 1000;
          while (finish <= end) {
            console.log("count");
            queueRef.child(this.profile.userKey).push({
              date: finishDate,
              user: "N/A",
              rate: 0,
              time: start,
              totime: finish
            });
            start = finish + this.payload.breakTime * 60 * 1000;
            finish = parseInt(start) + this.payload.minutesperqueqe * 60 * 1000;
          }
          startDate = finishDate;
          finishDate = startDate + 24 * 60 * 60 * 1000;
        }
      } else {
        this.$swal({
          type: "error",
          title: "กำหนดวันเวลาไม่ถูกต้อง",
          text: "โปรดตรวจสอบวันเวลาของท่าน"
        });
      }
      this.payload = {
        date: new Date(),
        toDate: new Date(),
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
          let count = 1;
          let index = 1;
          this.totalPage = [1];
          this.showData = [];
          queueRef.child(this.profile.userKey).on("child_added", snap => {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          });
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
    let count = 1;
    let index = 1;
    this.totalPage = [1];
    this.showData = [];
    userRef.on("child_added", snap => {
      this.usersData[snap.key] = snap.val().name + " " + snap.val().surname;
    });
    queueRef.child(this.profile.userKey).on("child_added", snap => {
      this.showData.push({ value: snap.val(), key: snap.key });
      if (index % 10 === 0) {
        count++;
        this.totalPage.push(count);
      }
      index++;
    });
    this.showData.sort((a, b) => {
      return moment(a.value.date).format("x") < moment(b.value.date).format("x")
        ? 1
        : -1;
    });
  }
};
</script>
<style>
</style>
