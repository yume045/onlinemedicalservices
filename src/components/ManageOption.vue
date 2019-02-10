<template>
  <div class="hello">
    <form action>
      <div>
        <center>
          <h2>จัดการแผนกของแพทย์</h2>
          <tr>
            <td class="ml-2">ชื่อแผนก:</td>
            <td>
              <input
                class="form-control mb-2"
                type="text"
                name
                id
                v-model="addOption"
                placeholder="ชื่อแผนก"
              >
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <b-button
                type="submit"
                variant="primary"
                class="btn btn-success"
                @click="insertOption()"
              >เพิ่มแผนก</b-button>
            </td>
          </tr>
        </center>
      </div>
    </form>
    <br>
    <b-container>
      <b-row class="box">
        <b-col>
          <label for="input-default">แผนก</label>
      <div class="mb-5">
        <div :key="key" v-for="(show, key) in shows">
          <div v-if="updateKey === key">
            <b-form-input
              id="input-default"
              type="text"
              v-model="updateoption"
              placeholder="ชื่อแผนก"
            ></b-form-input>
            <br>
            <b-button
              type="submit"
              variant="primary"
              class="btn btn-success"
              @click="updateop(key, updateoption)"
            >บันทึก</b-button>
          </div>
          <div v-else>
            <hr>
            <b-column label="First Name">{{show.addOption}}</b-column>
            <b-column class="float-right">
              <b-button
                type="submit"
                variant="primary"
                class="btn btn-danger"
                @click="deleteop(key)"
              >Delete</b-button>
              <b-button
                type="submit"
                variant="primary"
                class="btn btn-warning"
                @click="setupdate(key, show.addOption)"
              >Edit</b-button>
            </b-column>
            <div class="level-right"></div>
          </div>
        </div>
      </div>
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
var database = firebase.database();
var addOptionRef = database.ref("/Manageoption");
export default {
  name: "ManageOption",
  data() {
    return {
      addOption: "",
      shows: {},
      updateoption: "",
      updateKey: ""
    };
  },
  methods: {
    insertOption() {
      let tmp = {
        addOption: this.addOption
      };
      addOptionRef.push(tmp);
      this.addOption = "";
      this.$swal({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    },
    deleteop(key) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted!", "Your file has been deleted.", "success");
          addOptionRef.child(key).remove();
        }
      });
    },
    updateop(key, addOption) {
      addOptionRef.child(key).update({
        addOption: addOption
      });
      this.updateoption = "";
      this.updateKey = "";
      this.$swal({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    },
    setupdate(key, addOption) {
      this.updateoption = addOption;
      this.updateKey = key;
    }
  },
  mounted() {
    const dbRefObject2 = firebase
      .database()
      .ref()
      .child("Manageoption");
    dbRefObject2.on("value", snap => {
      this.shows = snap.val();
      console.log(this.shows);
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
.tag {
  cursor: pointer;
}
</style>
