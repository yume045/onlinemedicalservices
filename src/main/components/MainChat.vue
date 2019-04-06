<template>
  <div class="SideChat col-12">
    <div class="row border-bottom border-dark" style="height:50px">
      <div class="col-9">
        {{chatData}}
        <h4 class="mt-2 border-right border-dark">
          <user-by-key :userKey="chatData.doctor"></user-by-key>
        </h4>
      </div>
      <div class="col-3">
        <base-button block class="mt-1" type="default" outline icon="ni ni-camera-compact">Call</base-button>
      </div>
    </div>
    <!-- <div class="row border-bottom border-dark" style="height:480px">
      
    </div>
    <div class="row mt-3">
      <div class="col-9">
        <textarea
         
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
    </div>-->
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import UserByKey from "@/main/components/UserByKey";
var database = firebase.database();
var chatRef = database.ref("/Chats");
var queueRef = database.ref("/Queues");
export default {
  name: "MainChat",
  props: {},
  data() {
    return {
      showData: {
        
      },
      message: {
        msg: "",
        userKey: this.profile.userKey
      }
    };
  },
  components: {
    UserByKey
  },
  watch: {
    selectChat: function() {
      chatRef.child(this.selectChat).on("value", snap => {
        this.showData = snap.val();
      });
    },
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser",
      selectChat: "chat/selectChat",
      chatData: "chat/chatData"
    }),
  },
  methods: {
    sendMsg() {
      this.message.timestamp = Date.now();
      chatRef.child(this.selectChat).push(this.message);
      this.message.msg = "";
    }
  },
  mounted() {
    chatRef.child(this.selectChat).on("value", snap => {
      this.showData = snap.val();
    });
    console.log("chat", this.selectChat);
  }
};
</script>
<style>
.dot-online {
  height: 15px;
  width: 15px;
  background-color: #66ff66;
  border-radius: 50%;
  display: inline-block;
  float: left;
  margin-right: 10px;
  margin-top: 12px;
}
.dot-offline {
  height: 15px;
  width: 15px;
  background-color: #ff4d4d;
  border-radius: 50%;
  display: inline-block;
  float: left;
  margin-right: 10px;
  margin-top: 12px;
}
</style>
