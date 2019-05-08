<template>
  <div class="Queue">
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
        <ListMedic :userKey="profile.userKey" v-if="listMedic"/>
        <div v-else class="col-8">
          <h4>ไม่มีใบสั่งยา</h4>
        </div>
      </div>
      <div class="row d-flex justify-content-end">
        <div class="col-4 mt-3">
          <base-button type="primary" block @click="billing()" v-if="listMedic">จ่ายบิล</base-button>
          <base-button type="info" block @click="orderHistory()">Order History</base-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import ListMedic from "@/main/components/ListMedic";
var database = firebase.database();
var billingRef = database.ref("/Billings");
var orderRef = database.ref("/OrderMedic");
export default {
  name: "Queue",
  data() {
    return {
      listMedic: false
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
    billing() {
      billingRef
        .push({
          timestamp: Date.now(),
          listMedic: this.listMedic,
          status: "กำลังดำเนินการ",
          user: this.profile.userKey
        })
        .then(res => {
          orderRef.child(this.profile.userKey).remove();
          this.$router.push("/Billing/" + res.key);
        });
    },
    orderHistory() {
      this.$router.push("/OrderHistory");
    }
  },
  mounted() {
    orderRef.child(this.profile.userKey).on("value", snap => {
      this.listMedic = snap.val();
    });
  },
  components: {
    ListMedic
  }
};
</script>
<style>
</style>
