<template>
  <div class="hello">
    <div></div>
    <br>
    <br>
    <form action>
      <b-container>
      <center>
      <b-row class="box">
        <b-col>
      <div>
          <h2 class="text-center">เพิ่มข้อมูลเภสัชกร</h2>
          <tr>
            <td class="mr-2">
              Username:
              <input
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="username"
                placeholder="Username"
              >
            </td>
            <td class="mr-2">
              Password:
              <input
                class="form-control mb-2"
                type="password"
                name
                id
                v-model="password"
                placeholder="Password"
              >
            </td>
          </tr>
          <tr>
            <td>
              ชื่อเภสัชกร:
              <input
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="usernamephar"
                placeholder="ชื่อเภสัชกร"
              >
            </td>
            <td>
              นามสกุลเภสัชกร:
              <input
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="sernamephar"
                placeholder="นามสกุลแพทย์"
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">
              อายุ:
              <input
                class="form-control mb-2"
                type="number"
                name
                id
                max="120"
                min="1"
                v-model="age"
                placeholder="อายุ"
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">
              ความเชี่ยวชาญของเภสัชกร:
              <input
                class="form-control mb-2"
                id="input-default"
                type="text"
                min="0"
                placeholder="ความเชี่ยวชาญของเภสัชกร"
                v-model="option"
              >
            </td>
          </tr>
          <tr>
            <td colspan="2">
              ประวัติเบื้องต้นของเภสัชกร:
              <textarea
                class="form-control mb-2"
                type="text"
                name
                id
                cols="20"
                rows="5"
                v-model="story"
                placeholder="ประวัติเบื้องต้นของแพทย์"
              />
            </td>
          </tr>
          <tr>
            <b-button
              type="submit"
              variant="primary"
              class="btn btn-outline-primary mr-2 mt-3 mb-5"
              @click="insertPharmacist () "
            >เพิ่มข้อมูลเภสัชกร</b-button>
            <b-button
              type="reset"
              variant="danger"
              class="btn btn-outline-danger mt-3 mb-5 ml-2"
            >ยกเลิก</b-button>
          </tr>
      </div>
      </b-col>
          </b-row>
          </center>
    </b-container>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
var database = firebase.database();
var DocRef = database.ref("/User");
var DocRef2 = database.ref("/Manage");
export default {
  name: "ManagePharmacist",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      username: "",
      password: "",
      usernamephar: "",
      sernamephar: "",
      age: "",
      option: "",
      story: "",
      Permistion: "",
      users: {}
    };
  },
  methods: {
    insertPharmacist() {
      let tmp = {
        username: this.username,
        password: this.password,
        usernamephar: this.usernamephar,
        sernamephar: this.sernamephar,
        age: this.age,
        option: this.option,
        story: this.story,
        Permistion: (this.Permistion = 2)
      };
      if (
        this.username == "" ||
        this.password == "" ||
        this.usernamephar == "" ||
        this.sernamephar == "" ||
        this.age == "" ||
        this.option == "" ||
        this.story == ""
      ) {
        this.$swal({
          type: "error",
          title: "Oops...",
          text: "กรุณากรอกข้อมูลให้ครบ",
          footer: "<a href>Why do I have this issue?</a>"
        });
      } else {
        DocRef.child(this.username).push(tmp);
        DocRef2.child("Pharmacist").push(tmp);
        this.username = "";
        this.password = "";
        this.usernamephar = "";
        this.sernamephar = "";
        this.age = "";
        this.option = "";
        this.story = "";
        this.Permistion = "";
        this.$swal({
          position: "center",
          type: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    console.log(this.user);
    const dbRefObject = firebase
      .database()
      .ref()
      .child("User");
    console.log(dbRefObject);
    dbRefObject.on("value", snap => {
      this.users = snap.val();
      console.log(this.users);
    });
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
button {
  font-family: "Abel", sans-serif, "Mitr", sans-serif;
  font-size: 14px;
}
input {
  font-family: "Abel", sans-serif, "Mitr", sans-serif;
  font-size: 14px;
}
</style>
