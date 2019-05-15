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
    <section class="jumbotron bg-secondary container mt--300 shadow rounded">
      <div class="row">
        <h3>จองคิวหมอ</h3>
      </div>
      <div class="row justify-content-center mt-3">
        <!-- <div class="col-2 h5">เลือกแผนก :</div>
        <div class="col-8">
          <select class="mb-3 form-control form-control-sm" v-model="departmentChecked">
            <option
              :key="key"
              v-for="(dep, key) in department"
              :value="dep.addOption"
            >{{dep.addOption}}</option>
          </select>
        </div>-->
        <div class="col-10 card" v-for="(data, hkey) in showData" :key="hkey">
          <caption>
            <user-by-key :userKey="hkey" :department="true"></user-by-key>
          </caption>
          <table width="100%" class="table table-hover">
            <thead class="thead-light">
              <tr class="text-center">
                <th>ลำดับ</th>
                <th>วัน/เดือน/ปี ที่นัด</th>
                <th>เวลา</th>
                <th>ผู้ป่วย</th>
                <th>จองคิว</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(val, key, index) in data" :key="key" :hostKey="key">
                <td>{{index + 1}}</td>
                <td>{{new Date(val.date).toLocaleDateString('it-IT')}}</td>
                <td>{{parseInt(val.time) | moment('HH:mm')}} - {{parseInt(val.totime) | moment('HH:mm')}}</td>
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
import axios from "axios";
import moment from "moment";
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
      usersData: {},
      department: {}
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
      chatRef.child(key).remove();
      0;
    },
    addQueue: function(key, hkey) {
      queueRef.child(hkey + "/" + key).update({
        user: this.profile.userKey
      });
      chatRef.child(key).set({
        doctor: hkey,
        user: this.profile.userKey,
        time: this.showData[hkey][key].time,
        totime: this.showData[hkey][key].totime,
        date: this.showData[hkey][key].date
      });
      var date = moment(this.showData[hkey][key].date).format("YYMMDD");
      console.log(date);
      var timeHr = parseInt(this.showData[hkey][key].time.split(":")[0] * 60);
      var timeM = parseInt(this.showData[hkey][key].time.split(":")[1]);
      var timeString = this.convertToTimeString((timeHr + timeM - 10) / 60);
      axios
        .get(
          "https://www.thaibulksms.com/sms_api.php?" +
            "username=onlinemedic&password=onlinemedic" +
            "&msisdn=" +
            this.getUser.numberphone +
            "&message=แจ้งเตื่อน !! ใกล้ถึงเวลานัดที่คุณนัดหมอไว้แล้ว โปรดเข้าเว็บ Online Medicial Servicer เพื่อพบหมอ" +
            "&sender=SMS" +
            "&ScheduledDelivery=" +
            date +
            timeString +
            "&force=standard"
        )
        .then(function(response) {
          // handle success
          console.log(response.data);
        });
    },
    convertToTimeString(time) {
      var hour = parseInt(time) < 10 ? "0" + parseInt(time) : parseInt(time);
      var minute = (time % 1) * 60 == 0 ? "00" : Math.round((time % 1) * 60);
      var timeToString = hour + "" + minute;
      return timeToString;
    }
  },
  mounted() {
    userRef.on("child_added", snap => {
      this.usersData[snap.key] = snap.val().name + " " + snap.val().surname;
    });
    queueRef.on("value", snap => {
      this.showData = snap.val();
    });
    const dbRefObject = firebase
      .database()
      .ref()
      .child("Manageoption");
    dbRefObject.on("value", snap => {
      this.department = snap.val();
    });
  }
};
</script>
<style>
</style>
