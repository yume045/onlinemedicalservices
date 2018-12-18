<template>
<div class="hello">
    <section class="container">
        <div class="container">
            <div class="row">
                <div class="columns">
                    <div class="columns is-9">
                        <div class="box content">
                            <input type="text" id="form21" class="md-textarea form-control" rows="3" v-model="adddisease"><br>
                            <textarea type="text" id="form22" class="md-textarea form-control" rows="3" v-model="adddisease2"></textarea><br>
                            <input type="text" name="" id="" class="md-textarea form-control" v-model="addpicturedisease">
                            <br>
                            <button class="btn btn-primary" @click="insertDisease ()">เพิ่มข้อมูล</button>
                        </div>
                    </div>
                    </div> <br>
            </div>
        <div class="row">
            <div class="column is-one-third" :key="key" v-for="(subadddisease, key) in subadds">
                <div class="col-sm">
                    <b-card  title=""
                        img-src v-bind:src="subadddisease.addpicturedisease"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;margin-left:0%;"
                        class="mb-2" >
                        <p class="card-text">
                        <img v-bind:src="subadddisease.addpicturedisease" style="width: 250px; height: 250px;">
                        </p>
                        <p class="card-text">
                        {{subadddisease.adddisease.slice(0, 20)}}
                        </p>
                        <p class="card-text">
                        {{subadddisease.adddisease2.slice(0, 50)}}
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
var diseaseadminRef = database.ref('/Diseaseadmin')
export default {
  name: 'Diseaseadmin',
  data () {
    return {
      subadds: '',
      adddisease: '',
      adddisease2: '',
      subadddisease: '',
      addpicturedisease: ''
    }
  },
  methods: {
    insertDisease () {
      let tmp = ({
        adddisease: this.adddisease,
        adddisease2: this.adddisease2,
        addpicturedisease: this.addpicturedisease
      })
      diseaseadminRef.push(tmp)
      this.adddisease = ''
      this.adddisease2 = ''
      this.addpicturedisease = ''
    }
  },
  mounted () {
    diseaseadminRef.on('value', snap => {
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
