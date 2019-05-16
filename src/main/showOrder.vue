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
        <h3>ปริ้นใบสั่งยา</h3>
        <ListMedic id="printOrder" class="mt-3" :print="true" :userKey="keyBilling"/>
      </div>
      <div class="row d-flex justify-content-end">
        <div class="col-4 mt-3">
          <base-button
            type="primary"
            block
            @click="delivery('ดำเนินการจัดส่ง')"
            v-if="listMedic.status === 'ได้รับการยืนยัน'"
          >บริการจัดส่งถึงที</base-button>
          <base-button
            type="primary"
            block
            v-print="'#printOrder'"
            v-if="listMedic.status === 'ได้รับการยืนยัน'"
          >ปริ้นใบสั่งยา</base-button>
          <base-button
            type="primary"
            @click="delivery('ได้รับยาเรียบร้อยแล้ว')"
            block
            v-else-if="listMedic.status === 'ดำเนินการจัดส่ง'"
          >ได้รับของแล้ว</base-button>
          <base-button
            type="primary"
            disabled
            block
            v-else-if="listMedic.status === 'ดำเนินการจัดส่ง'"
          >ดำเนินการจัดส่ง</base-button>
          <base-button
            type="success"
            disabled
            block
            v-else-if="listMedic.status === 'ได้รับยาเรียบร้อยแล้ว'"
          >จัดสงสำร็จ</base-button>
          <base-button type="primary" disabled block v-else>โปรดรอการตรวจสอบ</base-button>
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
export default {
  name: "Queue",
  data() {
    return {
      listMedic: false,
      keyBilling: this.$route.params.key
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
    orderHistory() {
      this.$router.push("/OrderHistory");
    },
    delivery(status) {
      billingRef.child(this.$route.params.key).update({
        status: status
      });
    }
  },
  mounted() {
    billingRef.child(this.$route.params.key).on("value", snap => {
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
