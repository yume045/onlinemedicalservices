<template>
  <div class="hello">
    <section class="container">
      <div class="row">
        <div class="col-12 mb-4 text-center">
          <h2>เพิ่มข้อมูลโรค</h2>
        </div>
        <div class="col-12">
          <div>
            <b-form-input class="mb-3" v-model="adddisease" type="text" placeholder="ชื่อโรค"></b-form-input>
            <vue-editor v-model="adddisease2" placeholder="กรอกข้อมูลโรค"></vue-editor>
            <b-form-input
              class="mt-3"
              v-model="addpicturedisease"
              type="text"
              placeholder="Link รูปภาพ ตัวอย่าง : www.example.com/image.jpg"
            ></b-form-input>
            <b-form-select class="mt-3" v-model="type">
              <option disabled value>เลือกหมวดหมู่ของโรค</option>
              <option value="กายภาพ">กายภาพ</option>
              <option value="ระบบทางเดินหายใจ">ระบบทางเดินหายใจ</option>
              <option value="โรคกระดูก">โรคกระดูก</option>
              <option value="โรคตา ">โรคตา</option>
              <option value="โรคต่อมไร้ท่อ ">โรคต่อมไร้ท่อ</option>
              <option value="โรคติดต่อเพศสัมพันธ์ ">โรคติดต่อเพศสัมพันธ์</option>
              <option value="โรคระบประสาท ">โรคระบบประสาท</option>
              <option value="โรคหูคอจมูก ">โรคหูคอจมูก</option>
              <option value="จิตเวช ">จิตเวช</option>
              <option value="ระบบย่อยอาหาร ">ระบบย่อยอาหาร</option>
              <option value="โรคกล้ามเนื้อ ">โรคกล้ามเนื้อ</option>
              <option value="โรคทางพันธุกรรม ">โรคทางพันธุกรรม</option>
              <option value="โรคผิวหนัง  ">โรคผิวหนัง</option>
              <option value="โรคระบาด  ">โรคระบาด</option>
              <option value="มะเร็ง  ">มะเร็ง</option>
              <option value="สูตินรีเวช  ">สูตินรีเวช</option>
              <option value="โรคตับ  ">โรคตับ</option>
              <option value="โรคติดเชื้อ   ">โรคติดเชื้อ</option>
              <option value="โรคทางเดินอาหาร   ">โรคทางเดินอาหาร</option>
              <option value="โรคระบบขับถ่าย   ">โรคระบบขับถ่าย</option>
              <option value="โรคหัวใจและหลอดเลือด   ">โรคหัวใจและหลอดเลือด</option>
            </b-form-select>
            <button class="mt-3 btn btn-primary" @click="insertDisease()">เพิ่มข้อมูลโรค</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { VueEditor } from "vue2-editor"
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var diseaseadminRef = database.ref("/Diseaseadmin");
export default {
  name: "Diseaseadmin",
  data() {
    return {
      subadds: "",
      adddisease: "",
      adddisease2: "",
      subadddisease: "",
      addpicturedisease: "",
      type: ""
    };
  },
  components: {
    VueEditor
  },
  methods: {
    insertDisease() {
      let tmp = {
        adddisease: this.adddisease,
        adddisease2: this.adddisease2,
        addpicturedisease: this.addpicturedisease,
        type: this.type
      };
      diseaseadminRef.push(tmp);
      this.adddisease = "";
      this.adddisease2 = "";
      this.addpicturedisease = "";
      this.type = "";
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
    diseaseadminRef.on("value", snap => {
      this.subadds = snap.val();
      console.log(this.subadds);
    });
  },
  created: {},
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
