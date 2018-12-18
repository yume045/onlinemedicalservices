<template>
<div class="hello">
    <section class="container">
        <div class="container">
            <div class="row">
                <div class="columns">
                    <div class="columns is-9">
                        <div class="box content">
                            <input type="text" id="form21" class="md-textarea form-control" rows="3" v-model="addmedic"><br>
                            <textarea type="text" id="form22" class="md-textarea form-control" rows="3" v-model="addmedic2"></textarea><br>
                            <input type="text" name="" id="" class="md-textarea form-control" v-model="addpicturemedic">
                            <br>
                            <button class="btn btn-primary" @click="insertMedic ()">เพิ่มข้อมูล</button>
                        </div>
                    </div>
                    </div> <br>
            </div>
        <div class="row">
            <div class="column is-one-third" :key="key" v-for="(subaddmedic, key) in subadds">
                <div class="col-sm">
                    <b-card  title=""
                        img-src v-bind:src="subaddmedic.addpicturemedic"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;margin-left:0%;"
                        class="mb-2" >
                        <p class="card-text">
                        <img v-bind:src="subaddmedic.addpicturemedic" style="width: 250px; height: 250px;">
                        </p>
                        <p class="card-text">
                        {{subaddmedic.addmedic}}
                        </p>
                        <p class="card-text">
                        {{subaddmedic.addmedic2}}
                        </p>
                        <b-button href="#" variant="primary" class="btn btn-outline-info">อ่านเพิ่มเติม</b-button>
                    </b-card>
                </div>
            </div>
        </div>
        </div>
    </section>
            <div>
            </div><br><br>
<div style="margin-left:35%;">
  <b-nav-form>
    </b-nav-form>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var medicenadminRef = database.ref('/Medicenadmin')
export default {
  name: 'Medicenadmin',
  data () {
    return {
      add: '',
      add1: '',
      subadds: '',
      subaddmedics: '',
      addpicture: '',
      addmedic: '',
      addmedic2: '',
      addpicturemedic: ''
    }
  },
  methods: {
    insertMedic () {
      let tmp = ({
        addmedic: this.addmedic,
        addmedic2: this.addmedic,
        addpicturemedic: this.addpicturemedic
      })
      medicenadminRef.push(tmp)
      this.addmedic = ''
      this.addmedic2 = ''
      this.addpicturemedic = ''
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
