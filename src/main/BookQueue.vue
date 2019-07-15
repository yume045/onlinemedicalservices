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
        <h3>จองคิวแพทย์</h3>
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
        <div class="col-10 card" v-for="(data) in showData" :key="data.key">
          <caption @click="selectDoctor(data.key)">
            <user-by-key :userKey="data.key" :department="true"></user-by-key>
            <rate :length="5" v-model="data.rate" :readonly="true" />
          </caption>
          <table width="100%" class="table table-hover" v-if="dataQueue && select === data.key">
            <thead class="thead-light">
              <tr class="text-center">
                <th>ลำดับ</th>
                <th>วัน/เดือน/ปี ที่นัด</th>
                <th>เวลา</th>
                <!-- <th>ผู้ป่วย</th> -->
                <th>จองคิว</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(val, key) in dataQueue"
                :key="key"
                v-if="key < page * 5 && key >= page * 5 - 5"
              >
                <td>{{key + 1}}</td>
                <td>{{(val.value.date) | moment('DD-MM-Y')}}</td>
                <td>{{parseInt(val.value.time) | moment('HH:mm')}} - {{parseInt(val.value.totime) | moment('HH:mm')}}</td>
                <!-- <td>{{usersData[val.user]}}</td> -->
                <td>
                  <base-button
                    v-if="val.value.user === profile.userKey"
                    type="success"
                    size="sm"
                    icon="ni ni-check-bold"
                    @click="removeQueue(val.key, data.key)"
                  ></base-button>
                  <base-button
                    v-else-if="val.value.user !== 'N/A'"
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
                    @click="addQueue(val.key, data.key, val.value.date, val.value.time, val.value.totime)"
                  ></base-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="col-12" v-if="dataQueue && select === data.key">
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
import { parse } from "path";
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
      department: {},
      dataQueue: null,
      select: null,
      page: 1
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
      this.$swal({
        title: "ยกเลิกคิว ?",
        text: "ต้องการจยกเลิกคิวหรือไม่ ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยกเลิกคิว"
      }).then(result => {
        if (result.value) {
          this.$swal("ยกเลิกคิว!", "ยกเลิกคิวสำเร็จ.", "success");
          queueRef
            .child(hkey)
            .child(key)
            .update({
              user: "N/A"
            });
          chatRef.child(key).remove();
          this.selectDoctor(hkey);
        }
      });
    },
    insertQueue(key, hkey, date, time, totime) {
      queueRef
        .child(hkey)
        .child(key)
        .update({
          user: this.profile.userKey
        });
      chatRef.child(key).set({
        doctor: hkey,
        user: this.profile.userKey,
        time: time,
        totime: totime,
        date: date
      });
      console.log(key);

      var dateStr = moment(date).format("YYMMDD");
      var timeString = moment(parseInt(time) - 10 * 60 * 1000).format("HHmm");
      axios.get(
        "https://www.thaibulksms.com/sms_api.php?" +
          "username=onlinemedic&password=onlinemedic" +
          "&msisdn=" +
          this.getUser.numberphone +
          "&message=แจ้งเตื่อน !! ใกล้ถึงเวลานัดที่คุณนัดแพทย์ไว้แล้ว เวลา : " +
          moment(date).format("DD/MM/YY") +
          " " +
          moment(time).format("HH:mm") +
          " โปรดเข้าเว็บ Online Medicial Servicer เพื่อพบ: " +
          this.usersData[hkey] +
          "&sender=SMS" +
          "&ScheduledDelivery=" +
          dateStr +
          timeString +
          "&force=standard"
      );
      this.selectDoctor(hkey);
    },
    addQueue(key, hkey, date, time, totime) {
      if (this.checkQueue(date)) {
        this.$swal({
          title: "จองคิว ?",
          text: "ต้องการจองคิวหรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "จองคิว"
        }).then(result => {
          if (result.value) {
            this.$swal("จองคิว!", "จองคิวสำเร็จ.", "success");
            this.insertQueue(key, hkey, date, time, totime);
          }
        });
      } else {
        this.$swal({
          type: "error",
          title: "ไม่สามารถจองคิวได้",
          text: "สามารถจองคิวได้วันละ 1 คิวเท่านั้น"
        });
      }
      // queueRef.on("child_added", snap => {
      //   this.showData.push({ value: snap.val(), key: snap.key });
      // });
    },
    checkQueue(date) {
      let result = true;
      queueRef.on("child_added", snap => {
        snap.forEach(element => {
          if (
            this.profile.userKey === element.val().user &&
            element.val().date === date
          ) {
            result = false;
          }
        });
      });
      return result;
    },
    selectDoctor(key) {
      let count = 1;
      let index = 1;
      this.totalPage = [1];
      this.dataQueue = [];
      this.select = key;
      queueRef.child(key).on("child_added", snap => {
        this.dataQueue.push({ value: snap.val(), key: snap.key });
        if (index % 5 === 0) {
          count++;
          this.totalPage.push(count);
        }
        index++;
      });
      this.dataQueue.sort((a, b) => {
        return moment(a.value.date).format("x") <
          moment(b.value.date).format("x")
          ? 1
          : -1;
      });
    }
  },
  mounted() {
    this.showData = [];

    userRef.on("child_added", snap => {
      this.usersData[snap.key] = snap.val().name + " " + snap.val().surname;
    });
    queueRef.on("child_added", snap => {
      this.rate = 0;
      this.count = 1;
      queueRef.child(snap.key).on("child_added", val => {
        this.rate += val.val().rate;
        this.count++;
      });
      this.showData.push({
        value: snap.val(),
        key: snap.key,
        rate: (this.rate / this.count).toFixed(2)
      });
    });

    console.log(this.showData);
    // this.showData.sort((a, b) => {
    //   return a.timestamp < b.timestamp ? 1 : -1;
    // });

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
