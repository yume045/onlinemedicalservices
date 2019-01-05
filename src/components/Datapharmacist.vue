<template>
  <div class>
    <label for>
      <h1>แพทย์</h1>
    </label>
    <table class="table table-hover">
      <tr>
        <td>ชื่อเภสัชกร</td>
        <td>นามสกุลเภสัชกร</td>
        <td>อายุ</td>
        <td>ความชำนานการทางเภสัชกร</td>
        <td>ประวัติเบื้องต้นของเภสัชกร</td>
        <td>จัดการข้อมูล</td>
      </tr>
      <tr :key="key" v-for="(pharma, key) in pharmas" v-if="!showData.length > 0">
        <td>{{pharma.usernamephar}}</td>
        <td>{{pharma.sernamephar}}</td>
        <td>{{pharma.age}}</td>
        <td>{{pharma.option}}</td>
        <td>{{pharma.story}}</td>
        <td>
          <button class="btn btn-danger mr-2" @click="deleteUser3 (key)">X</button>
          <b-btn
            v-b-modal.modal1
            class="btn btn-warning"
            @click="SetUpdate3 (key, pharma.usernamephar, pharma.sernamephar, pharma.age, pharma.option, pharma.story)"
          >U</b-btn>
        </td>
      </tr>
    </table>

    <b-modal
      :hidden="showModal"
      id="modal1"
      title="แก้ไขข้อมูลผู้ป่วย"
      no-close-on-backdrop="true"
      no-fade="true"
      hide-footer
    >
      <form action>
        <div>
          <center>
            <tr>
              <td>
                ชื่อเภสัชกร :<input
                  class="form-control mb-2"
                  type="text"
                  v-model="updateusernamephar"
                  placeholder="ชื่อเภสัชกร"
                >
              </td>
              <td>
                นามสกุลเภสัชกร :<input
                  class="form-control mb-2"
                  type="text"
                  v-model="updatesernamephar"
                  placeholder="นามสกุลเภสัชกร"
                >
              </td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td colspan="2">
                อายุ :<input
                  class="form-control mb-2"
                  type="text"
                  v-model="updateage2"
                  placeholder="อายุ"
                >
              </td>
            </tr>
            <tr>
              <td colspan="2">
                ความชำนานการทางเภสัชกร :<input
                  class="form-control mb-2"
                  type="text"
                  v-model="updateoption2"
                  placeholder="ความชำนานการทางเภสัชกร"
                >
              </td>
            </tr>
            <tr>
              <td colspan="2">
                ประวัติเบื้องต้นของเภสัชกร :<textarea
                  class="form-control mb-2"
                  type="text"
                  v-model="updatestory2"
                  placeholder="ประวัติเบื้องต้นของเภสัชกร"
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  class="btn btn-success"
                  @click="Update3(updateKey2, updateusernamephar, updatesernamephar, updateage2, updateoption2, updatestory2)"
                >บันทึก</button>
              </td>
            </tr>
          </center>
        </div>
      </form>
    </b-modal>
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
      tmp: ""
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
            user.HN.toString().indexOf(Search) >= 0
          ) {
            return user;
          }
        });
      } else {
        this.showData = [];
      }
    },
    deleteUser(key) {
      manageuser
        .child("Users")
        .child(key)
        .remove();
    },
    SetUpdate(
      key,
      name,
      sername,
      idpeople,
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
      idpeople,
      sername,
      name,
      keys,
      key,
      Manage
    ) {
      this.showModal = true;
      manageuser
        .child("Users")
        .child(key)
        .update({
          name: name,
          sername: sername,
          idpeople: idpeople,
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
      this.updateday = "";
      this.updateWeight = "";
      this.updateHeight = "";
      this.updatebloodtype = "";
      this.updateAddress = "";
      this.updateNumberphone = "";
      this.updateMedical = "";
      this.updateDisease = "";
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
        this.$swal({
        title: "คุณต้องการที่จะลบข้อมูลเภสัชกรคนนี้ใช่หรือไม่?",
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
            .child("Pharmacist")
            .child(key)
            .remove();
        }
      });
    },
    SetUpdate3(key, usernamephar, sernamephar, age, option, story) {
      this.showModal = false;
      this.updateKey2 = key;
      this.updateusernamephar = usernamephar;
      this.updatesernamephar = sernamephar;
      this.updateage2 = age;
      this.updateoption2 = option;
      this.updatestory2 = story;
    },
    Update3(key, usernamephar, sernamephar, age, option, story) {
      this.showModal = true;
      manageuser
        .child("Pharmacist")
        .child(key)
        .update({
          usernamephar: usernamephar,
          sernamephar: sernamephar,
          age: age,
          option: option,
          story: story
        });
      this.updateKey2 = "";
      this.updateusernamephar = "";
      this.updatesernamephar = "";
      this.updateage2 = "";
      this.updateoption2 = "";
      this.updatestory2 = "";
    }
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
