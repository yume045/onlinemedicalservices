<template>
  <div class="Chat">
    <section class="section section-shaped section-lg my-0">
      <div class="shape shape-style-1 bg-gradient-default">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container jumbotron justify-content-center">
        <div class="row border border-dark mb-5" style="height:600px">
          <div class="col-3 border-right border-dark">
            <div class="row border-bottom border-dark" style="height:50px">
              <div class="col-12">
                <h4 class="mt-2">Queue - Chat</h4>
              </div>
            </div>
            <div class="row">
              <side-chat  :userKey="profile.userKey"></side-chat>
            </div>
          </div>
          <div class="col-9">
            <main-chat :selectChat="selectChat"></main-chat>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import SideChat from "@/main/components/SideChat";
import MainChat from "@/main/components/MainChat";
import VideoCall from "@/main/components/VideoCall";
var database = firebase.database();
var chatRef = database.ref("/Chats");
export default {
  name: "Chat",
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser"
    })
  },
  components: {
    SideChat,
    MainChat,
    VideoCall
  },
  methods: {
  },
  mounted() {}
};
</script>
<style>
</style>
