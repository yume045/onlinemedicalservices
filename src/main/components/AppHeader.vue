<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/Redirect/Home/go">
        <img :src="require('../../assets/logo.png')">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <router-link to="/Redirect/Home/go">Online-Medical-Servicer</router-link>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <li class="nav-item" v-if="Checklogin && permission !== 'Admin'">
          <router-link class="nav-link nav-link-icon" to="/Redirect/Home/go" rel="noopener">
            <span class="nav-link-inner--text">หน้าหลัก</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="!Checklogin">
          <router-link class="nav-link nav-link-icon" to="/Redirect/Home/go" rel="noopener">
            <span class="nav-link-inner--text">หน้าหลัก</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link nav-link-icon"
            to="/Redirect/Medicine/go"
            rel="noopener"
            data-toggle="tooltip"
          >
            <span class="nav-link-inner--text">ยา</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link nav-link-icon"
            to="/Redirect/Disease/go"
            rel="noopener"
            data-toggle="tooltip"
          >
            <span class="nav-link-inner--text">โรค</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="Checklogin">
          <router-link
            class="nav-link nav-link-icon"
            to="/Question"
            rel="noopener"
            data-toggle="tooltip"
          >
            <span class="nav-link-inner--text">ปรึกษาแพทย์</span>
          </router-link>
        </li>
        <base-dropdown tag="li" class="nav-item" v-if="Checklogin && permission === 'Admin'">
          <router-link slot="title" to="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection"></i>
            จัดการข้อมูล
          </router-link>
          <router-link to="/OrderHistory" class="dropdown-item">
            <span class="nav-link-inner--text">จัดการ Billings</span>
          </router-link>
          <router-link to="/Redirect/Manage/Member" class="dropdown-item">
            <span class="nav-link-inner--text">ข้อมูลผู้ป่วย</span>
          </router-link>
          <router-link to="/Redirect/Manage/Doctor" class="dropdown-item">
            <span class="nav-link-inner--text">ข้อมูลแพทย์</span>
          </router-link>
          <router-link to="/Redirect/Manage/Pharmacist" class="dropdown-item">
            <span class="nav-link-inner--text">ข้อมูลเภสัชกร</span>
          </router-link>
          <router-link
            v-if="Checklogin && permission === 'Admin'"
            class="dropdown-item"
            to="/ManageOption"
          >
            <span class="nav-link-inner--text">จัดการแผนกของแพทย์</span>
          </router-link>
          <router-link
            v-if="Checklogin && permission === 'Admin'"
            class="dropdown-item"
            to="/Report"
          >
            <span class="nav-link-inner--text">Report</span>
          </router-link>
        </base-dropdown>
        <base-dropdown tag="li" class="nav-item" v-if="Checklogin && permission === 'Admin'">
          <router-link slot="title" to="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-fat-add"></i>
            <span class="nav-link-inner--text">เพิ่มข้อมูล</span>
          </router-link>
          <router-link to="/Insert/Member" class="dropdown-item">เพิ่มข้อมูลผู้ใช้</router-link>
          <router-link to="/InsertNews" class="dropdown-item">เพิ่มข่าว - ยา - โรค</router-link>
          <router-link to="/InsertMedic" class="dropdown-item">เพิ่มข้อมูลยา</router-link>
        </base-dropdown>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto navbar-nav-hover">
        <li class="nav-item ml-lg-4" v-if="!Checklogin">
          <router-link to="/Login" rel="noopener" class="btn btn-neutral btn-icon">
            <i class="ni ni-check-bold"></i>
            <span class="nav-link-inner--text">เข้าสู่ระบบ</span>
          </router-link>
        </li>
        <base-dropdown tag="li" class="nav-item" v-if="Checklogin">
          <router-link
            slot="title"
            :to="'/Editprofile/' + this.profile.userKey"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <i class="ni ni-circle-08"></i>
            <span class="nav-link-inner--text">{{this.users}}</span>
          </router-link>
          <router-link
            :to="'/Editprofile/' + this.profile.userKey"
            class="dropdown-item"
          >ข้อมูลผู้ใช้</router-link>
          <router-link :to="'/Redirect/Chat/go'" class="dropdown-item">
            <span class="nav-link-inner--text">คิว - แชท</span>
          </router-link>
          <router-link :to="'/Queue'" class="dropdown-item" v-if="getUser.type === 'Doctor'">
            <span class="nav-link-inner--text">จัดการคิว</span>
          </router-link>
          <router-link :to="'/BookQueue'" class="dropdown-item" v-if="getUser.type === 'Member'">
            <span class="nav-link-inner--text">จองคิวหมอ</span>
          </router-link>
          <router-link :to="'/Order'" class="dropdown-item" v-if="getUser.type === 'Member'">
            <span class="nav-link-inner--text">ใบสั่งยา</span>
          </router-link>
          <router-link
            :to="'/OrderMedic'"
            class="dropdown-item"
            v-if="getUser.type === 'Doctor' || getUser.type === 'Pharmacist'"
          >
            <span class="nav-link-inner--text">ออกใบสั่งยา</span>
          </router-link>
          <a href="#" class="dropdown-item" v-if="Checklogin" v-on:click="logoutWeb">ออกจากระบบ</a>
        </base-dropdown>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
var config = {
  apiKey: "AIzaSyCA20IXkP9kav5RufZBxtahCvq2-_qGbQU",
  authDomain: "online-medical.firebaseapp.com",
  databaseURL: "https://online-medical.firebaseio.com",
  projectId: "online-medical",
  storageBucket: "online-medical.appspot.com",
  messagingSenderId: "273486925918"
};
firebase.initializeApp(config);
export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  name: "navbar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      users: "user/user",
      Checklogin: "user/isLoggedIn",
      permission: "user/status",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {
    ...mapActions({
      logout: "user/logout",
      load: "user/load"
    }),
    logoutWeb() {
      const userSet = null;
      const status = null;
      this.logout({ userSet, status });
      this.$router.push("/login");
    }
  },
  created() {
    this.load();
  }
};
</script>
<style>
.nav-link {
  font-family: "Abel", sans-serif, "Mitr", sans-serif !important;
}
.navbar-brand img {
  height: 70px !important;
}
</style>
