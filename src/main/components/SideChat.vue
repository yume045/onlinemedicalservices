<template>
  <div
    style="height:550px; overflow-y: scroll;"
    data-spy="scroll"
    data-target=".chat"
    data-offset="10"
    class="SideChat col-12"
  >
    <div alternative v-for="(val, key) in showData" :key="key">
      <a href="#/Chat" class="nav-link" @click="setChat(key)">
        <div :class="(key === selectChat)?'chat_list active_chat':'chat_list'">
          <div class="chat_people">
            <div class="chat_img">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
            </div>
            <div v-if="getUser.type === 'Doctor'" class="chat_ib">
              <h5>
                <user-by-key :userKey="val.user"></user-by-key>
                <span class="chat_date">{{val.time}} - {{val.totime}}</span>
              </h5>
              <p>{{new Date(val.date).toLocaleDateString()}}</p>
            </div>
            <div v-else class="chat_ib">
              <h5>
                <user-by-key :userKey="val.doctor"></user-by-key>
                <span class="chat_date">{{val.time}} - {{val.totime}}</span>
              </h5>
              <p>{{new Date(val.date).toLocaleDateString()}}</p>
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
  props: {},
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
      this.$router.push("/Redirect/Chat/go");
    }
  },
  created() {
    chatRef.on("child_added", snap => {
      if (snap.val().doctor === this.profile.userKey) {
        this.showData[snap.key] = snap.val();
      } else {
        this.showData[snap.key] = snap.val();
      }
    });
  }
};
</script>
<style>
</style>
