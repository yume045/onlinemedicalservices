<template>
    <div class="hello">
  <div>
</div><br><br>
          <form action="">
                <div>
                  <b-container fluid style="width:35%;">
                      <b-row class="my-1">
                        <b-col sm="3"><label for="input-default">ชื่อผู้ใช้:</label></b-col>
                        <b-col sm="9">
                          <b-form-input id="input-default" type="text" min=0 placeholder="" v-model="username"></b-form-input>
                        </b-col>
                      </b-row>
                      <b-row class="my-1">
                        <b-col sm="3"><label for="input-default">รหัสผ่านผู้ใช้:</label></b-col>
                        <b-col sm="9">
                          <b-form-input id="input-default" type="text" min=0 placeholder="" v-model="password"></b-form-input>
                        </b-col>
                      </b-row>
                      <b-row class="my-1">
                        <b-col sm="3"><label for="input-default">ชื่อแพทย์:</label></b-col>
                        <b-col sm="9">
                          <b-form-input id="input-default" type="text" min=0 placeholder="" v-model="usernamedoc"></b-form-input>
                        </b-col>
                      </b-row>
                        <b-row class="my-1">
                            <b-col sm="3"><label for="input-default">นามสกุลแพทย์:</label></b-col>
                            <b-col sm="9">
                            <b-form-input id="input-default" type="text" min=0 placeholder="" v-model="sernamedoc"></b-form-input>
                            </b-col>
                        </b-row>
                            <b-row class="my-1">
                                <b-col sm="3"><label for="input-default">อายุ:</label></b-col>
                                <b-col sm="9">
                                <b-form-input id="input-default" type="text" min=0 placeholder="" v-model="age"></b-form-input>
                                </b-col>
                            </b-row>
                                <div>
                                <select class="form-control form-control-lg" v-model="option" >
                                  <option :value="null" disabled>-- เลือกแผนก --</option>
                                  <option v-for="(Ops, key) in Op" :key="Op[key]" :value="Ops.addOption" >{{Ops.addOption}}</option>
                                </select>
                                </div>
                                    <b-row class="my-1">
                                        <b-col sm="3"><label for="input-default">ประวัติเบื้องต้นของแพทย์:</label></b-col>
                                        <b-col sm="9">
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="story"></textarea>
                                        </b-col>
                                    </b-row>
                      <b-button type="submit" variant="primary" class="btn btn-outline-primary" @click="insertDoctor ">เพิ่มข้อมูล</b-button>
                      <b-button type="reset" variant="danger" class="btn btn-outline-danger">ยกเลิก</b-button>
                  </b-container>
                </div>
          </form>
  </div>
</template>

<script>

import firebase from 'firebase'
var database = firebase.database()
var DocRef = database.ref('/User')
var DocRef2 = database.ref('/Manage')
export default {
  name: 'ManageDoctor',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      usernamedoc: '',
      sernamedoc: '',
      age: '',
      option: null,
      story: '',
      Permistion: '',
      seletetion: null,
      users: {},
      Op: ''

    }
  },
  methods: {
    insertDoctor () {
      let tmp = ({
        username: this.username,
        password: this.password,
        usernamedoc: this.usernamedoc,
        sernamedoc: this.sernamedoc,
        age: this.age,
        option: this.option,
        story: this.story,
        seletetion: this.seletetion,
        Permistion: this.Permistion = 2
      })
      console.log(tmp)
      DocRef.child(this.username).push(tmp)
      DocRef2.child('Doctor').push(tmp)
      this.username = ''
      this.password = ''
      this.usernamedoc = ''
      this.sernamedoc = ''
      this.age = ''
      this.option = ''
      this.story = ''
      this.Permistion = ''
      this.seletetion = ''
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
    const dbRefObject2 = firebase.database().ref().child('Manageoption')
    console.log(dbRefObject2)
    dbRefObject2.on('value', snap => {
      this.Op = snap.val()
    })
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
button {
  font-family:'Abel', sans-serif,'Mitr', sans-serif;
  font-size: 14px;
}
input {
  font-family:'Abel', sans-serif,'Mitr', sans-serif;
  font-size: 14px;
}
.tag {
  cursor: pointer;
}
</style>
