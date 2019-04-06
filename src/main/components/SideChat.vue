<template>
  <div class="SideChat col-12">
    <div
      class="pt-3 pb-3 border-bottom border-dark"
      alternative
      v-for="(val, key) in showData"
      :key="key"
    >
      <a href="#/Chat" class="nav-link" @click="setChat(key)">
        <span v-if="true" class="dot-online"></span>
        <span v-else class="dot-offline"></span>
        <user-by-key :userKey="val.doctor"></user-by-key>
        {{val.time}}
        {{new Date(val.date).toDateString()}}
      </a>
    </div>
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
  name: "SideChat",
  props: {
    userKey: {
      type: String,
      default: "",
      description: "user Key"
    }
  },
  data() {
    return {
      showData: {}
    };
  },
  components: {
    UserByKey
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser",
      selectChat: "chat/selectChat"
    })
  },
  methods: {
    ...mapActions({
      actionSelectChat: "chat/actionSelectChat",
      actionChatData: "chat/actionChatData"
    }),
    setChat(key) {
      this.actionSelectChat(key);
      chatRef.child(key).on("value", snap => {
        this.actionChatData(snap.val())
      });
    }
  },
  mounted() {
    chatRef.on("child_added", snap => {
      if (snap.val().user === this.userKey) {
        this.showData[snap.key] = snap.val();
        queueRef.child(snap.val().doctor + "/" + snap.key).on("value", val => {
          this.showData[snap.key].time = val.val().time;
          this.showData[snap.key].date = val.val().date;
        });
      }
    });
  },
  created() {
    chatRef.on("child_added", snap => {
      if (snap.val().user === this.userKey) {
        this.showData[snap.key] = snap.val();
        queueRef.child(snap.val().doctor + "/" + snap.key).on("value", val => {
          this.showData[snap.key].time = val.val().time;
          this.showData[snap.key].date = val.val().date;
        });
      }
    });
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
