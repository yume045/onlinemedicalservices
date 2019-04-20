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
      default: "",
      description: "User get Key"
    }
  },
  data() {
    return {
      result: "Loading..."
    };
  },
  mounted() {
    userRef.child(this.userKey).once("value", snap => {
      this.result = snap.val().name + " " + snap.val().surname;
    });
  }
};
</script>
<style>
</style>
