<template>
  <div class="ManageOption">
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
      <h4 class="mb-3">จัดการแผนกของแพทย์</h4>
      <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-8 col-md-10 col-sm-12">
          <base-input
            alternative
            placeholder="เพิ่มแผนก"
            addon-left-icon="ni ni-fat-add"
            v-model="addOption"
            @keyup.enter.native="insertOption()"
          ></base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label for="input-default">แผนก</label>
          <div :key="key" v-for="(show, key) in shows">
            <div v-if="updateKey === key">
              <br>
              <base-input
                id="input-default"
                type="text"
                v-model="updateoption"
                placeholder="ชื่อแผนก"
                @keyup.enter.native="updateop(key, updateoption)"
                v-on:blur="updateop(key, updateoption)"
              ></base-input>
              <!-- <base-button 
                        type="submit"
                        variant="primary"
                        class="btn btn-success"
                        @click="updateop(key, updateoption)"
              >บันทึก</base-button >-->
            </div>
            <div v-else>
              <hr>
              <div class="row">
                <div class="col-lg-9 col-xl-9 col-md-8 col-sm-12">{{show.addOption}}</div>
                <div class="col-lg-3 col-xl-3 col-md-4 col-sm-12">
                  <base-button
                    type="submit"
                    variant="primary"
                    class="btn btn-danger"
                    @click="deleteop(key)"
                  >Delete</base-button>
                  <base-button
                    type="submit"
                    variant="primary"
                    class="btn btn-warning"
                    @click="setupdate(key, show.addOption)"
                  >Edit</base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
</style>
