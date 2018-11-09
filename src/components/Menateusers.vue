<template>
    <table class="table">
  <thead class="thead-dark">
    <div>
      <th scope="col">Hospital Number</th>
      <th scope="col">ชื่อ</th>
      <th scope="col">นามสกุล</th>
      <th scope="col">รหัสประชาชน</th>
      <th scope="col">วัน/เดือน/ปี</th>
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
        <button class="btn btn-success" @click="Update(updatesurName, updateName, keys ,key)">บันทึก</button>
      </div>
      <div v-else>
      <th>{{user.HN}}</th>
      <th>{{user.name}}</th>
      <th>{{user.sername}}</th>
      <th>{{user.idpeople}}</th>
      <th>{{user.day}}</th>
      <th>{{user.height}}</th>
      <th>{{user.bloodtype}}</th>
      <th>{{user.address}}</th>
      <th>{{user.numberphone}}</th>
      <th>{{user.medical}}</th>
      <th>{{user.disease}}</th>
      <th><button class="btn btn-danger" @click="deleteUser (keys)">X</button></th>
      <th><button class="btn btn-warning" @click="SetUpdate (key)">U</button></th>
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
      updatesurName: ''
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
    SetUpdate (key) {
      this.updateKey = key
    },
    Update (sername, name, keys, key) {
      manageuserRef.child(keys).child(key).update({
        name: name,
        sername: sername
      })
      this.updateKey = ''
      this.updateName = ''
      this.updatesurName = ''
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
