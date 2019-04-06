<template>
  <div class="SideChat row">
    <h1>SideChat</h1>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
var database = firebase.database();
var chatRef = database.ref("/Chats");
export default {
  name: "SideChat",
  data() {
    return {
     
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
    
  },
  mounted() {}
};
</script>
<style>

</style>
