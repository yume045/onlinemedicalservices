<template>
<div class="center">
    <div style="margin-left:35%;">
                      <div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-8">
                            <form class="card card-sm">
                                <div class="card-body row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <i class="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div class="col">
                                        <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords" v-model="search" @input="filter(search)">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div><br>
    </div><br><br>
  <div>
  <label for=""><h1>ผู้ป่วย</h1></label>
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
    <tr :key="key" v-for="(user, key) in users" v-if="!showData.length > 0">
      <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="ชื่อ">
        <input type="text" v-model="updatesurName" placeholder="นามสุกล">
        <input type="text" v-model="updateid" placeholder="รหัสบัตรประชาชน">
        <input type="date" v-model="updateday" placeholder="วัน/เดือน/ปีเกิด">
        <input type="text" v-model="updateWeight" placeholder="น้ำหนัก">
        <input type="text" v-model="updateHeight" placeholder="ส่วนสูง">
        <input type="text" v-model="updatebloodtype" placeholder="กรุ๊ปเลือด">
        <input type="text" v-model="updateAddress" placeholder="ที่อยู่">
        <input type="text" v-model="updateNumberphone" placeholder="เบอร์โทร">
        <textarea type="text" v-model="updateMedical" placeholder="ยาที่แพ้"></textarea>
        <textarea type="text" v-model="updateDisease" placeholder="โรคประจำตัว"></textarea>
        <button class="btn btn-success" @click="Update(updateDisease, updateMedical, updateNumberphone, updateAddress, updatebloodtype, updateWeight, updateHeight, updateday, updateid, updatesurName, updateName, keys ,user.key, Manage)">บันทึก</button>
      </div>
      <div v-else>
      <td><th>{{user.HN}}</th></td>
      <td><th>{{user.name}}</th></td>
      <td><th>{{user.sername}}</th></td>
      <td><th>{{user.idpeople}}</th></td>
      <td><th>{{user.gen}}</th></td>
      <td><th>{{user.day}}</th></td>
      <td><th>{{user.weight}}</th></td>
      <td><th>{{user.height}}</th></td>
      <td><th>{{user.bloodtype}}</th></td>
      <td><th>{{user.address}}</th></td>
      <td><th>{{user.numberphone}}</th></td>
      <td><th>{{user.medical}}</th></td>
      <td><th>{{user.disease}}</th></td>
      <th><button class="btn btn-danger" @click="deleteUser (user.key)">X</button></th>
      <th><button class="btn btn-warning" @click="SetUpdate (key, user.name, user.sername, user.idpeople, user.day, user.weight, user.height, user.bloodtype, user.address, user.numberphone, user.medical, user.disease)">U</button></th>
      </div>
    </tr>
    <tr :key="key" v-for="(user, key) in showData" v-if="showData.length > 0">
      <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="ชื่อ">
        <input type="text" v-model="updatesurName" placeholder="นามสุกล">
        <input type="text" v-model="updateid" placeholder="รหัสบัตรประชาชน">
        <input type="date" v-model="updateday" placeholder="วัน/เดือน/ปีเกิด">
        <input type="text" v-model="updateWeight" placeholder="น้ำหนัก">
        <input type="text" v-model="updateHeight" placeholder="ส่วนสูง">
        <input type="text" v-model="updatebloodtype" placeholder="กรุ๊ปเลือด">
        <input type="text" v-model="updateAddress" placeholder="ที่อยู่">
        <input type="text" v-model="updateNumberphone" placeholder="เบอร์โทร">
        <textarea type="text" v-model="updateMedical" placeholder="ยาที่แพ้"></textarea>
        <textarea type="text" v-model="updateDisease" placeholder="โรคประจำตัว"></textarea>
        <button class="btn btn-success" @click="Update(updateDisease, updateMedical, updateNumberphone, updateAddress, updatebloodtype, updateWeight, updateHeight, updateday, updateid, updatesurName, updateName, keys ,user.key, Manage)">บันทึก</button>
      </div>
      <div v-else>
      <td><th>{{user.HN}}</th></td>
      <td><th>{{user.name}}</th></td>
      <td><th>{{user.sername}}</th></td>
      <td><th>{{user.idpeople}}</th></td>
      <td><th>{{user.gen}}</th></td>
      <td><th>{{user.day}}</th></td>
      <td><th>{{user.weight}}</th></td>
      <td><th>{{user.height}}</th></td>
      <td><th>{{user.bloodtype}}</th></td>
      <td><th>{{user.address}}</th></td>
      <td><th>{{user.numberphone}}</th></td>
      <td><th>{{user.medical}}</th></td>
      <td><th>{{user.disease}}</th></td>
      <th><button class="btn btn-danger" @click="deleteUser (user.key)">X</button></th>
      <th><button class="btn btn-warning" @click="SetUpdate (key, user.name, user.sername, user.idpeople, user.day, user.weight, user.height, user.bloodtype, user.address, user.numberphone, user.medical, user.disease)">U</button></th>
      </div>
    </tr>
    </table>
    <br>
    <label for=""><h1>แพทย์</h1></label>
    <table class="table table-hover">
      <thead class="">
        <div>
          <td><th scope="col">ชื่อแพทย์</th></td>
          <td><th scope="col">นามสกุลแพทย์</th></td>
          <td><th scope="col">อายุ</th></td>
          <td><th scope="col">ความชำนานการทางการแพทย์</th></td>
          <td><th scope="col">ประวัติเบื้องต้นของแพทย์</th></td>
        </div>
      </thead>
        <tr :key="key" v-for="(doctor, key) in doctors">
            <div v-if="updateKey1 === key">
              <input type="text" v-model="updateusernamedoc" placeholder="ชื่อแพทย์">
              <input type="text" v-model="updatesernamedoc" placeholder="นามสกุลแพทย์">
              <input type="text" v-model="updateage" placeholder="อายุ">
              <input type="text" v-model="updateoption" placeholder="ความชำนานการทางการแพทย์">
              <textarea type="text" v-model="updatestory" placeholder="ประวัติเบื้องต้นของแพทย์"></textarea>
              <button class="btn btn-success"  @click="Update2(key, updateusernamedoc, updatesernamedoc, updateage, updateoption, updatestory)">บันทึก</button>
            </div>
              <div v-else>
                <td><th>{{doctor.usernamedoc}}</th></td>
                <td><th>{{doctor.sernamedoc}}</th></td>
                <td><th>{{doctor.age}}</th></td>
                <td><th>{{doctor.option}}</th></td>
                <td><th>{{doctor.story}}</th></td>
                <th><button class="btn btn-danger" @click="deleteUser2 (key)">X</button></th>
                <th><button class="btn btn-warning" @click="SetUpdate2 (key, doctor.usernamedoc, doctor.sernamedoc, doctor.age, doctor.option, doctor.story)">U</button></th>
              </div>
        </tr>
