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
        <h3>Order History</h3>
      </div>
      <div class="row mt-3 d-flex justify-content-center">
        <div class="col-10 table-responsive">
          <table class="table table-hover">
            <thead>
              <th class="text-center">ลำดับ</th>
              <th>วันที่</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </thead>
            <tbody>
              <tr v-for="(val, key, index) in showData" :key="key">
                <td class="text-center">{{index + 1}}</td>
                <td>{{new Date(val.timestamp).toLocaleDateString('it-IT')}}</td>
                <td>{{val.status}}</td>
                <td>
                  <base-button
                    @click="billing(key)"
                    type="info"
                    size="sm"
                    icon="ni ni-settings-gear-65"
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
    deleteBilling(key) {
      billingRef.child(key).remove();
    }
  },
  mounted() {
    billingRef
      .orderByChild("user")
      .equalTo(this.profile.userKey)
      .on("value", snap => {
        this.showData = snap.val();
      });
  }
};
</script>
<style>
</style>
