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
      <div class="row mt-3" v-if="getUser.Permistion === 'Admin'">
        <div class="col-3">
          <h5>กรองข้อมูล :</h5>
        </div>
        <div class="col-6">
          <ul class="list-group nav nav-pills">
            <li
              href="#"
              @click="filterStatus('All')"
              :class="(active === 'All')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
            >ข้อมูลทั้งหมด</li>
            <li
              href="#"
              @click="filterStatus('ได้รับการยืนยัน')"
              :class="(active === 'ได้รับการยืนยัน')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
            >สถานะจ่ายแล้ว</li>
            <li
              href="#"
              @click="filterStatus('กำลังดำเนินการ')"
              :class="(active === 'กำลังดำเนินการ')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
            >สถานะยังไม่จ่าย</li>
            <li
              href="#"
              @click="filterStatus('ดำเนินการจัดส่ง')"
              :class="(active === 'ดำเนินการจัดส่ง')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
            >สถานะดำเนินการจัดส่ง</li>
            <li
              href="#"
              @click="filterStatus('ได้รับยาเรียบร้อยแล้ว')"
              :class="(active === 'ได้รับยาเรียบร้อยแล้ว')?'list-group-item d-flex justify-content-between align-items-center nav-link active':'list-group-item d-flex justify-content-between align-items-center nav-link'"
            >สถานะสำเร็จ</li>
          </ul>
        </div>
      </div>
      <div class="row mt-3 d-flex justify-content-center">
        <div class="col-10 table-responsive">
          <table class="table table-hover">
            <thead>
              <th class="text-center">ลำดับ</th>
              <th>วันที่</th>
              <th>ชื่อผู้รับยา</th>
              <th>สถานะ</th>
              <th>เอกสารยืนยัน</th>
              <th>ดูรายละเอียด</th>
              <th>จัดการ</th>
            </thead>
            <tbody>
              <tr
                v-for="(val, key, index) in showData"
                :key="key"
                v-if="key < page * 10 && key >= page * 10 - 10"
              >
                <td class="text-center">{{key + 1}}</td>
                <td>{{val.value.timestamp | moment("DD/MM/YY")}}</td>
                <td v-if="usersData">{{usersData[val.value.user]}}</td>
                <td>
                  <badge
                    type="success"
                    v-if="val.value.status === 'ได้รับยาเรียบร้อยแล้ว'"
                  >{{val.value.status}}</badge>
                  <badge
                    type="warning"
                    v-else-if="val.value.status === 'ดำเนินการจัดส่ง'"
                  >{{val.value.status}}</badge>
                  <badge
                    type="danger"
                    v-else-if="val.value.status === 'ไม่ได้รับการยืนยัน!!'"
                  >{{val.value.status}}</badge>
                  <badge
                    type="info"
                    v-else-if="val.value.status === 'ได้รับการยืนยัน'"
                  >{{val.value.status}}</badge>
                  <badge type="default" v-else>{{val.value.status}}</badge>
                </td>
                <td>
                  <a :href="val.value.urlImg" target="_blank">
                    <i class="ni ni-image"></i> เอกสารยืนยัน
                  </a>
                </td>
                <td class="text-center">
                  <base-button
                    block
                    @click="showOrder(val.key)"
                    type="success"
                    size="sm"
                    icon="fa fa-search-plus"
                  ></base-button>
                </td>
                <td>
                  <base-button
                    v-if="val.value.status === 'ได้รับยาเรียบร้อยแล้ว'"
                    type="success"
                    size="sm"
                    disabled
                  >เรียบร้อยแล้ว</base-button>
                  <base-button
                    v-else-if="val.value.status === 'ดำเนินการจัดส่ง'"
                    type="warning"
                    size="sm"
                    disabled
                  >ดำเนินการจัดส่ง</base-button>
                  <base-button
                    v-else-if="getUser.Permistion !== 'Admin'"
                    @click="billing(val.key)"
                    type="info"
                    size="sm"
                    icon="ni ni-settings-gear-65"
                  ></base-button>
                  <base-button
                    v-else-if="getUser.Permistion === 'Admin'"
                    @click="confirmOrder(val.key)"
                    type="success"
                    size="sm"
                    icon="ni ni-check-bold"
                  ></base-button>
                  <base-button
                    v-if="val.value.status !== 'ได้รับยาเรียบร้อยแล้ว' && val.value.status !== 'ดำเนินการจัดส่ง'"
                    @click="deleteBilling(val.key)"
                    type="danger"
                    size="sm"
                    icon="ni ni-fat-remove"
                  ></base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-12 text-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" @click="page--" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                :class="(val === page)?'page-item active':'page-item'"
                v-for="val in totalPage"
                :key="val"
              >
                <a class="page-link" @click="page = val">{{val}}</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="page++" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
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
var userRef = database.ref("/Users");
export default {
  name: "OrderHistory",
  data() {
    return {
      active: "All",
      showData: false,
      page: 1,
      totalPage: [1],
      usersData: null
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
      this.$swal({
        title: "ยกเลิก ?",
        text: "ต้องการยกเลิก ORDER นี่ใช่หรือไม",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          this.$swal("ยกเลิก!", "ยกเลิก ORDER สำเร็จ.", "success");
          if (this.getUser.Permistion === "Admin") {
            billingRef.child(key).update({
              status: "ไม่ได้รับการยืนยัน!!"
            });
          } else {
            billingRef.child(key).remove();
          }
          this.resetUI();
        }
      });
    },
    confirmOrder(key) {
      this.$swal({
        title: "ยืนยัน",
        text: "ต้องการยืนยัน ORDER นี่ใช่หรือไม่",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          this.$swal("ยืนยัน!", "ยืนยัน ORDER สำเร็จ.", "success");
          billingRef.child(key).update({
            status: "ได้รับการยืนยัน"
          });
          this.resetUI();
        }
      });
    },
    filterStatus(active) {
      this.active = active;
      let count = 1;
      let index = 1;
      this.totalPage = [1];
      this.showData = [];
      if (this.getUser.Permistion === "Admin") {
        billingRef
          .orderByChild("status")
          .equalTo(active)
          .on("child_added", snap => {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          });
        if (active === "All") {
          billingRef.on("child_added", snap => {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          });
        }
      } else {
        billingRef
          .orderByChild("user")
          .equalTo(this.profile.userKey)
          .on("child_added", snap => {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          });
      }
      this.showData.sort((a, b) =>
        a.value.timestamp < b.value.timestamp ? 1 : -1
      );
    },
    resetUI() {
      let count = 1;
      let index = 1;
      this.totalPage = [1];
      this.showData = [];
      if (this.getUser.Permistion === "Admin") {
        billingRef.on("child_added", snap => {
          this.showData.push({ value: snap.val(), key: snap.key });
          if (index % 10 === 0) {
            count++;
            this.totalPage.push(count);
          }
          index++;
        });
      } else {
        billingRef
          .orderByChild("user")
          .equalTo(this.profile.userKey)
          .on("child_added", snap => {
            this.showData.push({ value: snap.val(), key: snap.key });
            if (index % 10 === 0) {
              count++;
              this.totalPage.push(count);
            }
            index++;
          });
      }
      this.showData.sort((a, b) =>
        a.value.timestamp < b.value.timestamp ? 1 : -1
      );
    }
  },
  mounted() {
    let count = 1;
    let index = 1;
    this.totalPage = [1];
    this.showData = [];
    this.usersData = [];
    userRef.on("child_added", snap => {
      this.usersData[snap.key] = snap.val().name + " " + snap.val().surname;
      console.log(this.usersData[snap.key]);
    });
    console.log(this.usersData);
    if (this.getUser.Permistion === "Admin") {
      billingRef.on("child_added", snap => {
        this.showData.push({ value: snap.val(), key: snap.key });
        if (index % 10 === 0) {
          count++;
          this.totalPage.push(count);
        }
        index++;
      });
    } else {
      billingRef
        .orderByChild("user")
        .equalTo(this.profile.userKey)
        .on("child_added", snap => {
          this.showData.push({ value: snap.val(), key: snap.key });
          if (index % 10 === 0) {
            count++;
            this.totalPage.push(count);
          }
          index++;
        });
    }
    this.showData.sort((a, b) =>
      a.value.timestamp < b.value.timestamp ? 1 : -1
    );
  }
};
</script>
<style>
</style>
