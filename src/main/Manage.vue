<template>
  <div class="Manage">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section v-if="modal" class="jumbotron bg-secondary mt--300">
      <h2 class="mb-3" v-if="showType === 'Member'">ข้อมูลผู้ป่วย</h2>
      <h2 class="mb-3" v-if="showType === 'Doctor'">ข้อมูลหมอ</h2>
      <h2 class="mb-3" v-if="showType === 'Pharmacist'">ข้อมูลเภสัชกร</h2>
      <div class="row justify-content-end">
        <div class="col-xl-6 col-lg-6 col-md-8 col-sm-10">
          <base-input
            alternative
            placeholder="Search topic or keyword"
            addon-left-icon="fa fa-search"
            v-model="search"
            @input="filter(search)"
          ></base-input>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-xl-6 col-lg-6 col-md-8 col-sm-10">
          <h6 class="float-left mr-3">กรองข้อมูลตามกรุ๊ปเลือด :</h6>
          <base-checkbox class="mb-3 float-left mr-3" v-model="checkboxes.A">A</base-checkbox>
          <base-checkbox class="mb-3 float-left mr-3" v-model="checkboxes.B">B</base-checkbox>
          <base-checkbox class="mb-3 float-left mr-3" v-model="checkboxes.AB">AB</base-checkbox>
          <base-checkbox class="mb-3 float-left mr-3" v-model="checkboxes.O">O</base-checkbox>
        </div>
      </div>
      <div class="row justify-content-center">
        <table class="table table-hover col-xl-10 col-lg-10 col-md-12 col-sm-12">
          <tr>
            <td>Hospital Number</td>
            <td>ชื่อ</td>
            <td>นามสกุล</td>
            <td>รหัสประชาชน</td>
            <td>เพศ</td>
            <td>วัน/เดือน/ปี</td>
            <td>น้ำหนัก</td>
            <td>ส่วนสูง</td>
            <td>กรุ๊ปเลือด</td>
            <td>ที่อยู่</td>
            <td>เบอร์โทร</td>
            <td>ยาที่แพ้</td>
            <td>โรคประจำตัว</td>
            <td>จัดการข้อมูล</td>
          </tr>
          <tbody>
          <tr :key="key" v-for="(user, key) in (showData.length>0)?showData:users">
            <td>{{user.HN}}</td>
            <td>{{user.name}}</td>
            <td>{{user.surname}}</td>
            <td>{{user.idpeople}}</td>
            <td>{{user.gen}}</td>
            <td>{{user.birthdate}}</td>
            <td>{{user.weight}}</td>
            <td>{{user.height}}</td>
            <td>{{user.bloodtype}}</td>
            <td>{{user.address}}</td>
            <td>{{user.numberphone}}</td>
            <td>{{user.medical}}</td>
            <td>{{user.disease}}</td>
            <td>
              <base-button
                type="info"
                size="sm"
                @click="modal = false, 
                SetUpdate(user)"
              >Edit</base-button>
              <base-button type="danger" size="sm" @click="deleteUser(user.key)">Delete</base-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section v-else class="jumbotron bg-secondary container mt--300">
      <template>
        <div class="text-center text-muted mb-4">
          <h4>Edit User</h4>
        </div>
        <form role="form">
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            placeholder="๊Username"
            addon-left-icon="ni ni-circle-08"
            type="text"
            v-model="editData.HN"
            disabled
          ></base-input>
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            placeholder="๊Username"
            addon-left-icon="ni ni-circle-08"
            type="text"
            v-model="editData.username"
            disabled
          ></base-input>
          <base-input
            alternative
            class="mb-3 col-12 float-left"
            type="text"
            placeholder="รหัสประจำตัวประชาชน"
            v-model="editData.idpeople"
          ></base-input>
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            type="text"
            placeholder="ชื่อ"
            v-model="editData.name"
          ></base-input>
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            type="text"
            placeholder="นามสกุล"
            v-model="editData.surname"
          ></base-input>
          <div class="col-6 float-left">
            <base-radio name="male" class="mb-3 mr-4 float-left" v-model="editData.gen">ชาย</base-radio>
            <base-radio name="female" class="mb-3 float-left" v-model="editData.gen">หญิง</base-radio>
          </div>
          <base-input alternative addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker
              slot-scope="{focus, blur}"
              @on-open="focus"
              @on-close="blur"
              :config="{allowInput: true}"
              class="form-control datepicker"
              v-model="editData.birthdate"
            ></flat-picker>
          </base-input>
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            type="number"
            placeholder="ส่วนสูง"
            v-model="editData.height"
          ></base-input>
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            type="number"
            placeholder="น้ำหนัก"
            v-model="editData.weight"
          ></base-input>
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            type="text"
            placeholder="กรุ๊ปเลือด A, B, AB, O"
            v-model="editData.bloodtype"
          ></base-input>
          <base-input
            alternative
            class="mb-3 col-6 float-left"
            type="text"
            placeholder="เบอร์โทรศัพท์"
            v-model="editData.numberphone"
          ></base-input>
          <textarea
            class="mb-3 form-control form-control-alternative"
            rows="3"
            placeholder="ที่อยู่"
            v-model="editData.address"
          ></textarea>
          <textarea
            class="mb-3 form-control form-control-alternative"
            rows="3"
            placeholder="ยาที่แพ้"
            v-model="editData.medical"
          ></textarea>
          <textarea
            class="mb-3 form-control form-control-alternative"
            rows="3"
            placeholder="โรคประจำตัว"
            v-model="editData.disease"
          ></textarea>
          <div class="col-6">
            <base-radio name="Doctor" class="mb-3 mr-4 float-left" v-model="editData.type">หมอ</base-radio>
            <base-radio
              name="Pharmacist"
              class="mb-3 mr-4 float-left"
              v-model="editData.type"
            >เภสัชกร</base-radio>
            <base-radio name="Member" class="mb-3 mr-4 float-left" v-model="editData.type">ผู้ป่วย</base-radio>
          </div>
          <div class="text-center">
            <base-button
              type="primary"
              class="my-4"
              v-on:click="updateData(), modal = true"
            >บันทึกข้อมูล</base-button>
            <base-button type="danger" class="my-4" @click="modal = true">ยกเลิก</base-button>
          </div>
        </form>
      </template>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
