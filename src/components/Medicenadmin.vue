<template>
<div class="hello">
    <section class="container">
      <div class="row">
        <div class="col-12 mb-4 text-center">
          <h2>เพิ่มข้อมูลยา</h2>
        </div>
        <div class="col-12">
          <div>
            <b-form-input class="mb-3" v-model="addmedic" type="text" placeholder="ชื่อยา"></b-form-input>
            <vue-editor v-model="addmedic2" placeholder="กรอกข้อมูลยา"></vue-editor>
            <b-form-input class="mt-3" v-model="addpicturemedic" type="text" placeholder="Link รูปภาพ ตัวอย่าง : www.example.com/image.jpg"></b-form-input>
            <button class="mt-3 btn btn-primary" @click="insertMedic ()">เพิ่มข้อมูลยา</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { VueEditor } from "vue2-editor"
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var medicenadminRef = database.ref('/Medicenadmin')
export default {
  name: 'Medicenadmin',
  data () {
    return {
      subadds: '',
      subaddmedics: '',
      addmedic: '',
      addmedic2: '',
      addpicturemedic: ''
    }
  },
  components: {
    VueEditor
  },
  methods: {
    insertMedic () {
      let tmp = ({
        addmedic: this.addmedic,
        addmedic2: this.addmedic2,
        addpicturemedic: this.addpicturemedic
      })
      medicenadminRef.push(tmp)
      this.addmedic = ''
      this.addmedic2 = ''
      this.addpicturemedic = ''
      this.$swal({
        position: "center",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    }
  },
  mounted () {
    medicenadminRef.on('value', snap => {
      this.subadds = snap.val()
      console.log(this.subadds)
    })
  },
  created: {
  },
  computed: {
    ...mapGetters({
      users: 'user/user',
      Checklogin: 'user/isLoggedIn'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
