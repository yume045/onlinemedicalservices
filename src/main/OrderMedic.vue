<template>
  <div class="OrderMedic">
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
      <div class="row mb-3">
        <h3>ออกใบสั่งยา</h3>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8">
          <base-input
            alternative
            class="mb-3"
            placeholder="USERNAME : ผู้ป่วย"
            addon-left-icon="ni ni-circle-08"
            type="text"
            v-model="user"
            v-on:keyup.enter="reRender = true"
            @focus="reRender = false"
            @blur="reRender = true"
          />
        </div>
      </div>
      <div class="row d-flex justify-content-center" v-if="reRender">
        <div class="col-6 col-md-6">
          <base-input
            alternative
            class="mb-3"
            placeholder="ชื่อยา"
            addon-left-icon="fa fa-medkit"
            type="text"
            v-model="medicName"
          />
        </div>
        <div class="col-3 col-md-3">
          <base-input
            alternative
            class="mb-3"
            placeholder="จำนวน"
            addon-left-icon="fa fa-hashtag"
            type="number"
            v-model="count"
          />
        </div>
        <div class="col-3 col-md-3">
          <base-input
            alternative
            class="mb-3"
            placeholder="ราคาต่อชิ้น"
            addon-left-icon="fa fa-hashtag"
            type="number"
            v-model="price"
          />
        </div>
      </div>
      <div class="row d-flex justify-content-center" v-if="reRender">
        <div class="col-12 col-md-6">
          <base-button type="primary" block @click="addOrder()">เพิ่มยา</base-button>
        </div>
      </div>
      <div class="row d-flex justify-content-center mt-5">
        <ListMedic :userKey="user" v-if="reRender"/>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import ListMedic from "@/main/components/ListMedic";
import "../assets/vendor/font-awesome/css/font-awesome.css";
var database = firebase.database();
var orderRef = database.ref("/OrderMedic");
export default {
  name: "OrderMedic",
  data() {
    return {
      user: "",
      medicName: "",
      count: "",
      price: "",
      reRender: false
    };
  },
  watch: {
    user: function() {}
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {
    addOrder() {
      orderRef.child(this.user).push({
        medicName: this.medicName,
        price: this.price,
        count: this.count
      });
      this.medicName = "";
      this.price = "";
      this.count = "";
    }
  },
  mounted() {
    this.user = this.$route.query.id;
  },
  components: {
    ListMedic
  }
};
</script>
<style>
</style>
