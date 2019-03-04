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
    <div class="jumbotron bg-secondary container mt--300">
      <h1 class="display-4">เพิ่มข่าวประชาสัมพันธ์</h1>
      <base-input
        alternative
        class="mb-3"
        placeholder="ชื่อเรื่อง"
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
      <button class="mt-3 btn btn-primary" @click="insertHomeadmin ()">เพิ่มข้อมูล</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { VueEditor } from "vue2-editor";
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var homeadminRef = database.ref("/Homeadmin");
export default {
  name: "Homeadmin",
  data() {
    return {
      title: "",
      content: "",
      img: ""
    };
  },
  methods: {
    insertHomeadmin() {
      var payload = {
        title: this.title,
        content: this.content,
        img: this.img
      };
      homeadminRef.push(payload);
      this.title = "";
      this.content = "";
      this.$swal({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    }
  },
  mounted() {
    homeadminRef.on("value", snap => {
      this.subadds = snap.val();
      console.log(this.subadds);
    });
  },
  created: {},
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