</table>
<br>
  <label for=""><h1>เภสัชกร</h1></label>
    <table class="table table-hover">
      <thead class="">
        <div>
          <td><th scope="col">ชื่อเภสัชกร</th></td>
          <td><th scope="col">นามสกุลเภสัชกร</th></td>
          <td><th scope="col">อายุ</th></td>
          <td><th scope="col">ความชำนานการทางเภสัชกร</th></td>
          <td><th scope="col">ประวัติเบื้องต้นของเภสัชกร</th></td>
        </div>
      </thead>
        <tr :key="key" v-for="(pharma, key) in pharmas">
          <div v-if="updateKey2 === key">
            <input type="text" v-model="updateusernamephar" placeholder="ชื่อเภสัชกร">
            <input type="text" v-model="updatesernamephar" placeholder="นามสกุลเภสัชกร">
            <input type="text" v-model="updateage2" placeholder="อายุ">
            <input type="text" v-model="updateoption2" placeholder="ความชำนานการทางเภสัชกร">
            <textarea type="text" v-model="updatestory2" placeholder="ประวัติเบื้องต้นของเภสัชกร"></textarea>
            <button class="btn btn-success" @click="Update3(key, updateusernamephar, updatesernamephar, updateage2, updateoption2, updatestory2)">บันทึก</button>
          </div>
            <div v-else>
              <td><th>{{pharma.usernamephar}}</th></td>
              <td><th>{{pharma.sernamephar}}</th></td>
              <td><th>{{pharma.age}}</th></td>
              <td><th>{{pharma.option}}</th></td>
              <td><th>{{pharma.story}}</th></td>
              <th><button class="btn btn-danger"  @click="deleteUser3 (key)">X</button></th>
              <th><button class="btn btn-warning" @click="SetUpdate3 (key, pharma.usernamephar, pharma.sernamephar, pharma.age, pharma.option, pharma.story)">U</button></th>
            </div>
        </tr>
  </table>
</div>
</div>
</template>

