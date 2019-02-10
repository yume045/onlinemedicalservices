<template>
  <div class="hello">
    <section class="container">
      <div class="row">
        <div class="col-12 mb-4 text-center">
          <h2>เพิ่มข่าวประชาสัมพันธ์</h2>
        </div>
        <div class="col-12">
          <div>
            <b-form-input class="mb-3" v-model="title" type="text" placeholder="ชื่อเรื่อง"></b-form-input>
            <vue-editor v-model="content" placeholder="กรอกข้อมูล"></vue-editor>
            <b-form-input class="mt-3" v-model="img" type="text" placeholder="Link รูปภาพ ตัวอย่าง : www.example.com/image.jpg"></b-form-input>
            <button class="mt-3 btn btn-primary" @click="insertHomeadmin ()">เพิ่มข้อมูล</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { VueEditor } from "vue2-editor"
import firebase from "firebase"
import { mapGetters } from "vuex"
var database = firebase.database()
var homeadminRef = database.ref("/Homeadmin")
export default {
  name: "Homeadmin",
  data() {
    return {
      title: "",
      content: "",
      img: ""
    }
  },
  methods: {
    insertHomeadmin() {
      var payload = {
        title: this.title,
        content: this.content,
        img: this.img
      }
      homeadminRef.push(payload)
      this.title = ""
      this.content = ""
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
      this.subadds = snap.val()
      console.log(this.subadds)
    })
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
}
</script>
<style scoped>
</style>
