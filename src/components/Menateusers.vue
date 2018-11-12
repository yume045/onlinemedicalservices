<template>
    <table class="table">
  <thead class="thead-dark">
    <div>
      <th scope="col">Hospital Number</th>
      <th scope="col">ชื่อ</th>
      <th scope="col">นามสกุล</th>
      <th scope="col">รหัสประชาชน</th>
      <th scope="col">เพศ</th>
      <th scope="col">วัน/เดือน/ปี</th>
      <th scope="col">น้ำหนัก</th>
      <th scope="col">ส่วนสูง</th>
      <th scope="col">กรุ๊ปเลือด</th>
      <th scope="col">ที่อยู่</th>
      <th scope="col">เบอร์โทร</th>
      <th scope="col">ยาที่แพ้</th>
      <th scope="col">โรคประจำตัว</th>
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
      <div v-else>
      <th>{{user.HN}}</th>
      <th>{{user.name}}</th>
      <th>{{user.sername}}</th>
      <th>{{user.gen}}</th>
      <th>{{user.idpeople}}</th>
      <th>{{user.day}}</th>
      <th>{{user.weight}}</th>
      <th>{{user.height}}</th>
      <th>{{user.bloodtype}}</th>
      <th>{{user.address}}</th>
      <th>{{user.numberphone}}</th>
      <th>{{user.medical}}</th>
      <th>{{user.disease}}</th>
      <th><button class="btn btn-danger" @click="deleteUser (keys)">X</button></th>
      <th><button class="btn btn-warning" @click="SetUpdate (key, user.name, user.sername, user.weight, user.height, user.address, user.numberphone, user.medical, user.disease)">U</button></th>
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
      updateDisease: ''
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
