<template>
  <div class="Vidocall">
    <section class="jumbotron bg-secondary container">
      <div class="row">
        <h3>....</h3>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import AgoraRTC from "agora-rtc-sdk";
var database = firebase.database();
var chatRef = database.ref("/Chats");
var client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
export default {
  name: "Vidocall",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  methods: {},
  mounted() {
    client.init(
      "806498c578c74285906f6b6730b2140c",
      function() {
        console.log("AgoraRTC client initialized");
      },
      function(err) {
        console.log("AgoraRTC client init failed", err);
      }
    );
    var localStream = AgoraRTC.createStream({
      streamID: this.profile.userKey,
      audio: true,
      video: true,
      screen: false
    });
    localStream.init(
      function() {
        console.log("getUserMedia successfully");
        localStream.play("agora_local");
      },
      function(err) {
        console.log("getUserMedia failed", err);
      }
    );
  }
};
</script>
<style>
</style>