import flatPicker from "vue-flatpickr-component";
var database = firebase.database();
var manageuser = database.ref("/Users");
export default {
  name: "Manage",
  data() {
    return {
      modal: true,
      checkboxes: {},
      users: [],
      Musers: {},
      doctors: {},
      pharmas: {},
      editData: {},
      search: "",
      searchuser: "",
      countuser: 0,
      showData: [],
      tmp: "",
      selected: [],
      allSelected: false,
      indeterminate: false,
      showType: this.$route.params.type
    };
  },
  watch: {
    checkboxes: function() {
      this.showData = this.users.filter(user => {
        if (this.checkboxes.A && user.bloodtype === "A") {
          return user;
        } else if (this.checkboxes.B && user.bloodtype === "B") {
          return user;
        } else if (this.checkboxes.AB && user.bloodtype === "AB") {
          return user;
        } else if (this.checkboxes.O && user.bloodtype === "O") {
          return user;
        }
      });
    }
  },
  mounted() {
    const dbRefObject = firebase
      .database()
      .ref()
      .child("Users");
    dbRefObject.on("child_added", snap => {
      var data = snap.val();
      if (data.type === this.showType) {
        data.key = snap.key
        this.users.push(data);
        this.showData.push(data);
      }
    });
  },
  methods: {
    filter(Search) {
      if (Search.length > 0) {
        this.showData = this.users.filter(user => {
          if (
            user.name.toString().indexOf(Search) >= 0 ||
            user.surname.toString().indexOf(Search) >= 0 ||
            user.gen.toString().indexOf(Search) >= 0 ||
            user.idpeople.toString().indexOf(Search) >= 0 ||
            user.bloodtype.toString().indexOf(Search) >= 0 ||
            user.medical.toString().indexOf(Search) >= 0 ||
            user.disease.toString().indexOf(Search) >= 0 ||
            user.HN.toString().indexOf(Search) >= 0 ||
            user.address.toString().indexOf(Search) >= 0
          ) {
            return user;
          }
        });
      } else {
        this.showData = this.users;
      }
    },
    deleteUser(key) {
      this.$swal({
        title: "คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted!", "ลบข้อมูลสำเร็จแล้ว", "success");
          manageuser.child(key).remove();
        }
      });
    },
    SetUpdate(user) {
      this.editData = user;
    },
    updateData() {
      this.showModal = true;
      manageuser.child(this.editData.key).update(this.editData);
      this.$swal({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    },
    filterBlood() {
      console.log(this.checkboxes);
      if (this.checkboxes.length > 0) {
        this.showData = this.users.filter(user => {
          if (this.checkboxes.A && user.bloodtype === "A") {
            return user;
          } else if (this.checkboxes.B && user.bloodtype === "B") {
            return user;
          } else if (this.checkboxes.AB && user.bloodtype === "AB") {
            return user;
          } else if (this.checkboxes.O && user.bloodtype === "O") {
            return user;
          }
        });
      } else {
        this.showData = [];
        var data2 = [];
        for (var i = 0; i < Search.length; i++) {
          data2 = this.users.filter(user => {
            if (user.bloodtype === Search[i] || user.gen === Search[i]) {
              return user;
            }
          });
          for (var x = 0; x < data2.length; x++) {
            this.showData[this.showData.length] = data2[x];
          }
        }
        console.log(this.showData);
      }
      if (Search.length == 0) this.showData = [];
    }
  },
  components: { flatPicker }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
