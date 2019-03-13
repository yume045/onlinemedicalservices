<template>
  <div class="Register">
    <section class="section section-shaped section-lg my-0">
      <div class="shape shape-style-1 bg-gradient-default">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <card
              type="secondary"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0"
            >
              <template>
                <div class="text-center text-muted mb-4">
                  <h4>เพิ่มข้อมูล</h4>
                </div>
                <form role="form">
                  <div class="col-12 float-left mb-4">
                    <base-radio name="Doctor" class="mb-3 mr-4 float-left" v-model="type">หมอ</base-radio>
                    <base-radio
                      name="Pharmacist"
                      class="mb-3 mr-4 float-left"
                      v-model="type"
                    >เภสัชกร</base-radio>
                    <base-radio name="Member" class="mb-3 mr-4 float-left" v-model="type">ผู้ป่วย</base-radio>
                  </div>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    placeholder="๊Username"
                    addon-left-icon="ni ni-circle-08"
                    type="text"
                    v-model="username"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    type="password"
                    placeholder="Password"
                    addon-left-icon="ni ni-lock-circle-open"
                    v-model="password"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3 col-12 float-left"
                    type="text"
                    placeholder="รหัสประจำตัวประชาชน"
                    v-model="idpeople"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    type="text"
                    placeholder="ชื่อ"
                    v-model="name"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    type="text"
                    placeholder="นามสกุล"
                    v-model="surname"
                  ></base-input>
                  <div class="col-6 float-left">
                    <base-radio name="male" class="mb-3 mr-4 float-left" v-model="gen">ชาย</base-radio>
                    <base-radio name="female" class="mb-3 float-left" v-model="gen">หญิง</base-radio>
                  </div>
                  <base-input alternative addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker
                      slot-scope="{focus, blur}"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{allowInput: true}"
                      class="form-control datepicker"
                      v-model="birthdate"
                    ></flat-picker>
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    type="number"
                    placeholder="ส่วนสูง"
                    v-model="height"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    type="number"
                    placeholder="น้ำหนัก"
                    v-model="weight"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    type="text"
                    placeholder="กรุ๊ปเลือด A, B, AB, O"
                    v-model="bloodtype"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3 col-6 float-left"
                    type="text"
                    placeholder="เบอร์โทรศัพท์"
                    v-model="numberphone"
                  ></base-input>
                  <textarea
                    class="mb-3 form-control form-control-alternative"
                    rows="3"
                    placeholder="ที่อยู่"
                    v-model="address"
                  ></textarea>
                  <textarea
                    class="mb-3 form-control form-control-alternative"
                    rows="3"
                    placeholder="ยาที่แพ้"
                    v-model="medical"
                  ></textarea>
                  <textarea
                    class="mb-3 form-control form-control-alternative"
                    rows="3"
                    placeholder="โรคประจำตัว"
                    v-model="disease"
                  ></textarea>
                  <div v-if="type === 'Member'"></div>
                  <div v-else>
                    <select class="custom-select mb-3" v-model="departmentChecked">
                      <option
                        :key="key"
                        v-for="(dep, key) in department"
                        :value="dep.addOption"
                      >{{dep.addOption}}</option>
                    </select>
                    <textarea
                      class="mb-3 form-control form-control-alternative"
                      rows="3"
                      placeholder="ประสบการณ์การทำงาน"
                      v-model="story"
                    ></textarea>
                  </div>
                  <div class="text-center">
                    <base-button
                      type="primary"
                      block
                      class="my-4"
                      v-on:click="insertUser()"
                    >เพิ่มข้อมูล</base-button>
                  </div>
                </form>
              </template>
            </card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */

import firebase from "firebase";
var database = firebase.database();
var UserRef = database.ref("/Users");
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "HelloWorld",
  data() {
    return {
      bloods: ["A", "B", "AB", "O"],
      username: "",
      password: "",
      idpeople: "",
      name: "",
      surname: "",
      gen: "",
      birthdate: Date.now(),
      weight: "",
      height: "",
      bloodtype: "",
      address: "",
      numberphone: "",
      medical: "",
      disease: "",
      HN: "",
      department: "",
      story: "",
      Permistion: "Member",
      type: "Member",
      departmentChecked: ""
    };
  },
  methods: {
    insertUser() {
      let tmp = {
        username: this.username,
        password: this.password,
        idpeople: this.idpeople,
        name: this.name,
        surname: this.surname,
        gen: this.gen,
        birthdate: this.birthdate,
        weight: this.weight,
        height: this.height,
        bloodtype: this.bloodtype,
        address: this.address,
        numberphone: this.numberphone,
        medical: this.medical,
        disease: this.disease,
        type: this.type,
        story: this.story,
        department: this.departmentChecked,
        HN: (this.HN = Date.now()),
        Permistion: this.type
      };
      if (
        this.username == "" ||
        this.password == "" ||
        this.idpeople == "" ||
        this.name == "" ||
        this.surname == "" ||
        this.gen == "" ||
        this.birthdate == "" ||
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
        UserRef.push(tmp);
        this.username = "";
        this.password = "";
        this.idpeople = "";
        this.name = "";
        this.surname = "";
        this.gen = "";
        this.birthdate = "";
        this.weight = "";
        this.height = "";
        this.bloodtype = "";
        this.address = "";
        this.numberphone = "";
        this.medical = "";
        this.disease = "";
        this.HN = "";
        this.Permistion = "";
        this.departmentChecked = "";
        this.$swal({
          position: "center",
          type: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  },
  components: { flatPicker },
  created() {
    const dbRefObject = firebase
      .database()
      .ref()
      .child("Manageoption");
    dbRefObject.on("value", snap => {
      this.department = snap.val();
    });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
