<template>
  <div class="ListMedic col-12 border border-dark rounded" v-if="showData && user">
    <div class="row justify-content-center d-flex mt-3">
      <div class="col-8 h2 text-center">ใบสั่งยา</div>
    </div>
    <div class="row">
      <div class="col-8 d-flex d-row">
        ชื่อผู้ป่วย :
        <user-by-key v-if="print" :userKey="user.key" />
        <user-by-key v-else :userKey="userKey" />
      </div>
      <div class="col-4 d-flex d-row">
        วันที่ :
        {{orderDate | moment('DD/MM/Y')}}
      </div>
      <div class="col-12">ที่อยู่ : {{user.address}}</div>
    </div>
    <div class="row table-responsive mt-3 justify-content-center d-flex d-row">
      <table class="col-11 table table-hover">
        <thead>
          <th class="text-center">ลำดับ</th>
          <th>รายการ</th>
          <th class="text-center">จำนวน</th>
          <th class="text-center">ราคา</th>
          <th class="text-center" v-if="getUser.type !== 'Member'">จัดการข้อมูล</th>
        </thead>
        <tbody>
          <tr v-for="(val, key, index) in showData" :key="key">
            <td class="text-center">{{index + 1}}</td>
            <td>{{val.medicName}}</td>
            <td class="text-center">{{val.count}} {{val.unit}}</td>
            <td class="text-center">{{parseFloat(val.count) * parseFloat(val.price)}}</td>
            <td class="text-center" v-if="getUser.type !== 'Member'">
              <base-button
                @click="deleteOrder(key)"
                type="danger"
                size="sm"
                icon="ni ni-fat-remove"
              ></base-button>
            </td>
          </tr>
          <tr>
            <td colspan="3">ราคารวม</td>
            <td class="text-center">{{totalPrices}} บาท</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import UserByKey from "@/main/components/UserByKey";
var database = firebase.database();
var userRef = database.ref("/Users");
var orderRef = database.ref("/OrderMedic");
var billingRef = database.ref("/Billings");
export default {
  name: "ListMedic",
  props: {
    userKey: {
      type: String,
      default: "null",
      description: "User get Key"
    },
    print: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orderDate: new Date().toLocaleDateString("it-IT"),
      showData: null,
      totalPrice: 0,
      user: null
    };
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    }),
    totalPrices: function() {
      this.totalPrice = 0;
      if (this.print) {
        billingRef
          .child(this.userKey + "/listMedic")
          .on("child_added", snap => {
            this.totalPrice +=
              parseFloat(snap.val().count) * parseFloat(snap.val().price);
          });
      } else {
        orderRef.child(this.userKey).on("child_added", snap => {
          this.totalPrice +=
            parseFloat(snap.val().count) * parseFloat(snap.val().price);
        });
      }

      return this.totalPrice;
    }
  },
  methods: {
    deleteOrder(key) {
      orderRef.child(this.userKey + "/" + key).remove();
      this.totalPrice = 0;
      orderRef.child(this.userKey).on("child_added", snap => {
        this.totalPrice +=
          parseFloat(snap.val().count) * parseFloat(snap.val().price);
      });
    }
  },
  mounted() {
    userRef.child(this.userKey).on("value", snap => {
      this.user = snap.val();
    });
    if (this.print) {
      billingRef.child(this.userKey).on("value", snap => {
        this.orderDate = snap.val().timestamp;
        this.showData = snap.val().listMedic;
        userRef.child(snap.val().user).on("value", snap => {
          this.user = snap.val();
        });
      });
    } else {
      orderRef.child(this.userKey).on("value", snap => {
        this.showData = snap.val();
      });
    }
    console.log(this.showData, this.user);
  },
  components: {
    UserByKey
  }
};
</script>
<style>
</style>
