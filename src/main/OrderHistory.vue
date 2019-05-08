<template>
  <div class="OrderHistory">
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
        <h3 v-if="getUser.Permistion === 'Admin'">จัดการ Order Billings</h3>
        <h3 v-else>Order History</h3>
      </div>
      <div class="row mt-3 d-flex justify-content-center">
        <div class="col-10 table-responsive">
          <table class="table table-hover">
            <thead>
              <th class="text-center">ลำดับ</th>
              <th>วันที่</th>
              <th>สถานะ</th>
              <th>เอกสารยืนยัน</th>
              <th>ดูรายละเอียด</th>
              <th>จัดการ</th>
            </thead>
            <tbody>
              <tr v-for="(val, key, index) in showData" :key="key">
                <td class="text-center">{{index + 1}}</td>
                <td>{{new Date(val.timestamp).toLocaleDateString('it-IT')}}</td>
                <td>{{val.status}}</td>
                <td>
                  <a :href="val.urlImg" target="_blank">
                    <i class="ni ni-image"></i> เอกสารยืนยัน
                  </a>
                </td>
                <td class="text-center">
                  <base-button
                    block
                    @click="showOrder(key)"
                    type="success"
                    size="sm"
                    icon="fa fa-search-plus"
                  ></base-button>
                </td>
                <td>
                  <base-button
                    v-if="getUser.Permistion !== 'Admin'"
                    @click="billing(key)"
                    type="info"
                    size="sm"
                    icon="ni ni-settings-gear-65"
                  ></base-button>
                  <base-button
                    v-if="getUser.Permistion === 'Admin'"
                    @click="confirmOrder(key)"
                    type="success"
                    size="sm"
                    icon="ni ni-check-bold"
                  ></base-button>
                  <base-button
                    @click="deleteBilling(key)"
                    type="danger"
                    size="sm"
                    icon="ni ni-fat-remove"
                  ></base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import "../assets/vendor/font-awesome/css/font-awesome.css";
var database = firebase.database();
var billingRef = database.ref("/Billings");
export default {
  name: "OrderHistory",
  data() {
    return {
      showData: false
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
    billing(key) {
      this.$router.push("/Billing/" + key);
    },
    showOrder(key) {
      this.$router.push("/showOrder/" + key);
    },
    deleteBilling(key) {
      if (this.getUser.Permistion === "Admin") {
        billingRef.child(key).update({
          status: "ไม่ได้รับการยืนยัน!!"
        });
      } else {
        billingRef.child(key).remove();
      }
    },
    confirmOrder(key) {
      billingRef.child(key).update({
        status: "ได้รับการยืนยัน"
      });
    }
  },
  mounted() {
    if (this.getUser.Permistion === "Admin") {
      billingRef.on("value", snap => {
        this.showData = snap.val();
      });
    } else {
      billingRef
        .orderByChild("user")
        .equalTo(this.profile.userKey)
        .on("value", snap => {
          this.showData = snap.val();
        });
    }
  }
};
</script>
<style>
</style>
