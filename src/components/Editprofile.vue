<template>
  <div class="container">
    <div class="row profile">
      <div class="col-md-3">
        <div class="profile-sidebar">
<!-- SIDEBAR USERPIC -->
          <div class="profile-userpic">
            <img src="https://static.change.org/profile-img/default-user-profile.svg" class="img-responsive" alt="">
          </div>
<!-- END SIDEBAR USERPIC -->
<!-- SIDEBAR USER TITLE -->
            <div class="profile-usertitle">
               <div class="profile-usertitle-name">
                   {{this.users}}
               </div>
                  <div class="profile-usertitle-job">
                    Developer
                  </div>
            </div>
<!-- END SIDEBAR USER TITLE -->
<!-- SIDEBAR BUTTONS -->
              <div class="profile-userbuttons">
                <button type="button" class="btn btn-success btn-sm">Follow</button>
                <button type="button" class="btn btn-danger btn-sm">Message</button>
              </div>
<!-- END SIDEBAR BUTTONS -->
<!-- SIDEBAR MENU -->
            <div class="profile-usermenu">
              <ul class="nav">
               <li class="active">
                <a href="#">
                  <i class="glyphicon glyphicon-home"></i>
                 Overview </a>
               </li>
               <li>
                 <a href="#">
                   <i class="glyphicon glyphicon-user"></i>
                     Account Settings </a>
               </li>
               <li>
                  <a href="#" target="_blank">
                   <i class="glyphicon glyphicon-ok"></i>
                    Tasks </a>
               </li>
               <li>
                  <a href="#">
                   <i class="glyphicon glyphicon-flag"></i>
                   Help </a>
               </li>
              </ul>
            </div>
<!-- END MENU -->
           </div>
          </div>
               <div class="col-md-9">
                  <div class="profile-content">
                    <div :key="key" v-for="(user, key) in user">
                      <div v-if="updateKey1 === key">
                        <input type="text" v-model="updateAddress" placeholder="ที่อยู่">
                        <button class="btn btn-success" @click="Update(key, updateAddress)">บันทึก</button>
                      </div>
                      <div v-else>
                    หมายเลขHN: {{user.HN}}<hr>
                    ชื่อ: {{user.name}}<hr>
                   นามสกุล: {{user.sername}}<hr>
                   เลขบัตรประชาชน: {{user.idpeople}}<hr>
                   เพศ: {{user.gen}}<hr>
                   วันเดือนปีเกิด: {{user.day}}<hr>
                   ส่วนสูง: {{user.height}}<hr>
                   น้ำหนัก: {{user.weight}}<hr>
                   ที่อยู่: {{user.address}} <button class="btn btn-warning" @click="Setupdate (key, user.address)">U</button><hr>
                   กรุ๊ปเลือด: {{user.bloodtype}}<hr>
                   โรคประจำตัว: {{user.disease}}<hr>
                   ยาที่แพ้: {{user.medical}}<hr>
                   เบอร์โทรศัพท์: {{user.numberphone}}<hr>
                   </div>
                    </div>
                  </div>
               </div>
         </div>
      </div>
</template>
<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var editprofile = database.ref('/User')
export default {
  name: 'Editprofile',
  data () {
    return {
      user: {},
      updateAddress: '',
      updateKey1: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/user',
      Checklogin: 'user/isLoggedIn',
      permission: 'user/Per'
    })
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('User').child(this.users)
    dbRefObject.on('value', snap => {
      this.user = snap.val()
    })
  },
  methods: {
    Setupdate (key, address) {
      console.log(key)
      console.log(address)
      this.updateKey1 = key
      this.updateAddress = address
    },
    Update (key, address) {
      console.log(address)
      editprofile.child(this.users).child(key).update({
        address: address
      })
      this.updateKey1 = ''
      this.updateAddress = ''
      console.log(this.updateKey1)
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
body {
  background: #F1F3FA;
}

/* Profile container */
.profile {
  margin: 20px 0;
}

/* Profile sidebar */
.profile-sidebar {
  padding: 20px 0 10px 0;
  background: #fff;
}

.profile-userpic img {
  float: none;
  margin: 0 auto;
  width: 50%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.profile-usertitle {
  text-align: center;
  margin-top: 20px;
}

.profile-usertitle-name {
  color: #5a7391;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 7px;
}

.profile-usertitle-job {
  text-transform: uppercase;
  color: #5b9bd1;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.profile-userbuttons {
  text-align: center;
  margin-top: 10px;
}

.profile-userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}

.profile-userbuttons .btn:last-child {
  margin-right: 0px;
}
.profile-usermenu {
  margin-top: 30px;
}

.profile-usermenu ul li {
  border-bottom: 1px solid #f0f4f7;
}

.profile-usermenu ul li:last-child {
  border-bottom: none;
}

.profile-usermenu ul li a {
  color: #93a3b5;
  font-size: 14px;
  font-weight: 400;
}

.profile-usermenu ul li a i {
  margin-right: 8px;
  font-size: 14px;
}

.profile-usermenu ul li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}

.profile-usermenu ul li.active {
  border-bottom: none;
}

.profile-usermenu ul li.active a {
  color: #5b9bd1;
  background-color: #f6f9fb;
  border-left: 2px solid #5b9bd1;
  margin-left: -2px;
}

/* Profile Content */
.profile-content {
  padding: 20px;
  background: #fff;
  min-height: 460px;
}
</style>
