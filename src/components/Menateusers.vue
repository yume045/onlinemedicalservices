<template>
    <table class="table table-hover">
  <thead class="">
    <div>
      <td><th scope="col">Hospital Number</th></td>
      <td><th scope="col">ชื่อ</th></td>
      <td><th scope="col">นามสกุล</th></td>
      <td><th scope="col">รหัสประชาชน</th></td>
      <td><th scope="col">เพศ</th></td>
      <td><th scope="col">วัน/เดือน/ปี</th></td>
      <td><th scope="col">น้ำหนัก</th></td>
      <td><th scope="col">ส่วนสูง</th></td>
      <td><th scope="col">กรุ๊ปเลือด</th></td>
      <td><th scope="col">ที่อยู่</th></td>
      <td><th scope="col">เบอร์โทร</th></td>
      <td><th scope="col">ยาที่แพ้</th></td>
      <td><th scope="col">โรคประจำตัว</th></td>
  </div>
  </thead>
    <tr :key="keys" v-for="(user, keys) in users">
      <div :key="key" v-for="(user, key) in user">
      <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="ชื่อ">
        <input type="text" v-model="updatesurName" placeholder="นามสุกล">
        <input type="text" v-model="updateWeight" placeholder="น้ำหนัก">
        <input type="text" v-model="updateHeight" placeholder="ส่วนสูง">
        <input type="text" v-model="updateAddress" placeholder="ที่อยู่">
        <input type="text" v-model="updateNumberphone" placeholder="เบอร์โทร">
        <textarea type="text" v-model="updateMedical" placeholder="ยาที่แพ้"></textarea>
        <textarea type="text" v-model="updateDisease" placeholder="โรคประจำตัว"></textarea>
        <button class="btn btn-success" @click="Update(updateDisease, updateMedical, updateNumberphone, updateAddress, updateWeight, updateHeight, updatesurName, updateName, keys ,key)">บันทึก</button>
      </div>
      <div v-else-if="user.Permistion === 1">
      <td><th>{{user.HN}}</th></td>
      <td><th>{{user.name}}</th></td>
      <td><th>{{user.sername}}</th></td>
      <td><th>{{user.gen}}</th></td>
      <td><th>{{user.idpeople}}</th></td>
      <td><th>{{user.day}}</th></td>
      <td><th>{{user.weight}}</th></td>
      <td><th>{{user.height}}</th></td>
      <td><th>{{user.bloodtype}}</th></td>
      <td><th>{{user.address}}</th></td>
      <td><th>{{user.numberphone}}</th></td>
      <td><th>{{user.medical}}</th></td>
      <td><th>{{user.disease}}</th></td>
      <th><button class="btn btn-danger" @click="deleteUser (keys)">X</button></th>
      <th><button class="btn btn-warning" @click="SetUpdate (key, user.name, user.sername, user.weight, user.height, user.address, user.numberphone, user.medical, user.disease)">U</button></th>
      </div>
      </div>
    </tr>
    <br>
    <thead class="">
    <div>
      <td><th scope="col">ชื่อแพทย์</th></td>
      <td><th scope="col">นามสกุลแพทย์</th></td>
      <td><th scope="col">อายุ</th></td>
      <td><th scope="col">ความชำนานการทางการแพทย์</th></td>
      <td><th scope="col">ประวัติเบื้องต้นของแพทย์</th></td>
  </div>
  </thead>
    <tr :key="keys" v-for="(user, keys) in users">
      <div :key="key" v-for="(user, key) in user">
      <div v-if="updateKey1 === key">
        <input type="text" v-model="updateusernamedoc" placeholder="ชื่อแพทย์">
        <input type="text" v-model="updatesernamedoc" placeholder="นามสกุลแพทย์">
        <input type="text" v-model="updateage" placeholder="อายุ">
        <input type="text" v-model="updateoption" placeholder="ความชำนานการทางการแพทย์">
        <textarea type="text" v-model="updatestory" placeholder="ประวัติเบื้องต้นของแพทย์"></textarea>
        <button class="btn btn-success" @click="Update2(updateusernamedoc, updatesernamedoc, updateage, updatestory, updateoption, keys ,key)">บันทึก</button>
      </div>
      <div v-else-if="user.Permistion === 2">
      <td><th>{{user.usernamedoc}}</th></td>
      <td><th>{{user.sernamedoc}}</th></td>
      <td><th>{{user.age}}</th></td>
      <td><th>{{user.option}}</th></td>
      <td><th>{{user.story}}</th></td>
      <th><button class="btn btn-danger" @click="deleteUser2 (keys)">X</button></th>
      <th><button class="btn btn-warning" @click="SetUpdate2 (key, user.usernamedoc, user.sernamedoc, user.age, user.story, user.option)">U</button></th>
      </div>
      </div>
    </tr>
</table>
</template>

<script>
import firebase from 'firebase'
var database = firebase.database()
var manageuserRef = database.ref('/User')
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      users: {},
      updateKey: '',
      updateName: '',
      updatesurName: '',
      updateWeight: '',
      updateHeight: '',
      updateAddress: '',
      updateNumberphone: '',
      updateMedical: '',
      updateDisease: '',
      updateKey1: '',
      updatepassword: '',
      updateusernamedoc: '',
      updatesernamedoc: '',
      updateage: '',
      updatestory: '',
      updateoption: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    console.log(this.user)
    const dbRefObject = firebase.database().ref().child('User')
    console.log(dbRefObject)
    dbRefObject.on('value', snap => {
      this.users = snap.val()
      console.log(this.users)
    })
  },
  methods: {
    deleteUser (keys) {
      manageuserRef.child(keys).remove()
    },
    SetUpdate (key, name, sername, weight, height, address, numberphone, medical, disease) {
      this.updateKey = key
      this.updateName = name
      this.updatesurName = sername
      this.updateWeight = weight
      this.updateHeight = height
      this.updateAddress = address
      this.updateNumberphone = numberphone
      this.updateMedical = medical
      this.updateDisease = disease
    },
    Update (disease, medical, numberphone, address, height, weight, sername, name, keys, key) {
      manageuserRef.child(keys).child(key).update({
        name: name,
        sername: sername,
        weight: weight,
        height: height,
        address: address,
        numberphone: numberphone,
        medical: medical,
        disease: disease
      })
      this.updateKey = ''
      this.updateName = ''
      this.updatesurName = ''
      this.updateWeight = ''
      this.updateHeight = ''
      this.updateAddress = ''
      this.updateNumberphone = ''
      this.updateMedical = ''
      this.updateDisease = ''
    },
    deleteUser2 (keys) {
      manageuserRef.child(keys).remove()
    },
    SetUpdate2 (key, usernamedoc, sernamedoc, age, story, option) {
      this.updateKey1 = key
      this.updateusernamedoc = usernamedoc
      this.updatesernamedoc = sernamedoc
      this.updateage = age
      this.updatestory = story
      this.updateoption = option
    },
    Update2 (usernamedoc, sernamedoc, age, story, option, keys, key) {
      manageuserRef.child(keys).child(key).update({
        usernamedoc: usernamedoc,
        sernamedoc: sernamedoc,
        age: age,
        story: story,
        option: option
      })
      this.updateKey1 = ''
      this.updatepassword = ''
      this.updateusernamedoc = ''
      this.updatesernamedoc = ''
      this.updateage = ''
      this.updatestory = ''
      this.updateoption = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
