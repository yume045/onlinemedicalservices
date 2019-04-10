<template>
  <div class="SideChat col-12">
    <div alternative v-for="(val, key) in showData" :key="key">
      <a href="#/Chat" class="nav-link" @click="setChat(key)">
        <div class="chat_list">
          <div class="chat_people">
            <div class="chat_img">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
            </div>
            <div v-if="getUser.type === 'Doctor'" class="chat_ib">
              <h5>
                <user-by-key :userKey="val.user"></user-by-key>
                <span class="chat_date">{{val.time}}</span>
              </h5>
              <p>{{new Date(val.date).toDateString()}}</p>
            </div>
            <div v-else class="chat_ib">
              <h5>
                <user-by-key :userKey="val.doctor"></user-by-key>
                <span class="chat_date">{{val.time}}</span>
              </h5>
              <p>{{new Date(val.date).toDateString()}}</p>
            </div>
          </div>
        </div>
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
        this.actionChatData(snap.val());
      });
    }
  },
  
  created() {
    if (this.getUser.type === "Doctor") {
      console.log(this.getUser.type)
      chatRef.on("child_added", snap => {
        if (snap.val().doctor === this.userKey) {
          this.showData[snap.key] = snap.val();
          queueRef
            .child(snap.val().doctor + "/" + snap.key)
            .on("value", val => {
              this.showData[snap.key].time = val.val().time;
              this.showData[snap.key].date = val.val().date;
            });
        }
      });
    } else {
      chatRef.on("child_added", snap => {
        if (snap.val().user === this.userKey) {
          this.showData[snap.key] = snap.val();
          queueRef
            .child(snap.val().doctor + "/" + snap.key)
            .on("value", val => {
              this.showData[snap.key].time = val.val().time;
              this.showData[snap.key].date = val.val().date;
            });
        }
      });
    }
  }
};
</script>
<style>
</style>
