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
        <div class="row border border-dark mb-5" style>
          <div class="col-sm-12 col-md-3 border-right border-dark">
            <div class="row" style="height:50px">
              <div class="col-12">
                <h4 class="mt-2">Queue - Chat</h4>
              </div>
            </div>
            <div class="row border-top border-dark">
              <side-chat class="col-3" :userKey="profile.userKey"></side-chat>
            </div>
          </div>
          <div class="col-sm-12 col-md-9 mb-2">
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
  methods: {},
  mounted() {}
};
</script>
<style>
</style>
