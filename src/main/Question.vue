<template>
  <div class="Question" v-if="showData">
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
        <div class="col-xl-6 col-lg-6 col-md-8 col-sm-10">
          <div class="d-flex d-row">
            <h6 class="float-left mr-3">คำค้นหายอดนิยม :</h6>
            <div class="mr-3" v-for="(pop, key) in popular" :key="key">
              <a @click="popularSearch(pop.title)">
                <badge pill type="default">{{pop.title}}</badge>
              </a>
            </div>
          </div>
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
                <label
                  class="custom-file-label"
                  multiple
                  for="inputGroupFile01"
                >รูปภาพที่เกี่ยวข้อง | {{file.name}}</label>
              </div>
            </div>
            <div class="col-12">
              <base-button type="primary" class="my-4" v-on:click="sendQuestion()">ส่งคำถาม</base-button>
            </div>
          </div>
        </div>
        <!-- ListBlog -->
        <div class="mt-4 bg-white table-responsive shadow rounded" id="ListQuestion">
          <table class="table table-hover">
            <thead class="thead-light">
              <th>หัวเรื่อง - คำถาม</th>
              <th class="text-center">เจ้าของกระทู้</th>
              <th class="text-center">การตอบกลับ</th>
              <th>สร้างเมื่อ</th>
            </thead>
            <tbody>
              <tr
                v-for="(val, key) in showData"
                :key="val.key"
                @click="$router.push('/ReadQuestion/' + val.key)"
                v-if="key < page * 10 && key >= page * 10 - 10"
              >
                <td>{{val.value.message}}</td>
                <td class="text-center">
                  <user-by-key :userKey="val.value.users"></user-by-key>
                </td>
                <td class="text-center">{{ansLength(val.ans)}}</td>
                <td>{{new Date(val.value.timestamp).toLocaleTimeString('en-US')}} | {{new Date(val.value.timestamp).toLocaleDateString('en-US')}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Blog -->
        <div class="col-12 text-center">
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
var popularRef = database.ref("/PopularQuestion");
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
      active: "All",
      popular: {},
      totalPage: [1],
      page: 1
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
      await storageRef
        .child(this.file.name)
        .put(this.file)
        .snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          this.data.img = downloadURL;
        });
    },
    async sendQuestion() {
      database.ref("/stats/question").push({
        user: this.getUser.username,
        timestamp: Date.now()
      });
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
    filterQuestion(type) {
      this.showData = [];
      let count = 1;
      let index = 1;
      this.totalPage = [1];
      if (type === "All") {
        this.active = "All";
        questionRef.on("child_added", snap => {
          this.showData.push({ value: snap.val(), key: snap.key });
          if (index % 10 === 0) {
            count++;
            this.totalPage.push(count);
          }
          index++;
        });
      } else if (type === "answer") {
        this.active = "answer";
        questionRef.on("child_added", snap => {
          if (snap.val().ans !== undefined) {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          }
        });
      } else {
        this.active = "nonAnswer";
        questionRef.on("child_added", snap => {
          if (snap.val().ans === undefined) {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          }
        });
      }
    },
    filter() {
      this.showData = [];
      let count = 1;
      let index = 1;
      this.totalPage = [1];
      if (this.search.length > 0) {
        questionRef.on("child_added", snap => {
          var val = snap.val();
          if (val.message.toString().search(this.search) >= 0) {
            this.showData.push({ value: val, key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          }
        });
        if (this.search.length >= 4 && this.showData.length != 0) {
          popularRef.push({
            title: this.search
          });
        }
      } else {
        let count = 1;
        let index = 1;
        this.totalPage = [1];
        this.showData = [];
        questionRef.on("child_added", snap => {
          this.showData.push({ value: snap.val(), key: snap.key });
          if (index % 10 === 0) {
            count++;
            this.totalPage.push(count);
          }
          index++;
        });
      }
      this.showData.sort((a, b) => {
        return a.value.timestamp < b.value.timestamp ? 1 : -1;
      });
    },
    popularSearch(param) {
      console.log(param);
      this.search = param;
      this.filter();
    },
    ansLength(val) {
      if (val === undefined) {
        return 0;
      } else {
        return Object.keys(val).length;
      }
    }
  },
  mounted() {
    let count = 1;
    let index = 1;
    this.totalPage = [1];
    this.showData = [];
    questionRef.on("child_added", snap => {
      this.showData.push({ value: snap.val(), key: snap.key });
      if (index % 10 === 0) {
        count++;
        this.totalPage.push(count);
      }
      index++;
      this.countQuestion.all++;
      if (snap.val().ans !== undefined) {
        this.countQuestion.answer++;
      }
    });

    this.showData.sort((a, b) => {
      return a.value.timestamp < b.value.timestamp ? 1 : -1;
    });
    popularRef.limitToLast(5).on("value", snap => {
      this.popular = snap.val();
    });
    console.log(this.showData);
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
