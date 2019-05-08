<template>
  <div class="Billing">
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
        <h3>ยืนยันการจ่ายเงิน</h3>
      </div>
      <div class="row mt-3 justify-content-center d-flex">
        <div class="col-4">
          <img class="img-responsive" src="../../src/assets/images/promtpay.jpg">
        </div>
        <div class="col-6">
          <p>1. แสกน QR CODE เพื่อจ่าย ตามจำนวนเงินที่ระบุ</p>
          <p>2. Upload หลักฐานยืนยันการโอนเงิน</p>
          <div class="custom-file mt-4">
            <input
              type="file"
              class="custom-file-input"
              id="validatedCustomFile"
              @change="onFileChange($event.target.files[0])"
            >
            <label
              class="custom-file-label"
              for="validatedCustomFile"
            >หลักฐานยืนยันการโอนเงิน | {{file.name}}</label>
            <div class="invalid-feedback">Example invalid custom file feedback</div>
          </div>
          <base-button
            type="primary"
            class="float-right mt-3"
            v-on:click="confirmOrder()"
          >อัพโหลดหลักฐานการโอนเงิน</base-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var billingRef = database.ref("/Billings");
var storageRef = firebase.storage().ref();
export default {
  name: "Billing",
  data() {
    return {
      file: "",
      urlImg: ""
    };
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
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
          this.urlImg = downloadURL;
        });
    },
    async confirmOrder() {
      if (this.file != "") {
        await this.createImage();
        console.log("succes upload");
        billingRef.child(this.$route.params.key).update({
          urlImg: this.urlImg,
          status: "รอการตรวจสอบ"
        });
        this.$router.push("/OrderHistory/");
      } else {
        alert("กรุณาเลือกไฟล์ที่ต้องการ");
      }
    }
  },
  mounted() {}
};
</script>
<style>
</style>
