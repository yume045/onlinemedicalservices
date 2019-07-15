<template>
  <div class="SideChat col-12">
    <div class="row border-bottom border-dark rounded" style="height:50px">
      <div class="col-sm-12 col-md-9">
        <h4 class="mt-2 border-right border-dark rounded">
          <user-by-key v-if="getUser.type === 'Doctor'" :userKey="chatData.user"></user-by-key>
          <user-by-key v-else :userKey="chatData.doctor"></user-by-key>
        </h4>
      </div>
      <div class="col-sm-12 col-md-3" v-if="checkTime">
        <base-button
          @click="videoCall('host')"
          block
          class="mt-1"
          type="default"
          outline
          icon="ni ni-camera-compact"
        >Call</base-button>
      </div>
      <div class="col-sm-12 col-md-3" v-else>
        <base-button
          disabled
          block
          class="mt-1"
          type="default"
          outline
          icon="ni ni-camera-compact"
        >not Call</base-button>
      </div>
    </div>
    <div
      class="row border-bottom border-dark rounded"
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
              <base-button type="danger">Call End</base-button>
            </p>
            <p v-else>{{val.message}}</p>
            <span
              class="time_date"
            >{{new Date(val.timestamp).toLocaleTimeString('en-US')}} | {{new Date(val.timestamp).toLocaleDateString('en-US')}}</span>
          </div>
        </div>
        <div v-if="val.userKey !== profile.userKey" class="incoming_msg">
          <div class="incoming_msg_img">
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
          </div>
          <div class="received_msg">
            <div class="received_withd_msg">
              <p v-if="val.message === 'JoinVideoCall'">
                <base-button @click="videoCall('join')" type="success">Join Video Call</base-button>
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
    <div class="row mt-3" v-if="checkTime">
      <div class="col-md-2 col-sm-12 my-auto">
        <base-button
          size="sm"
          type="info"
          block
          @click="$router.push('/OrderMedic?id='+ chatData.user )"
          v-if="getUser.type === 'Doctor'"
        >จ่ายยา</base-button>
        <base-button size="sm" type="warning" block @click="showRate = !showRate">Review</base-button>
      </div>
      <div class="col-md-7 col-sm-8">
        <base-input
          v-model="message"
          alternative
          rows="1"
          placeholder="Type a Message..."
          v-on:keyup.enter="sendMsg()"
        ></base-input>
      </div>
      <div class="col-md-3 col-sm-4">
        <base-button block @click="sendMsg()" type="primary">
          Send
          <i class="ni ni-send"></i>
        </base-button>
      </div>
      <div
        class="col-12 d-flex d-row justify-content-center bg-white shadow rounded"
        v-if="showRate || rate > 0"
      >
        <h5 class="pt-2">คะแนน :</h5>
        <rate :length="5" v-model="rate" :readonly="readOnlyRate" />
        <h5 class="pt-2">{{rate}}</h5>
      </div>
    </div>
    <!-- else -->
    <div class="row mt-3" v-else>
      <div class="col-md-2 col-sm-12 my-auto">
        <base-button
          size="sm"
          type="info"
          block
          @click="$router.push('/OrderMedic?id='+ chatData.user )"
          v-if="getUser.type === 'Doctor'"
        >จ่ายยา</base-button>
        <base-button size="sm" type="warning" block @click="showRate = !showRate">Review</base-button>
      </div>
      <div class="col-md-7 col-sm-8">
        <base-input v-model="message" alternative rows="1" placeholder="ไม่ตรงกับเวลานัด" disabled></base-input>
      </div>
      <div class="col-md-3 col-sm-4">
        <base-button disabled block type="primary">
          Send
          <i class="ni ni-send"></i>
        </base-button>
      </div>
      <div
        class="col-12 d-flex d-row justify-content-center bg-white shadow rounded"
        v-if="showRate || rate > 0"
      >
        <h5 class="pt-2">คะแนน :</h5>
        <rate :length="5" v-model="rate " :readonly="readOnlyRate" />
        <h5 class="pt-2">{{rate}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import UserByKey from "@/main/components/UserByKey";
import * as Cookies from "js-cookie";
var database = firebase.database();
var chatRef = database.ref("/Chats");
var queueRef = database.ref("/Queues");
export default {
  name: "MainChat",
  data() {
    return {
      showData: {},
      message: "",
      rate: 0,
      channel: "",
      baseMode: "avc",
      transcode: "interop",
      attendeeMode: "video",
      videoProfile: "480p_4",
      checkTime: false,
      showRate: false,
      readOnlyRate: true
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
    rate: function() {
      console.log(this.rate);
      queueRef
        .child(this.chatData.doctor)
        .child(this.selectChat)
        .update({
          rate: this.rate
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
    videoCall(type) {
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
      if (type === "host") {
        chatRef
          .child(this.selectChat)
          .child("chat")
          .push(payload);
      }
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
        .child("chat")
        .push(payload);
      this.message = "";
    }
  },
  mounted() {
    this.channel = this.selectChat;
    this.readOnlyRate = this.getUser.type === "Doctor" ? true : false;
    queueRef
      .child(this.chatData.doctor)
      .child(this.selectChat)
      .on("value", snap => {
        this.rate = snap.val().rate;
      });
    chatRef.child(this.selectChat).on("value", snap => {
      this.showData = snap.val();
    });
    console.log(moment(this.chatData.date).format("YYYY-MM-DD"));
    if (
      moment(Date.now()).format("YYYY-MM-DD") ===
        moment(this.chatData.date).format("YYYY-MM-DD") &&
      parseInt(Date.now()) >=
        moment(parseInt(this.chatData.time)).format("x") &&
      parseInt(Date.now()) < moment(parseInt(this.chatData.totime)).format("x")
    ) {
      this.checkTime = true;
    } else {
      this.checkTime = false;
    }
  }
};
</script>
<style>
</style>
