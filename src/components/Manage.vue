<template>
  <div class>
    <div style="margin-left:35%;">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              <div class="col">
                <input
                  class="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Search topics or keywords"
                  v-model="search"
                  @input="filter(search)"
                >
              </div>
            </div>
            <div class="col">
              <b-form-group>
                <b>Blood Group :</b>
                <br>
                <b-form-checkbox-group
                  id="blood"
                  v-model="selected"
                  name="blood"
                  :options="blood"
                  class="ml-5"
                  @change="filter(selected)"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>
          </form>
        </div>
      </div>
      <br>
    </div>
    <div>
      <h1 class="text-center mt-5">ผู้ป่วย</h1>
    </div>
    <table class="table table-hover">
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
      <tr :key="key" v-for="(user, key) in (search.length>0)?showData:users">
        <td>{{user.HN}}</td>
        <td>{{user.name}}</td>
        <td>{{user.sername}}</td>
        <td>{{user.idpeople}}</td>
        <td>{{user.gen}}</td>
        <td>{{user.day}}</td>
        <td>{{user.weight}}</td>
        <td>{{user.height}}</td>
        <td>{{user.bloodtype}}</td>
        <td>{{user.address}}</td>
        <td>{{user.numberphone}}</td>
        <td>{{user.medical}}</td>
        <td>{{user.disease}}</td>
        <td>
          <button class="btn btn-danger mr-2" @click="deleteUser (user.key)">Delete</button>
          <b-btn
            v-b-modal.modal1
            @click="SetUpdate(
              user.key,
              user.name,
              user.sername,
              user.idpeople,
              user.gen,
              user.day,
              user.weight,
              user.height,
              user.bloodtype,
              user.address,
              user.numberphone,
              user.medical,
              user.disease
            )"
            class="btn btn-warning"
          >Edit</b-btn>
        </td>
      </tr>
    </table>

    <div class="sweettest">
      <b-modal
        :hidden="showModal"
        id="modal1"
        title="แก้ไขข้อมูลผู้ป่วย"
        :no-fade="true"
        hide-footer
      >
        <form action>
          <div>
            <center>
              <tr>
                <td class="mr-2">
                  ชื่อ:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateName"
                    placeholder="ชื่อ"
                  >
                </td>
                <td>
                  นามสกุล:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updatesurName"
                    placeholder="นามสุกล"
                  >
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td>
                  รหัสบัตรประชาชน:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateid"
                    placeholder="รหัสบัตรประชาชน"
                  >
                </td>
                <td>
                  กรุ๊ปเลือด:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updatebloodtype"
                    placeholder="กรุ๊ปเลือด"
                  >
                </td>
              </tr>
              <tr>
                <td>
                  เพศ:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updategen"
                    placeholder="เพศ"
                  >
                </td>
                <td>
                  วัน/เดือน/ปีเกิด:
                  <input
                    class="form-control mb-2"
                    type="date"
                    v-model="updateday"
                    placeholder="วัน/เดือน/ปีเกิด"
                  >
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td>
                  น้ำหนัก:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateWeight"
                    placeholder="น้ำหนัก"
                  >
                </td>
                <td>
                  ส่วนสูง:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateHeight"
                    placeholder="ส่วนสูง"
                  >
                </td>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr>
                <td colspan="2">
                  ที่อยู่:
                  <textarea
                    class="form-control mb-2"
                    type="text"
                    v-model="updateAddress"
                    placeholder="ที่อยู่"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  เบอร์โทร:
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateNumberphone"
                    placeholder="เบอร์โทร"
                  >
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  ยาที่แพ้:
                  <textarea
                    class="form-control mb-2"
                    type="text"
                    v-model="updateMedical"
                    placeholder="ยาที่แพ้"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  โรคประจำตัว:
                  <textarea
                    class="form-control mb-2"
                    type="text"
                    v-model="updateDisease"
                    placeholder="โรคประจำตัว"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    class="btn btn-success"
                    @click="Update(updateDisease, updateMedical, updateNumberphone, updateAddress, updatebloodtype, updateHeight, updateWeight, updateday, updategen, updateid, updatesurName, updateName, updateKey)"
                  >แก้ไขข้อมูล</button>
                </td>
              </tr>
            </center>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
