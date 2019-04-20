<template>
  <div class="Question">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="container jumbotron bg-secondary mt--300">
      <h3>ปรึกษาแพทย์</h3>
      <div class="row mb-2 justify-content-end">
        <div class="col-xl-8 col-lg-8 col-md-10 col-sm-12">
          <base-input
            alternative
            placeholder="Search question or keyword"
            addon-left-icon="fa fa-search"
            v-model="search"
            @input="filter()"
          ></base-input>
        </div>
      </div>
      <div class="mainQuestion">
        <div class="row">
          <div class="col-sm-12 col-md-4 mb-4 mt-5">
            <ul class="list-group nav nav-pills">
              <li
                @click="filterQuestion('All')"
                href="#Question"
                :class="(active === 'All')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
              >
                ดูคำถามทั้งหมด
                <span class="badge badge-primary badge-pill">{{countQuestion.all}}</span>
              </li>
              <li
                @click="filterQuestion('answer')"
                href="#Question"
                :class="(active === 'answer')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
              >
                คำถามที่มีคำตอบ
                <span class="badge badge-primary badge-pill">{{countQuestion.answer}}</span>
              </li>
              <li
                @click="filterQuestion('nonAnswer')"
                href="#Question"
                :class="(active === 'nonAnswer')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
              >
                คำถามที่ยังไม่ตอบ
                <span
                  class="badge badge-primary badge-pill"
                >{{countQuestion.all - countQuestion.answer}}</span>
              </li>
            </ul>
          </div>
          <div class="QusetionMain col-sm-12 col-md-8">
            <div class="col-12">
              <h3>
                <i class="ni ni-send"></i> ถามคำถาม
              </h3>
            </div>
            <div class="col-12">
              <textarea
                class="form-control form-control-alternative mb-3"
                rows="5"
                placeholder="ถามคำถามที่ต้องการ"
                v-model="data.message"
              ></textarea>
              <div class="custom-file">
                <input
                  placeholder="อัพโหลดไฟล์รูปภาพ"
                  type="file"
                  class="custom-file-input"
                  name="file"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  @change="onFileChange($event.target.files[0])"
                >
                <label class="custom-file-label" multiple for="inputGroupFile01">{{file.name}}</label>
              </div>
            </div>
            <div class="col-12">
              <base-button type="primary" class="my-4" v-on:click="sendQuestion()">ส่งคำถาม</base-button>
            </div>
          </div>
        </div>

        <!-- Blog -->
        <div class="mt-4" id="Question" v-for="(val, key) in showData" :key="key">
          <div class="card">
            <div class="row">
              <div class="col-3 border-right text-center">
                <div height="80px" width="80px">
                  <h5>
                    <i class="ni ni-send float-right text-primary"></i>
                  </h5>
                  <img src="./assets/users.svg" height="80px" width="80px" class="doctor">
                  <br>
                  <h6 class="text-center mb-4">
                    <user-by-key :userKey="val.users"></user-by-key>
                    <small
                      class="bottom-time"
                    >{{new Date(val.timestamp).toLocaleTimeString('en-US')}} {{new Date(val.timestamp).toLocaleDateString('en-US')}}</small>
                  </h6>
                </div>
              </div>
              <div class="col-9 mt-2">
                <h6>คำถาม ?</h6>
                {{val.message}}
                <br>
                <h6 class="mt-3">เอกสารที่แนบมา</h6>
                <img :src="val.img" height="250px">
              </div>
            </div>
          </div>

          <div class="card" v-for="(answer, key) in val.ans" :key="key">
            <div class="row">
              <div class="col-3 border-right text-center">
                <div height="80px" width="80px">
                  <h5>
                    <i class="ni ni-curved-next float-right text-danger"></i>
                  </h5>
                  <img src="./assets/users.svg" height="80px" width="80px" class="doctor">
                  <br>
                  <h6 class="text-center mb-4">
                    <user-by-key :userKey="answer.users"></user-by-key>
                  </h6>
                  <small
                    class="bottom-time"
                  >{{new Date(answer.timestamp).toLocaleTimeString('en-US')}} {{new Date(val.timestamp).toLocaleDateString('en-US')}}</small>
                </div>
              </div>
              <div class="col-9">
                <h6>ตอบกลับ</h6>
                {{answer.message}}
              </div>
            </div>
          </div>

          <div class="card">
            <div class="row Answer mt-2">
              <div class="col-3 border-right text-center">
                <div height="80px" width="80px">
                  <h5>
                    <i class="ni ni-curved-next float-right text-danger"></i>
                  </h5>
                  <img src="./assets/users.svg" height="80px" width="80px" class="doctor">
                  <br>
                  <h6 class="text-center">
                    <user-by-key :userKey="data.users"></user-by-key>
                  </h6>
                </div>
              </div>
              <div class="col-9">
                <textarea
                  class="form-control form-control mb-1"
                  rows="3"
                  placeholder="ตอบกลับ"
                  v-model="data.message"
                ></textarea>
                <base-button
                  type="danger"
                  class="mb-3 float-right"
                  v-on:click="sendAnswer(key)"
                >ตอบกลับ</base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import firebase from "firebase";
