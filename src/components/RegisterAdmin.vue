<template>
  <div class="hello">
    <div></div>
    <br>
    <br>
    <form action>
      <div>
        <h2 class="text-center">เพิ่มข้อมูลผู้ป่วย</h2>
        <b-container fluid style="width:40%;">
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">Username:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                required
                id="input-default"
                type="text"
                min="0"
                placeholder
                v-model="username"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">Password:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                required
                id="input-default"
                type="password"
                min="0"
                placeholder
                v-model="password"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">รหัสบัตรประชาชน:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                required
                id="input-default"
                type="number"
                min="0"
                placeholder
                v-model="idpeople"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">ชื่อ:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input required id="input-default" type="text" placeholder v-model="name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">นามสกุล:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input required id="input-default" type="text" placeholder v-model="sername"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">เพศ:</label>
            </b-col>
            <b-col sm="9">
              <input required class name="gen" type="radio" value="ชาย" id="male" v-model="gen">
              <label class="form-check-label" for="male">ชาย</label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                required
                class
                name="gen"
                type="radio"
                value="หญิง"
                id="feamle"
                v-model="gen"
              >
              <label class="form-check-label" for="female">หญิง</label>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">วัน/เดือน/ปี:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                required
                id="input-default"
                type="date"
                placeholder="วัน/เดือน/ปี"
                v-model="day"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">น้ำหนัก:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                required
                id="input-default"
                type="number"
                min="0"
                placeholder
                v-model="weight"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">ส่วนสูง:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                required
                id="input-default"
                type="number"
                min="0"
                placeholder
                v-model="height"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">กรุ๊ปเลือด:</label>
            </b-col>
            <b-col sm="9">
              <b-form-select id="exampleInput3" :options="bloods" required v-model="bloodtype"></b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">ที่อยู่:</label>
            </b-col>
            <b-col sm="9">
              <textarea
                required
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="address"
              ></textarea>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">เบอร์โทร:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="input-default" type="tel" placeholder v-model="numberphone"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">ยาที่แพ้:</label>
            </b-col>
            <b-col sm="9">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="medical"
              ></textarea>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">โรคประจำตัว:</label>
            </b-col>
            <b-col sm="9">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="disease"
              ></textarea>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mt-3 mb-5">
          <b-button
            type="submit"
            variant="primary"
            class="btn btn-outline-primary mr-2"
            @click="insertUser ()"
          >เพิ่มข้อมูลผู้ป่วย</b-button>
          <b-button type="reset" variant="danger" class="btn btn-outline-danger">ยกเลิก</b-button></b-row>
        </b-container>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */

import firebase from "firebase";
var database = firebase.database();
var UserRef = database.ref("/User");
var Manage = database.ref("/Manage");

export default {
  name: "HelloWorld",
  data() {
    return {
      bloods:['A','B','AB','O'],
      msg: "Welcome to Your Vue.js App",
      username: "",
      password: "",
      idpeople: "",
      name: "",
      sername: "",
      gen: "",
      day: "",
      weight: "",
      height: "",
      bloodtype: "",
      address: "",
      numberphone: "",
      medical: "",
      disease: "",
      HN: "",
      Permistion: ""
    };
  },
  methods: {
    insertUser() {
      let tmp = {
        username: this.username,
        password: this.password,
        idpeople: this.idpeople,
        name: this.name,
        sername: this.sername,
        gen: this.gen,
        day: this.day,
        weight: this.weight,
        height: this.height,
        bloodtype: this.bloodtype,
        address: this.address,
        numberphone: this.numberphone,
        medical: this.medical,
        disease: this.disease,
        HN: (this.HN = Math.floor(Math.random() * (1000000000 - 1 + 1)) + 1),
        Permistion: (this.Permistion = 1)
      };
      UserRef.child(this.username).push(tmp);
      Manage.child("Users").push(tmp);
      this.username = "";
      this.password = "";
      this.idpeople = "";
      this.name = "";
      this.sername = "";
      this.gen = "";
      this.day = "";
      this.weight = "";
      this.height = "";
      this.bloodtype = "";
      this.address = "";
      this.numberphone = "";
      this.medical = "";
      this.disease = "";
      this.HN = "";
      this.Permistion = "";
      this.$swal({
        position: "top-end",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  font-family: "Abel", sans-serif, "Mitr", sans-serif;
  font-size: 14px;
}
input {
  font-family: "Abel", sans-serif, "Mitr", sans-serif;
  font-size: 14px;
}
</style>