var database = firebase.database();
var manageuser = database.ref("/Manage");
export default {
  name: "Manage",
  data() {
    return {
      showModal: false,
      msg: "Welcome to Your Vue.js App",
      users: {},
      updateKey: "",
      updateName: "",
      updatesurName: "",
      updateWeight: "",
      updateHeight: "",
      updateAddress: "",
      updateNumberphone: "",
      updateMedical: "",
      updateDisease: "",
      updateKey1: "",
      updatepassword: "",
      updateusernamedoc: "",
      updatesernamedoc: "",
      updateage: "",
      updatestory: "",
      updateoption: "",
      Musers: {},
      doctors: {},
      pharmas: {},
      updateKey2: "",
      updateid: "",
      updategen: "",
      updateday: "",
      updatebloodtype: "",
      updateusernamephar: "",
      updatesernamephar: "",
      updateage2: "",
      updateoption2: "",
      updatestory2: "",
      search: "",
      searchuser: "",
      countuser: 0,
      showData: [],
      tmp: "",
      blood: ["A", "B", "AB", "O"],
      selected: [],
      allSelected: false,
      indeterminate: false
    };
  },
  computed: {},
  mounted() {
    const dbRefObject = firebase
      .database()
      .ref()
      .child("Manage")
      .child("Users");
    console.log(dbRefObject);
    dbRefObject.on("value", snap => {
      var data = [];
      snap.forEach(ss => {
        var item = ss.val();
        item.key = ss.key;
        data.push(item);
        this.countuser = snap.numChildren();
      });
      this.users = data;
      console.log(this.users);
    });
    const dbRefObject2 = firebase
      .database()
      .ref()
      .child("Manage")
      .child("Doctor");
    console.log(dbRefObject2);
    dbRefObject2.on("value", snap => {
      this.doctors = snap.val();
      console.log(this.doctors);
    });
    const dbRefObject3 = firebase
      .database()
      .ref()
      .child("Manage")
      .child("Pharmacist");
    console.log(dbRefObject3);
    dbRefObject3.on("value", snap => {
      this.pharmas = snap.val();
      console.log(this.pharmas);
    });
  },
  methods: {
    filter(Search) {
      console.log(Search);
      if (Search.length > 0) {
        this.showData = this.users.filter(user => {
          if (
            user.name.toString().indexOf(Search) >= 0 ||
            user.sername.toString().indexOf(Search) >= 0 ||
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
        this.showData = [];
      }
    },
    deleteUser(key) {
      this.$swal({
        title: "คุณต้องการที่จะลบข้อมูลผู้ป่วยคนนี้ใช่หรือไม่?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted!", "ลบข้อมูลสำเร็จแล้ว", "success");
          manageuser
            .child("Users")
            .child(key)
            .remove();
        }
      });
    },
    SetUpdate(
      key,
      name,
      sername,
      idpeople,
      gen,
      day,
      weight,
      height,
      bloodtype,
      address,
      numberphone,
      medical,
      disease
    ) {
      this.showModal = false;
      this.updateKey = key;
      this.updateName = name;
      this.updatesurName = sername;
      this.updateid = idpeople;
      this.updategen = gen;
      this.updateday = day;
      this.updateWeight = weight;
      this.updateHeight = height;
      this.updatebloodtype = bloodtype;
      this.updateAddress = address;
      this.updateNumberphone = numberphone;
      this.updateMedical = medical;
      this.updateDisease = disease;
    },
    Update(
      disease,
      medical,
      numberphone,
      address,
      bloodtype,
      height,
      weight,
      day,
      gen,
      idpeople,
      sername,
      name,
      key
    ) {
      this.showModal = true;
      manageuser
        .child("Users")
        .child(key)
        .update({
          name: name,
          sername: sername,
          idpeople: idpeople,
          gen: gen,
          day: day,
          weight: weight,
          height: height,
          bloodtype: bloodtype,
          address: address,
          numberphone: numberphone,
          medical: medical,
          disease: disease
        });
      this.updateKey = "";
      this.updateName = "";
      this.updatesurName = "";
      this.updateid = "";
      this.updategen = "";
      this.updateday = "";
      this.updateWeight = "";
      this.updateHeight = "";
      this.updatebloodtype = "";
      this.updateAddress = "";
      this.updateNumberphone = "";
      this.updateMedical = "";
      this.updateDisease = "";
      this.$swal({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    },
    deleteUser2(key) {
      manageuser
        .child("Doctor")
        .child(key)
        .remove();
    },
    SetUpdate2(key, usernamedoc, sernamedoc, age, option, story) {
      this.updateKey1 = key;
      this.updateusernamedoc = usernamedoc;
      this.updatesernamedoc = sernamedoc;
      this.updateage = age;
      this.updateoption = option;
      this.updatestory = story;
    },
    Update2(key, usernamedoc, sernamedoc, age, option, story) {
      manageuser
        .child("Doctor")
        .child(key)
        .update({
          usernamedoc: usernamedoc,
          sernamedoc: sernamedoc,
          age: age,
          option: option,
          story: story
        });
      this.updateKey1 = "";
      this.updateusernamedoc = "";
      this.updatesernamedoc = "";
      this.updateage = "";
      this.updateoption = "";
      this.updatestory = "";
    },
    deleteUser3(key) {
      manageuser
        .child("Pharmacist")
        .child(key)
        .remove();
    }
    // SetUpdate3(key, usernamephar, sernamephar, age, option, story) {
    //   this.updateKey2 = key;
    //   this.updateusernamephar = usernamephar;
    //   this.updatesernamephar = sernamephar;
    //   this.updateage2 = age;
    //   this.updateoption2 = option;
    //   this.updatestory2 = story;
    // },
    // Update3(key, usernamephar, sernamephar, age, option, story) {
    //   manageuser
    //     .child("Pharmacist")
    //     .child(key)
    //     .update({
    //       usernamephar: usernamephar,
    //       sernamephar: sernamephar,
    //       age: age,
    //       option: option,
    //       story: story
    //     });
    //   this.updateKey2 = "";
    //   this.updateusernamephar = "";
    //   this.updatesernamephar = "";
    //   this.updateage2 = "";
    //   this.updateoption2 = "";
    //   this.updatestory2 = "";
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