import { mapGetters } from "vuex";
import UserByKey from "@/main/components/UserByKey";
var database = firebase.database();
var questionRef = database.ref("/Question");
var userRef = database.ref("/Users");
var storageRef = firebase.storage().ref();
export default {
  name: "Question",
  data() {
    return {
      data: {
        message: "",
        img: "",
        users: JSON.parse(localStorage.getItem("profile")).userKey,
        status: "0"
      },
      ans: "",
      updatekey: "",
      message: "",
      search: "",
      showData: [],
      file: "",
      countQuestion: {
        all: 0,
        answer: 0
      },
      active: "All"
    };
  },
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  components: {
    UserByKey
  },
  methods: {
    onFileChange(fileImg) {
      this.file = fileImg;
      // this.data.img = fileImg.name;
    },
    async createImage() {
      // const storageRef = firebase.storage().ref('image/' + this.dataImg.name.toLowerCase().split(' ').join('-'))
      await storageRef
        .child(this.file.name)
        .put(this.file)
        .snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          this.data.img = downloadURL;
        });

      // const uploadTask = storageRef.put(this.dataImg)
      // return uploadTask
    },
    async sendQuestion() {
      if (this.file != "") await this.createImage();
      this.data.timestamp = Date.now();
      questionRef.push(this.data);
      this.data = {
        message: "",
        img: "",
        status: 0,
        users: this.profile.userKey
      };
      this.file = "";
    },
    sendAnswer(key) {
      this.data.timestamp = Date.now();
      questionRef.child(key + "/ans").push(this.data);
      this.data = {
        message: "",
        img: "",
        status: 0,
        users: this.profile.userKey
      };
    },
    filterQuestion(type) {
      this.showData = {};
      if (type === "All") {
        this.active = "All";
        questionRef.on("value", snap => {
          this.showData = snap.val();
        });
      } else if (type === "answer") {
        this.active = "answer";
        questionRef.on("child_added", snap => {
          if (snap.val().ans !== undefined) {
            this.showData[snap.key] = snap.val();
          }
        });
      } else {
        questionRef.on("child_added", snap => {
          this.active = "nonAnswer";
          console.log(snap.val().ans);
          if (snap.val().ans === undefined) {
            this.showData[snap.key] = snap.val();
          }
        });
      }
    },
    filter() {
      this.showData = [];
      if (this.search.length > 0) {
        questionRef.on("child_added", snap => {
          var val = snap.val();
          if (val.message.toString().search(this.search) >= 0) {
            this.showData.push(val);
          }
        });
      } else {
        questionRef.on("value", snap => {
          this.showData = snap.val();
        });
      }
    }
  },
  mounted() {
    questionRef.on("value", snap => {
      this.showData = snap.val();
      this.countQuestion.all = snap.numChildren();
    });
    questionRef.on("child_added", snap => {
      if (snap.val().ans !== undefined) {
        this.countQuestion.answer++;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-time {
  position: absolute; /* ตำแหน่งเทียบกับ container */
  bottom: 0; /* กำหนดให้ชิดด้านล่าง */
  text-align: right; /* 2 บรรทัดนี้ถ้าต้องการให้ข้อความอยู่กลาง */
  width: 90%;
  color: #747474;
  display: block;
  font-size: 12px;
}
</style>
