<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar navbar-light shadow-lg p-3 mb-5" style="background-color: #85C1E9;">
  <a class="navbar-brand" href="/#/">Online-Medical-Service</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="/#/" v-if="Checklogin && permission !== 3">หน้าหลัก</a>
      </li>
       <li class="nav-item">
        <a class="nav-link" href="/#/" v-if="!Checklogin">หน้าหลัก</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/Question" v-if="Checklogin && permission === 1">ปรึกษาแพทย์</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/Medicine">ยา</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/Disease">โรค</a>
      </li>
      <li class="nav-item">
        <a class="nav-link dropdown-toggle" href="#" v-if="Checklogin && permission === 3" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          จัดการข้อมูลผู้ใช้</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin-left: 20%;">
          <a class="dropdown-item" href="#/manage">ข้อมูลผู้ป่วย</a>
          <a class="dropdown-item" href="#/Datadoc">ข้อมูลแพทย์</a>
          <a class="dropdown-item" href="#/Datapharmacist">ข้อมูลเภสัชกร</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link dropdown-toggle" href="#" v-if="Checklogin && permission === 3" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          เพิ่มข้อมูล</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="margin-left: 28%;">
          <a class="dropdown-item" href="#/RegisterAdmin">เพิ่มข้อมูลผู้ป่วย</a>
          <a class="dropdown-item" href="#/ManageDoctor">เพิ่มข้อมูลแพทย์</a>
          <a class="dropdown-item" href="#/ManagePharmacist">เพิ่มข้อมูลเภสัชกร</a>
          <a class="dropdown-item" href="#/Homeadmin">เพิ่มข้อมูล-ข่าว</a>
          <a class="dropdown-item" href="#/Medicenadmin">เพิ่มข้อมูลยา</a>
          <a class="dropdown-item" href="#/Diseaseadmin">เพิ่มข้อมูลโรค</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/ManageOption" v-if="Checklogin && permission === 3">จัดการแผนกของแพทย์</a>
      </li>
    </ul>
  </div>
      <a class="nav-link disabled " href="/#/Login" v-if="!Checklogin">เข้าสู่ระบบ</a>
      <a class="nav-link disabled " v-if="Checklogin" href="/#/Editprofile">{{this.users}}</a>
      <a class="nav-link disabled " v-if="Checklogin" v-on:click="logoutWeb">ออกจากระบบ</a>
      <a class="nav-link disabled " href="/#/Register" v-if="!Checklogin">สมัครสมาชิก</a>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'
var config = {
  apiKey: 'AIzaSyCA20IXkP9kav5RufZBxtahCvq2-_qGbQU',
  authDomain: 'online-medical.firebaseapp.com',
  databaseURL: 'https://online-medical.firebaseio.com',
  projectId: 'online-medical',
  storageBucket: 'online-medical.appspot.com',
  messagingSenderId: '273486925918'
}
firebase.initializeApp(config)
export default {
  name: 'navbar',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/user',
      Checklogin: 'user/isLoggedIn',
      permission: 'user/Per'
    })
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
      load: 'user/load'
    }),
    logoutWeb () {
      const userSet = null
      const per = null
      this.logout({userSet, per})
      this.$router.push('/login')
    }
  },
  created () {
    this.load()
  }
}
</script>

<style>
#app {
  font-family:'Abel', sans-serif,'Mitr', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