<script>
import firebase from 'firebase'
var database = firebase.database()
var manageuser = database.ref('/Manage')
export default {
  name: 'Manage',
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
      updateoption: '',
      Musers: {},
      doctors: {},
      pharmas: {},
      updateKey2: '',
      updateid: '',
      updateday: '',
      updatebloodtype: '',
      updateusernamephar: '',
      updatesernamephar: '',
      updateage2: '',
      updateoption2: '',
      updatestory2: '',
      search: '',
      searchuser: '',
      countuser: 0,
      showData: []
    }
  },
  computed: {
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('Manage').child('Users')
    console.log(dbRefObject)
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
        this.countuser = snap.numChildren()
      })
      this.users = data
      console.log(this.users)
    })
    const dbRefObject2 = firebase.database().ref().child('Manage').child('Doctor')
    console.log(dbRefObject2)
    dbRefObject2.on('value', snap => {
      this.doctors = snap.val()
      console.log(this.doctors)
    })
    const dbRefObject3 = firebase.database().ref().child('Manage').child('Pharmacist')
    console.log(dbRefObject3)
    dbRefObject3.on('value', snap => {
      this.pharmas = snap.val()
      console.log(this.pharmas)
    })
  },
  methods: {
    filter (Search) {
      if (Search.length > 0) {
        this.showData = this.users.filter(
          (user) => {
            if (user.name.toString().indexOf(Search) >= 0 ||
              user.sername.toString().indexOf(Search) >= 0 ||
              user.gen.toString().indexOf(Search) >= 0 ||
              user.idpeople.toString().indexOf(Search) >= 0 ||
              user.bloodtype.toString().indexOf(Search) >= 0 ||
              user.medical.toString().indexOf(Search) >= 0 ||
              user.disease.toString().indexOf(Search) >= 0 ||
              user.HN.toString().indexOf(Search) >= 0) {
              return user
            }
          }
        )
      } else {
        this.showData = []
      }
    },
    deleteUser (key) {
      manageuser.child('Users').child(key).remove()
    },
    SetUpdate (key, name, sername, idpeople, day, weight, height, bloodtype, address, numberphone, medical, disease) {
      this.updateKey = key
      this.updateName = name
      this.updatesurName = sername
      this.updateid = idpeople
      this.updateday = day
      this.updateWeight = weight
      this.updateHeight = height
      this.updatebloodtype = bloodtype
      this.updateAddress = address
      this.updateNumberphone = numberphone
      this.updateMedical = medical
      this.updateDisease = disease
    },
    Update (disease, medical, numberphone, address, bloodtype, height, weight, day, idpeople, sername, name, keys, key, Manage) {
      manageuser.child('Users').child(key).update({
        name: name,
        sername: sername,
        idpeople: idpeople,
        day: day,
        weight: weight,
        height: height,
        bloodtype: bloodtype,
        address: address,
        numberphone: numberphone,
        medical: medical,
        disease: disease
      })
      this.updateKey = ''
      this.updateName = ''
      this.updatesurName = ''
      this.updateid = ''
      this.updateday = ''
      this.updateWeight = ''
      this.updateHeight = ''
      this.updatebloodtype = ''
      this.updateAddress = ''
      this.updateNumberphone = ''
      this.updateMedical = ''
      this.updateDisease = ''
    },
    deleteUser2 (key) {
      manageuser.child('Doctor').child(key).remove()
    },
    SetUpdate2 (key, usernamedoc, sernamedoc, age, option, story) {
      this.updateKey1 = key
      this.updateusernamedoc = usernamedoc
      this.updatesernamedoc = sernamedoc
      this.updateage = age
      this.updateoption = option
      this.updatestory = story
    },
    Update2 (key, usernamedoc, sernamedoc, age, option, story) {
      manageuser.child('Doctor').child(key).update({
        usernamedoc: usernamedoc,
        sernamedoc: sernamedoc,
        age: age,
        option: option,
        story: story
      })
      this.updateKey1 = ''
      this.updateusernamedoc = ''
      this.updatesernamedoc = ''
      this.updateage = ''
      this.updateoption = ''
      this.updatestory = ''
    },
    deleteUser3 (key) {
      manageuser.child('Pharmacist').child(key).remove()
    },
    SetUpdate3 (key, usernamephar, sernamephar, age, option, story) {
      this.updateKey2 = key
      this.updateusernamephar = usernamephar
      this.updatesernamephar = sernamephar
      this.updateage2 = age
      this.updateoption2 = option
      this.updatestory2 = story
    },
    Update3 (key, usernamephar, sernamephar, age, option, story) {
      manageuser.child('Pharmacist').child(key).update({
        usernamephar: usernamephar,
        sernamephar: sernamephar,
        age: age,
        option: option,
        story: story
      })
      this.updateKey2 = ''
      this.updateusernamephar = ''
      this.updatesernamephar = ''
      this.updateage2 = ''
      this.updateoption2 = ''
      this.updatestory2 = ''
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
