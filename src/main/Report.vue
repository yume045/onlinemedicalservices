<template>
  <div class="Report">
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
        <div class="col-12">
          <h3>Report</h3>
        </div>
      </div>
      <div class="row mt-3">
        <h4>{{"สถิติข้อมูลทั้งหมด"}}</h4>
        <div class="col-12" v-if="chartData">
          <GChart type="ColumnChart" :data="chartData" :options="chartOptions"></GChart>
        </div>
      </div>
      <div id="chart" class="row justify-content-center" v-if="piechartData">
        <div class="col-7">
          <h4>{{"คำถามแผนกต่างๆ"}}</h4>
          <pie-chart :data="piechartData"></pie-chart>
        </div>
        <div class="col-6">
          <h4>{{"ข้อมูลการใช้งาน"}}</h4>
          <pie-chart :data="piechartData2"></pie-chart>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-6">
          <base-input alternative addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker
              slot-scope="{focus, blur}"
              @on-open="focus"
              @on-close="blur"
              :config="{allowInput: true}"
              class="form-control datepicker"
              v-model="date"
            ></flat-picker>
          </base-input>
        </div>
        <div class="col-6">
          <base-input alternative addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker
              slot-scope="{focus, blur}"
              @on-open="focus"
              @on-close="blur"
              :config="{allowInput: true}"
              class="form-control datepicker"
              v-model="toDate"
            ></flat-picker>
          </base-input>
        </div>
      </div>
      <div class="row mt-4" v-if="statData.viewer >=0">
        <div class="col-12">
          <p>แสดงข้อมูลตั้งแต่วันที่ {{date | moment('DD-MM-YY')}} ถึงวันที่ {{toDate | moment('DD-MM-YY')}}</p>
        </div>
        <div class="col-12" v-if="statData.viewer >=0">
          <table class="col-12 table table-hover">
            <thead class="thead-light">
              <th width="10%" class="text-center">ลำดับ</th>
              <th>รายการ</th>
              <th width="20%" class="text-center">จำนวน</th>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1</td>
                <td>ผู้เข้าชมเว็บไซต์แบบ Login</td>
                <td class="text-center">{{statData.viewer}}</td>
              </tr>
              <tr>
                <td class="text-center">2</td>
                <td>ยอดการใช้ระบบ Videocall</td>
                <td class="text-center">{{statData.videocall}}</td>
              </tr>
              <tr>
                <td class="text-center">3</td>
                <td>ยอดการตั้งคำถาม</td>
                <td class="text-center">{{statData.question}}</td>
              </tr>
              <tr>
                <td class="text-center">4</td>
                <td>ยอดการตอบกลับคำถาม</td>
                <td class="text-center">{{statData.answer}}</td>
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
import { GChart } from "vue-google-charts";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import momentjs from "moment";
import { mapGetters } from "vuex";
import PieChart from "./components/PieChart.js";
var database = firebase.database();
var statRef = database.ref("/stats");
var statsRef = database.ref("/stat");
export default {
  name: "Report",
  data() {
    return {
      date: Date.now(),
      toDate: Date.now(),
      viewer: 0,
      stats: {
        answer: 0,
        question: 0,
        videocall: 0,
        viewer: 0
      },
      statData: {
        answer: null,
        question: null,
        videocall: null,
        viewer: null
      },
      stat: {
        viewer: null
      },
      chartData: null,
      chartOptions: {
        chart: {
          title: "Stats"
        }
      },
      piechartData: null,
      piechartData2: null,
      showData: null,
      userstat: null
    };
  },
  watch: {
    date() {
      statRef
        .child("viewer")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.viewer = snap.numChildren();
        });
      statRef
        .child("videocall")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.videocall = snap.numChildren();
        });
      statRef
        .child("question")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.question = snap.numChildren();
        });
      statRef
        .child("answer")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.answer = snap.numChildren();
        });
    },
    toDate() {
      statRef
        .child("viewer")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.viewer = snap.numChildren();
        });
      statRef
        .child("videocall")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.videocall = snap.numChildren();
        });
      statRef
        .child("question")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.question = snap.numChildren();
        });
      statRef
        .child("answer")
        .orderByChild("timestamp")
        .startAt(parseInt(momentjs(this.date).format("x")))
        .endAt(parseInt(momentjs(this.toDate).format("x")))
        .on("value", snap => {
          this.statData.answer = snap.numChildren();
        });
    }
  },
  components: {
    GChart,
    flatPicker,
    PieChart
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {},
  mounted() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel
    });
    this.userstat = [];
    setTimeout(() => {
      loader.hide();
    }, 5000);
    let count = 0;
    statRef.child("question").on("child_added", snap => {
      if (this.userstat[snap.val().department] === undefined) {
        this.userstat.push(snap.val().department);
        this.userstat[snap.val().department] = 1;
      }
      this.userstat[snap.val().department]++;
    });
    console.log(this.userstat);
    statRef.child("answer").on("value", snap => {
      this.stats.answer = snap.numChildren();
    });
    statRef.child("question").on("value", snap => {
      this.stats.question = snap.numChildren();
    });
    statRef.child("viewer").on("value", snap => {
      this.stats.viewer = snap.numChildren();
    });
    statRef.child("videocall").on("value", snap => {
      this.stats.videocall = snap.numChildren();
    });
    statRef.child("videocall").on("value", snap => {
      this.stats.videocall = snap.numChildren();
    });
    this.chartData = [
      [
        "ALL-TIME",
        "Member Viewer",
        "Videocall",
        "ตอบคำถาม",
        "ถามคำถาม",
        "ผู้เข้าชมเว็บไซต์ทั้งหมด"
      ],
      [
        "ALL-TIME",
        this.stats.viewer,
        this.stats.videocall,
        this.stats.answer,
        this.stats.question,
        this.viewer
      ]
    ];
    this.piechartData = {
      labels: [
        this.userstat[0],
        this.userstat[1],
        this.userstat[2],
        this.userstat[3],
        this.userstat[4],
        this.userstat[5],
        this.userstat[6],
        this.userstat[7]
      ],
      width: "500",
      datasets: [
        {
          label: "Data One",
          backgroundColor: [
            "#41B883",
            "#E46651",
            "#00D8FF",
            "#3578E5",
            "#211882",
            "#F45631",
            "#50D7F1",
            "#157AE5"
          ],
          data: [
            this.userstat[this.userstat[0]],
            this.userstat[this.userstat[1]],
            this.userstat[this.userstat[2]],
            this.userstat[this.userstat[3]],
            this.userstat[this.userstat[4]],
            this.userstat[this.userstat[5]],
            this.userstat[this.userstat[6]],
            this.userstat[this.userstat[7]]
          ]
        }
      ]
    };

    this.piechartData2 = {
      labels: [
        "Member Viewer",
        "Videocall",
        "ตอบคำถาม",
        "ถามคำถาม",
        "ผู้เข้าชมเว็บไซต์ทั้งหมด"
      ],
      datasets: [
        {
          label: "Data One",
          backgroundColor: [
            "#41B883",
            "#E46651",
            "#00D8FF",
            "#3578E5",
            "#211882",
            "#F45631",
            "#50D7F1",
            "#157AE5"
          ],
          data: [
            this.stats.viewer,
            this.stats.videocall,
            this.stats.answer,
            this.stats.question,
            this.viewer
          ]
        }
      ]
    };
  }
};
</script>
<style>
</style>
