<template>
    <div class="hello">
  <div>
</div><br><br>
    <b-container fluid style="width:35%;">
    <b-row class="my-1">
        <b-col sm="3"><label for="input-default">ชื่อแผนก:</label></b-col>
        <b-col sm="9">
        <b-form-input id="input-default" type="text" min=0 placeholder="" v-model="addOption"></b-form-input>
    </b-col>
    </b-row><br>
        <b-button type="submit" variant="primary" class="btn btn-outline-primary" @click="insertOption()">เพิ่มแผนก</b-button>
    </b-container><br>
    <b-container>
        <b-row class="text-center">
         <b-col><label for="input-default">แผนก</label></b-col>
        </b-row>
        <div>
          <div :key="key" v-for="(show, key) in shows">
            <div v-if="updateKey === key">
            <b-form-input id="input-default" type="text" v-model="updateoption" placeholder="ชื่อแผนก"></b-form-input>
            <b-button type="submit" variant="primary" class="btn btn-success"  @click="updateop(key, updateoption)">บันทึก</b-button>
            </div>
          <div v-else>
            {{show.addOption}}&nbsp;&nbsp;
            <b-button type="submit" variant="primary" class="btn btn-danger"  @click="deleteop(key)">x</b-button>
            <b-button type="submit" variant="primary" class="btn btn-warning" @click="setupdate(key, show.addOption)">u</b-button>
          </div>
        </div>
        </div>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase'
var database = firebase.database()
var addOptionRef = database.ref('/Manageoption')
export default {
  name: 'ManageOption',
  data () {
    return {
      addOption: '',
      shows: {},
      updateoption: '',
      updateKey: ''
    }
  },
  methods: {
    insertOption () {
      let tmp = ({
        addOption: this.addOption
      })
      addOptionRef.push(tmp)
      this.addOption = ''
    },
    deleteop (key) {
      addOptionRef.child(key).remove()
    },
    updateop (key, addOption) {
      addOptionRef.child(key).update({
        addOption: addOption
      })
      this.updateoption = ''
      this.updateKey = ''
    },
    setupdate (key, addOption) {
      this.updateoption = addOption
      this.updateKey = key
    }
  },
  mounted () {
    const dbRefObject2 = firebase.database().ref().child('Manageoption')
    dbRefObject2.on('value', snap => {
      this.shows = snap.val()
      console.log(this.shows)
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
