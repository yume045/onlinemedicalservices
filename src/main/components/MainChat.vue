<template>
  <div class="SideChat col-12">
    <div class="row border-bottom border-dark" style="height:50px">
      <div class="col-9">
        <h4 class="mt-2 border-right border-dark">
          <user-by-key v-if="getUser.type === 'Doctor'" :userKey="chatData.user"></user-by-key>
          <user-by-key v-else :userKey="chatData.doctor"></user-by-key>
        </h4>
      </div>
      <div class="col-3">
        <base-button @click="videoCall()" block class="mt-1" type="default" outline icon="ni ni-camera-compact">Call</base-button>
      </div>
    </div>
    <div
      class="row border-bottom border-dark"
      style="height:480px; overflow-y: scroll;"
      data-spy="scroll"
      data-target=".chat"
      data-offset="10"
      v-chat-scroll
    >
      <div class="chat mb-0" v-for="(val, key) in chatData.chat" :key="key">
        <div v-if="val.userKey === profile.userKey" class="outgoing_msg mr-1">
          <div class="sent_msg">
            <p v-if="val.message === 'JoinVideoCall'">
              <base-button @click="videoCall()" type="success">Call</base-button>
            </p>
            <p v-else >{{val.message}}</p>
            <span
              class="time_date"
            >{{new Date(val.timestamp).toLocaleTimeString('en-US')}} | {{new Date(val.timestamp).toLocaleDateString('en-US')}}</span>
          </div>
        </div>
        <div v-if="val.userKey !== profile.userKey" class="incoming_msg">
          <div class="incoming_msg_img">
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
          </div>
          <div class="received_msg">
            <div class="received_withd_msg">
              <p v-if="val.message === 'JoinVideoCall'">
              <base-button @click="videoCall()" type="success">Join Video Call</base-button>
              </p>
              <p v-else>{{val.message}}</p>
              <span
                class="time_date"
              >{{new Date(val.timestamp).toLocaleTimeString('en-US')}} | {{new Date(val.timestamp).toLocaleDateString('en-US')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-1">
        <base-button size="sm" type="danger">END</base-button>
      </div>
      <div class="col-8">
        <textarea
          v-model="message"
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
</template>
<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import UserByKey from "@/main/components/UserByKey";
import * as Cookies from "js-cookie"
var database = firebase.database();
var chatRef = database.ref("/Chats");
var queueRef = database.ref("/Queues");
export default {
  name: "MainChat",
  props: {},
  data() {
    return {
      showData: {},
      message: "",
      rate: 2,
      channel: "",
      baseMode: "avc",
      transcode: "interop",
      attendeeMode: "video",
      videoProfile: "480p_4"
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
    }
  },
  computed: {
    ...mapGetters({
      Checklogin: "user/isLoggedIn",
      profile: "user/profile",
      getUser: "user/getuser",
      selectChat: "chat/selectChat",
      chatData: "chat/chatData"
    })
  },
  methods: {
    videoCall() {
      var payload = {
        message: "JoinVideoCall",
        timestamp: Date.now(),
        userKey: this.profile.userKey
      };
      Cookies.set("channel", this.channel);
      Cookies.set("baseMode", this.baseMode);
      Cookies.set("transcode", this.transcode);
      Cookies.set("attendeeMode", this.attendeeMode);
      Cookies.set("videoProfile", this.videoProfile);
      chatRef
        .child(this.selectChat)
        .child("chat/" + payload.timestamp)
        .set(payload);
      this.$router.push("/VideoCall");
    },
    sendMsg() {
      var payload = {
        message: this.message,
        timestamp: Date.now(),
        userKey: this.profile.userKey
      };
      chatRef
        .child(this.selectChat)
        .child("chat/" + payload.timestamp)
        .set(payload);
      this.message = "";
    },
    endRate() {
      this.$swal({
        title: "<strong>Rate Doctor ?</strong>",
        type: "info",
        html: "<rate :length='5' />",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: "Thumbs down"
      });
    }
  },
  mounted() {
    chatRef.child(this.selectChat).on("value", snap => {
      this.showData = snap.val();
    });
    this.channel = this.selectChat
  }
};
</script>
<style>
.chat {
  width: 100%;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 60%;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 150%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 100%;
}

.sent_msg p {
  background: #5e72e4 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 10px 0 10px;
}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 450px;
  overflow-y: auto;
}
</style>
