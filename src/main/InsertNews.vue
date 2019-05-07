<template>
  <div class="HomeAdmin">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <div class="jumbotron bg-secondary container mt--300 shadow rounded">
      <h1 class="display-4 mb-3">เพิ่มข่าว - ยา - โรค</h1>
      <div class="col-12 float-left mb-3">
        <base-radio name="News" class="mb-3 mr-4 float-left" v-model="type">ข่าวประชาสัมพันธ์</base-radio>
        <base-radio name="Medicine" class="mb-3 mr-4 float-left" v-model="type">ข้อมูลยา</base-radio>
        <base-radio name="Disease" class="mb-3 mr-4 float-left" v-model="type">ข้อมูลโรค</base-radio>
      </div>
      <base-input
        alternative
        class="mb-3"
        placeholder="ชื่อ"
        addon-left-icon="ni ni-bold-right"
        type="text"
        v-model="title"
      ></base-input>
      <vue-editor v-model="content" placeholder="กรอกข้อมูล"></vue-editor>
      <base-input
        alternative
        class="mt-3"
        placeholder="Link รูปภาพ ตัวอย่าง : www.example.com/image.jpg"
        addon-left-icon="ni ni-image"
        type="text"
        v-model="img"
      ></base-input>
      <base-input
        alternative
        class="mt-3"
        placeholder="กำหนด Tag ที่เกี่ยวข้อง"
        addon-left-icon="ni ni-tag"
        type="text"
        v-model="tag"
      ></base-input>
      <button class="mt-3 btn btn-primary" @click="insertNews ()">เพิ่มข้อมูล</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { VueEditor } from "vue2-editor";
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var firebaseRef = database.ref("/News");
export default {
  name: "InsertNews",
  data() {
    return {
      title: "",
      content: "",
      img: "",
      tag: "",
      type: "News"
    };
  },
  methods: {
    insertNews() {
      var payload = {
        title: this.title,
        content: this.content,
        img: this.img,
        timestamp: Date.now(),
        type: this.type,
        tag: this.tag
      };
      firebaseRef.push(payload);
      this.title = "";
      this.content = "";
      this.img = "";
      this.tag = "";
      this.$swal({
        position: "center",
        type: "success",
        title: "Your Insert Data Success",
        showConfirmButton: false,
        timer: 1500
      });
    }
  },
  components: {
    VueEditor
  },
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn"
    })
  }
};
</script>
<style scoped>
</style>
