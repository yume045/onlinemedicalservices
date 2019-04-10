<template>
<div class="VideoCall">
  <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <div class="wrapper meeting mt--300">
    <div class="ag-header">
      <div class="ag-header-msg">
          Room:&nbsp;<span id="room-name">{{channel}}</span>
      </div>
    </div>
    <div class="ag-main">
      <div class="ag-container">
        <AgoraVideoCall style="height:800px"
          :videoProfile="videoProfile"
          :channel="channel"
          :transcode="transcode"
          :attendeeMode="attendeeMode"
          :baseMode="baseMode"
          :appId="appId"
          :uid="uid"></AgoraVideoCall>
      </div>  
    </div>
  </div>
</div>
</template>

<script>
import * as Cookies from "js-cookie";
import AgoraVideoCall from "@/main/components/AgoraVideoCall";
export default {
  components: {
    AgoraVideoCall
  },
  data() {
    return {
      appId: "806498c578c74285906f6b6730b2140c",
      videoProfile: Cookies.get("videoProfile").split(",")[0] || "480p_4",
      channel: Cookies.get("channel") || "test",
      transcode: Cookies.get("transcode") || "interop",
      attendeeMode: Cookies.get("attendeeMode") || "video",
      baseMode: Cookies.get("baseMode") || "avc",
      uid: undefined
    };
  },
};
</script>

<style scoped>
.meeting.wrapper {
  background: rgb(12, 43, 64);
  height: 100%;
}

.meeting .ag-header {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ag-header-lead {
  font-size: 16px;
  line-height: 35px;
}

.meeting .ag-footer {
  padding: 0 30px;
  display: flex;
  align-items: center;
}

.meeting .ag-main {
  position: relative;
}

.meeting .ag-footer :first-child {
  margin-right: 80px;
}

.header-logo {
  width: 60px;
  height: 35px;
  margin-right: 12px;
}

.ag-container {
  width: calc(100% - 60px);
  height: 100%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
</style>

