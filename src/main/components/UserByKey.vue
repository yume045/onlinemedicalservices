<template>
  <div class="userByKey">{{result}}</div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var userRef = database.ref("/Users");
export default {
  name: "userByKey",
  props: {
    userKey: {
      type: String,
      default: "null",
      description: "User get Key"
    },
    department: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      result: "Loading..."
    };
  },
  mounted() {
    userRef.child(this.userKey).once("value", snap => {
      if (this.department) {
        this.result =
          snap.val().department +
          " : " +
          snap.val().name +
          " " +
          snap.val().surname;
      } else {
        this.result = snap.val().name + " " + snap.val().surname;
      }
    });
  }
};
</script>
<style>
</style>
