<template>
  <div class="hello">
    <div></div>
    <br>
    <br>
    <form action>
    <b-container>
      <center>
      <b-row class="box">
        <b-col>
          <h2 class="text-center mb-5">เพิ่มข้อมูลผู้ป่วย</h2>
          <tr>
            <td class="mr-2">Username:
              <input
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="username"
                placeholder="Username"
              >
            </td>
            <td class="mr-2">Password:
              <input
                class="form-control mb-2"
                type="password"
                name
                id
                v-model="password"
                placeholder="Password"
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">รหัสบัตรประชาชน:
              <input
                class="form-control mb-2"
                type="number"
                name
                id
                v-model="idpeople"
                placeholder="รหัสบัตรประชาชน"
              >
            </td>
          </tr>
          <tr>
            <td>ชื่อ:
              <input
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="name"
                placeholder="ชื่อ"
              >
            </td>
            <td>นามสกุล:
              <input
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="sername"
                placeholder="นามสกุล"
              >
            </td>
          </tr>
          <tr>
            <td>
              เพศ:
              <input class name="gen" type="radio" value="ชาย" id="male" v-model="gen">
              <label class="form-check-label" for="male">ชาย</label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                class
                name="gen"
                type="radio"
                value="หญิง"
                id="feamle"
                v-model="gen"
              >
              <label class="form-check-label" for="female">หญิง</label>
            </td>
          </tr>
          <tr>
            <td colspan="2">เดือน/วัน/ปี:
              <input
                class="form-control mb-2"
                type="date"
                name
                id
                max="01-06-2019"
                v-model="day"
                placeholder="เดือน/วัน/ปี"
              >
            </td>
          </tr>
          <tr>
            <td>น้ำหนัก:
              <input
                class="form-control mb-2"
                type="number"
                name
                id
                min="1"
                max="300"
                v-model="weight"
                placeholder="น้ำหนัก"
              >
            </td>
            <td>ส่วนสูง:
              <input
                class="form-control mb-2"
                type="number"
                name
                id
                min="30"
                max="250"
                v-model="height"
                placeholder="ส่วนสูง"
              >
            </td>
          </tr>
          <tr>
            <td>กรุ๊ปเลือด:
              <b-form-select
                class="form-control mb-2"
                id="exampleInput3"
                :options="bloods"
                v-model="bloodtype"
              ></b-form-select>
            </td>
            <td>เบอร์โทร:
              <input
                class="form-control mb-2"
                type="number"
                name
                id
                v-model="numberphone"
                placeholder="เบอร์โทร"
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">ที่อยู่:
              <textarea
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="address"
                placeholder="ที่อยู่"
              />
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td colspan="2">ยาที่แพ้:
              <textarea
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="medical"
                placeholder="ยาที่แพ้"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="2">โรคประจำตัว:
              <textarea
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="disease"
                placeholder="โรคประจำตัว"
              ></textarea>
            </td>
          </tr>
          <b-button
            type="submit"
            variant="primary"
            class="btn btn-outline-primary mr-2 mt-3 mb-5"
            @click="insertUser ()"
          >เพิ่มข้อมูลผู้ป่วย</b-button>
          <b-button type="reset" variant="danger" class="btn btn-outline-danger mt-3 mb-5">ยกเลิก</b-button>
          </b-col>
          </b-row>
          </center>
    </b-container>
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
      bloods: ["A", "B", "AB", "O"],
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
      if (
        this.username == "" ||
        this.password == "" ||
        this.idpeople == "" ||
        this.name == "" ||
        this.sername == "" ||
        this.gen == "" ||
        this.day == "" ||
        this.weight == "" ||
        this.height == "" ||
        this.bloodtype == "" ||
        this.address == "" ||
        this.numberphone == "" ||
        this.numberphone == "" ||
        this.medical == "" ||
        this.disease == ""
      ) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "กรุณากรอกข้อมูลให้ครบ",
          footer: "<a href>Why do I have this issue?</a>"
        });
        console.log("กรุณากรอกข้อมูลให้ครบ");
      } else {
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
          position: "center",
          type: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
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
