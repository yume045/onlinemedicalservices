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
                <h4 class="mt-2">Chat Message</h4>
              </div>
            </div>
            <div class="row">
              <side-chat></side-chat>
            </div>
          </div>
          <div class="col-9">
            <div class="row border-bottom border-dark" style="height:50px">
              <div class="col-9">
                <h4 class="mt-2 border-right border-dark">Dr. Online Medical</h4>
              </div>
              <div class="col-3">
                <base-button
                  block
                  class="mt-1"
                  type="default"
                  outline
                  icon="ni ni-camera-compact"
                >Call</base-button>
              </div>
            </div>
            <div class="row border-bottom border-dark" style="height:480px"></div>
            <div class="row mt-3">
              <div class="col-9">
                <textarea
                  v-model="message.msg"
                  class="form-control form-control-alternative"
                  rows="1"
                  placeholder="Type a Message..."
                ></textarea>
              </div>
              <div class="col-3">
                <base-button block @click="sendMsg()" type="primary">
                  Send
                  <i class="ni ni-send"></i>
                </base-button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import SideChat from "@/main/Chat/SideChat";
var database = firebase.database();
var chatRef = database.ref("/Chats");
export default {
  name: "Chat",
  data() {
    return {
      message: {
        msg: "",
        userKey: ""
      }
    };
  },
  components: {
    SideChat
  },
  methods: {
    sendMsg() {
      this.message.timestamp = Date.now();
      chatRef.push(this.message);
      this.message = {
        msg: "",
        userKey: ""
      };
    }
  },
  mounted() {}
};
</script>
<style>
</style>
