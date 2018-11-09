<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar navbar-light shadow-lg p-3 mb-5" style="background-color: #00BFFF;">
  <a class="navbar-brand" href="/#/">Online-Medical-Service</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/#/" v-if="Checklogin && permission !== 3">หน้าหลัก</a>
      </li>
       <li class="nav-item active">
        <a class="nav-link" href="/#/" v-if="!Checklogin">หน้าหลัก</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/Homeadmin" v-if="Checklogin && permission === 3">หน้าหลัก</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/Question" v-if="Checklogin && permission === 1">ปรึกษาแพทย์</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/Medicine">ยา</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="/#/Disease">โรค</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="/#/Menateusers" v-if="Checklogin && permission === 3">จัดการข้อมูลผู้ใช้</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="/#/ManageDoctor" v-if="Checklogin && permission === 3">จัดการข้อมูลแพทย์</a>
      </li>
    </ul>
  </div>
      <a class="nav-link disabled " href="/#/Login" v-if="!Checklogin">เข้าสู่ระบบ</a>
      <a class="nav-link disabled " v-if="Checklogin">{{this.users}}</a>
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
  storageBucket: '',
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
      logout: 'user/logout'
    }),
    logoutWeb () {
      const userSet = null
      const per = null
      this.logout({userSet, per})
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family:'Abel', sans-serif,'Mitr', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
